import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import MarkdownIt from 'markdown-it';
import YAML from 'yaml';

const config = YAML.parse(await fs.readFile('admin/config.yml', 'utf8'));
const previews = new Map();
vm.runInNewContext(await fs.readFile('admin/preview.js', 'utf8'), { window: {
  CMS: { registerPreviewTemplate: (name, component) => previews.set(name, component), registerPreviewStyle() {} },
  h: (tag, props, ...children) => ({ tag, props, children: children.flat(Infinity).filter(child => child !== false && child != null) }),
  createClass: component => component,
  markdownit: options => new MarkdownIt(options),
} });
const nodes = tree => typeof tree !== 'object' || tree === null ? [] : [tree, ...tree.children.flatMap(nodes)];
const text = tree => typeof tree === 'object' && tree !== null ? tree.children.map(text).join('') : String(tree ?? '');
function preview(name, data, getAsset = value => value) {
  const component = previews.get(name);
  return {
    ...component, state: component.getInitialState(),
    props: { entry: { get: () => ({ toJS: () => data }) }, getAsset },
    setState(change) { Object.assign(this.state, change); },
  };
}

test('all editable collections have live previews, including empty drafts', async () => {
  for (const collection of config.collections) {
    for (const entry of collection.files || [collection]) {
      assert.ok(previews.has(entry.name), entry.name);
      assert.doesNotThrow(() => preview(entry.name, {}).render(), entry.name);
      const file = entry.file || `${collection.folder}/${(await fs.readdir(collection.folder))[0]}`;
      const data = JSON.parse(await fs.readFile(file, 'utf8'));
      assert.doesNotThrow(() => preview(entry.name, data).render(), entry.name);
    }
  }
});

test('language controls update live data and preserve Catalan fallback', () => {
  const data = { title: { ca: 'Primera versió', es: 'Traducció' }, archived: true };
  const instance = preview('works', data);
  assert.match(text(instance.render()), /Primera versió/);
  data.title.ca = 'Canvi sense desar';
  assert.match(text(instance.render()), /Canvi sense desar/);
  let button = nodes(instance.render()).find(node => node.tag === 'button' && text(node) === 'Castellà');
  button.props.onClick();
  assert.match(text(instance.render()), /Traducció/);
  button = nodes(instance.render()).find(node => node.tag === 'button' && text(node) === 'Anglès');
  button.props.onClick();
  assert.match(text(instance.render()), /Canvi sense desar/);
  assert.match(text(instance.render()), /Obra arxivada/);
});

test('programme notes render Markdown, poems, source languages and draft media safely', () => {
  const data = { programmeNote: { sections: [{ language: 'fr', title: 'Note française', blocks: [
    { type: 'prose', body: '**Llum** ![Foto](/uploads/nova.jpg) <script>alert(1)</script> [link](javascript:alert(1))' },
    { type: 'poem', text: 'Primer vers\n\nSegon vers', attribution: '— Autoria & llum\nLlibre <script>\nTraducció' },
    { type: 'poem', text: 'Sense atribució' },
    { type: 'poem', text: 'Atribució buida', attribution: '  \n  ' },
  ] }] }, recordings: [{ title: 'Prova', src: '/uploads/nou.mp3' }] };
  const instance = preview('works', data, value => value.startsWith('/uploads/') ? `blob:https://example.com/${value.split('/').pop()}` : value);
  const tree = instance.render();
  const html = nodes(tree).find(node => node.props.dangerouslySetInnerHTML)?.props.dangerouslySetInnerHTML.__html;
  assert.match(html, /<strong>Llum<\/strong>/);
  assert.match(html, /src="blob:https:\/\/example.com\/nova.jpg"/);
  assert.doesNotMatch(html, /<script>|href="javascript:/);
  assert.ok(nodes(tree).some(node => node.props.className === 'work-info-stanza-break'));
  assert.ok(nodes(tree).some(node => node.tag === 'button' && text(node) === 'Francès'));
  assert.equal(nodes(tree).find(node => node.tag === 'audio').props.src, 'blob:https://example.com/nou.mp3');
  const poem = nodes(tree).find(node => node.props.className === 'work-info-poem');
  assert.equal(poem.children.at(-1).props.className, 'work-info-poem-attribution');
  assert.equal(text(poem.children.at(-1)), '— Autoria & llumLlibre <script>\nTraducció');
  assert.equal(nodes(tree).filter(node => node.props.className === 'work-info-poem-attribution').length, 1);
  assert.equal(nodes(poem).filter(node => node.props.dangerouslySetInnerHTML).length, 0);
  data.programmeNote.sections[0].blocks[1].attribution = 'Canvi sense desar';
  assert.match(text(instance.render()), /Canvi sense desar/);
  data.programmeNote.sections[0].blocks[1].attribution = '';
  assert.equal(nodes(instance.render()).filter(node => node.props.className === 'work-info-poem-attribution').length, 0);
});

test('biography falls back for empty translations and media resolve from the site root', () => {
  const instance = preview('biography', { heroImage: 'img/biografia.jpg', short: { ca: [{ body: 'Biografia **curta**' }], en: [] } });
  instance.state.language = 'en';
  const tree = instance.render();
  assert.equal(nodes(tree).find(node => node.tag === 'img').props.src, '/img/biografia.jpg');
  assert.ok(nodes(tree).some(node => node.props.dangerouslySetInnerHTML?.__html.includes('<strong>curta</strong>')));
  for (const publisherUrl of ['javascript:alert(1)', 'java\nscript:alert(1)', 'data:text/html,<script>alert(1)</script>']) {
    const unsafe = preview('contact', { publisherUrl }).render();
    assert.equal(nodes(unsafe).find(node => node.tag === 'a' && text(node) === publisherUrl).props.href, '');
  }
});

test('homepage testimonials preview unsaved translations with Catalan fallback', () => {
  const data = { additionalTestimonials: [{ text: { ca: '**Llum**', es: 'Luz' }, author: { ca: 'Autoria' } }] };
  const instance = preview('home', data);
  instance.state.language = 'es';
  assert.match(text(instance.render()), /Autoria/);
  assert.ok(nodes(instance.render()).some(node => node.props.dangerouslySetInnerHTML?.__html.includes('Luz')));
  data.additionalTestimonials[0].text.es = 'Canvi sense desar';
  assert.ok(nodes(instance.render()).some(node => node.props.dangerouslySetInnerHTML?.__html.includes('Canvi sense desar')));
  instance.state.language = 'en';
  assert.ok(nodes(instance.render()).some(node => node.props.dangerouslySetInnerHTML?.__html.includes('<strong>Llum</strong>')));
});

test('press previews support external entries and source-language articles', () => {
  const external = preview('press', { title: { ca: 'Entrevista' }, url: 'https://example.com/article' }).render();
  assert.equal(nodes(external).find(node => node.tag === 'a').props.href, 'https://example.com/article');
  const instance = preview('press', { archived: true, title: { ca: 'Article' }, sections: [
    { language: 'ca', title: 'Català', body: 'Text català' },
    { language: 'fr', title: 'Français', body: '**Texte français**' },
  ] });
  nodes(instance.render()).find(node => node.tag === 'button' && text(node) === 'Francès').props.onClick();
  let tree = instance.render();
  assert.match(text(tree), /Article arxivat/);
  assert.ok(nodes(tree).some(node => node.props.lang === 'fr' && node.tag === 'section'));
  assert.ok(nodes(tree).some(node => node.props.dangerouslySetInnerHTML?.__html.includes('<strong>Texte français</strong>')));
  instance.state.language = 'en';
  tree = instance.render();
  assert.ok(nodes(tree).some(node => node.props.dangerouslySetInnerHTML?.__html.includes('Text català')));
});

test('recording previews show release details, draft cover and archive status', () => {
  const tree = preview('recordings', { archived: true, title: 'Obra', year: 2025, release: 'Disc', performers: 'Intèrpret',
    cover: '/uploads/recordings/new.jpg', spotifyUrl: 'https://open.spotify.com/album/example',
  }, () => 'blob:https://example.com/cover').render();
  assert.match(text(tree), /Obra2025DiscIntèrpret/);
  assert.match(text(tree), /Enregistrament arxivat/);
  assert.equal(nodes(tree).find(node => node.tag === 'img').props.src, 'blob:https://example.com/cover');
  assert.equal(nodes(tree).find(node => node.tag === 'a').props.href, 'https://open.spotify.com/album/example');
});

test('CD and score links use their existing descriptions and audio lives under one disclosure', () => {
  const work = { title: { ca: 'Obra' }, score: 'ficta',
    details: [{ ca: 'CD: Mirades sonores (Ficta)', url: 'https://example.com/cd' }],
    links: { score: 'https://example.com/score', audio: 'https://example.com/listen' },
  };
  let tree = preview('works', work).render();
  assert.equal(nodes(tree).find(node => node.tag === 'a' && text(node) === 'CD: Mirades sonores (Ficta)').props.href, work.details[0].url);
  assert.equal(nodes(tree).find(node => node.tag === 'a' && text(node) === 'Ficta').props.href, work.links.score);
  assert.equal(nodes(tree).filter(node => node.tag === 'a' && text(node) === 'Partitura').length, 0);
  const disclosure = nodes(tree).find(node => node.tag === 'details');
  assert.equal(text(disclosure.children[0]), '+àudio');
  assert.equal(nodes(disclosure).find(node => node.tag === 'a').props.href, work.links.audio);
  work.links.audio = 'https://example.com/music.mp3?version=2';
  tree = preview('works', work).render();
  assert.equal(nodes(nodes(tree).find(node => node.tag === 'details')).find(node => node.tag === 'audio').props.src, work.links.audio);
});
