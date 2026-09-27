import fs from 'node:fs/promises';
import path from 'node:path';
import nunjucks from 'nunjucks';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import YAML from 'yaml';

const root = process.cwd();
const dist = path.join(root, 'dist');
const markdown = new MarkdownIt({ html: false, linkify: false, breaks: false });
const templates = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(root, 'templates')), { autoescape: true });
const readJson = async file => JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));
const jsonFiles = async dir => (await fs.readdir(path.join(root, dir))).filter(name => name.endsWith('.json')).sort();
const write = async (file, value) => {
  const target = path.join(dist, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, value);
};
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const js = value => JSON.stringify(value).replace(/</g, '\\u003c');
const richText = value => sanitizeHtml(markdown.render(value || ''), {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: { a: ['href', 'title', 'rel'], img: ['src', 'alt', 'title'] },
  transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true) },
});
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const languages = { ca: 'Català', es: 'Castellano', en: 'English', fr: 'Français', de: 'Deutsch', eu: 'Euskera' };
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const assertAsset = async (value, label) => {
  assert(typeof value === 'string' && value.trim(), `Falta el fitxer de ${label}.`);
  if (/^https:\/\//i.test(value)) { new URL(value); return; }
  assert(!/^(?:[a-z]+:|\/\/)/i.test(value), `URL no vàlida a ${label}. Feu servir HTTPS o un fitxer del web.`);
  const clean = value.replace(/^\//, '').split(/[?#]/, 1)[0];
  const local = path.resolve(root, clean);
  assert(local.startsWith(root + path.sep), `Ruta de fitxer no vàlida a ${label}.`);
  assert(/^(uploads|img|audio)\//.test(clean), `El fitxer de ${label} ha d’estar a uploads/, img/ o audio/.`);
  await fs.access(local).catch(() => { throw new Error(`No existeix el fitxer ${value} de ${label}.`); });
};
const assertAssets = async (items, label) => {
  for (const item of items || []) await assertAsset(item.file, label);
};
const assertMarkdownAssets = async (body, label) => {
  const inspect = async tokens => {
    for (const token of tokens) {
      if (token.type === 'image') await assertAsset(token.attrGet('src'), label);
      if (token.children) await inspect(token.children);
    }
  };
  await inspect(markdown.parse(body || '', {}));
};
const categoryFiles = await jsonFiles('content/categories');
const categories = await Promise.all(categoryFiles.map(file => readJson(`content/categories/${file}`)));
categories.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
for (const category of categories) {
  assert(slugPattern.test(category.id || '') && category.name?.ca && Number.isInteger(category.order), `Categoria invàlida: ${category.id}.`);
  assert(categoryFiles.includes(`${category.id}.json`), `Fitxer de categoria mal anomenat: ${category.id}.`);
}
const categoryIds = new Set(categories.map(c => c.id));
const fixedIds = await readJson('content/identifiers.json');
const files = await jsonFiles('content/works');
const allWorks = await Promise.all(files.map(file => readJson(`content/works/${file}`)));
const pressFiles = await jsonFiles('content/press');
const pressItems = await Promise.all(pressFiles.map(file => readJson(`content/press/${file}`)));
const recordingFiles = await jsonFiles('content/recordings');
const recordingItems = await Promise.all(recordingFiles.map(file => readJson(`content/recordings/${file}`)));
const hasNote = work => Boolean(work.programmeNote?.sections?.length);
for (let index = 0; index < allWorks.length; index++) {
  const work = allWorks[index];
  assert(slugPattern.test(work.id || '') && files[index] === `${work.id}.json`, `Identificador d’obra invàlid: ${files[index]}.`);
  assert(categoryIds.has(work.category), `Categoria inexistent per a ${work.id}.`);
  assert(Number.isInteger(work.order) && work.order >= 0, `Ordre invàlid per a ${work.id}.`);
  assert(typeof work.title === 'string' ? work.title.trim() : work.title?.ca?.trim(), `Falta el títol de ${work.id}.`);
  const validateWork = async item => {
    await assertAssets(item.assets, work.id);
    for (const recording of item.recordings || []) {
      assert(recording.id && recording.title, `Falta el títol o identificador d’un enregistrament de ${work.id}.`);
      await assertAsset(recording.src, work.id);
    }
    for (const link of Object.values(item.links || {})) if (link) await assertAsset(link, work.id);
    for (const part of item.parts || []) await validateWork(part);
  };
  await validateWork(work);
  const seen = new Set();
  for (const section of work.programmeNote?.sections || []) {
    assert(languages[section.language] && !seen.has(section.language), `Idioma duplicat o invàlid a la nota de ${work.id}.`);
    assert(section.title?.trim() && section.blocks?.length, `Falta el títol o el text de la nota de ${work.id}.`);
    seen.add(section.language);
    for (const block of section.blocks) {
      assert(['prose', 'poem', 'separator'].includes(block.type), `Bloc de text invàlid a ${work.id}.`);
      if (block.type === 'prose') { assert(block.body?.trim(), `Text buit a ${work.id}.`); await assertMarkdownAssets(block.body, work.id); }
      if (block.type === 'poem') assert(block.text?.trim(), `Poema buit a ${work.id}.`);
    }
  }
  await assertAssets(work.programmeNote?.assets, work.id);
}
for (const id of fixedIds.workIds) assert(files.includes(`${id}.json`), `No elimineu l’obra publicada ${id}; arxiveu-la.`);
for (const id of fixedIds.categoryIds) assert(categoryIds.has(id), `No elimineu la categoria publicada ${id}.`);
for (const id of fixedIds.programmeNoteIds) assert(hasNote(allWorks.find(w => w.id === id)), `Conserveu la nota publicada de ${id}.`);
const recordingIds = new Set();
for (let index = 0; index < recordingItems.length; index++) {
  const item = recordingItems[index];
  assert(slugPattern.test(item.id || '') && recordingFiles[index] === `${item.id}.json`, `Identificador d’enregistrament invàlid: ${recordingFiles[index]}.`);
  assert(!recordingIds.has(item.id), `Identificador d’enregistrament duplicat: ${item.id}.`);
  recordingIds.add(item.id);
  assert(Number.isInteger(item.order) && item.order >= 0, `Ordre invàlid per a l’enregistrament ${item.id}.`);
  assert(item.title?.trim(), `Falta el títol de l’enregistrament ${item.id}.`);
  assert(Number.isInteger(item.year) && item.year >= 1900 && item.year <= 2100, `Any de publicació invàlid per a ${item.id}.`);
  await assertAsset(item.cover, item.id);
  assert(/^https:\/\/open\.spotify\.com\/(?:album|track)\/[A-Za-z0-9]+/.test(item.spotifyUrl || ''), `Enllaç de Spotify invàlid per a ${item.id}.`);
}
for (let index = 0; index < pressItems.length; index++) {
  const item = pressItems[index];
  assert(slugPattern.test(item.id || '') && pressFiles[index] === `${item.id}.json`, `Identificador de premsa invàlid: ${pressFiles[index]}.`);
  assert(Number.isInteger(item.order) && item.order >= 0, `Ordre invàlid per a l’article ${item.id}.`);
  assert(item.title?.ca?.trim() && item.kind?.ca?.trim(), `Falta el títol o tipus de l’article ${item.id}.`);
  if (item.url) {
    assert(/^https:\/\//i.test(item.url), `URL no vàlida a l’article ${item.id}. Feu servir HTTPS.`);
    new URL(item.url);
  }
  const seen = new Set();
  for (const section of item.sections || []) {
    assert(languages[section.language] && !seen.has(section.language), `Idioma duplicat o invàlid a l’article ${item.id}.`);
    assert(section.title?.trim() && section.body?.trim(), `Falta el títol o el text de l’article ${item.id}.`);
    seen.add(section.language);
    await assertMarkdownAssets(section.body, item.id);
  }
  assert(item.url || seen.size, `L’article ${item.id} necessita un enllaç o contingut per a la seva pàgina de detall.`);
}
const pages = Object.fromEntries(await Promise.all(['home', 'biography', 'catalogue', 'contact'].map(async slug => [slug, await readJson(`content/pages/${slug}.json`)])));
for (const [slug, page] of Object.entries(pages)) {
  await assertAssets(page.assets, slug);
  if (page.heroImage) await assertAsset(page.heroImage, slug);
  if (page.image) await assertAsset(page.image, slug);
}
for (const item of pages.home.additionalTestimonials || []) {
  assert(item.text?.ca?.trim() && item.author?.ca?.trim(), 'Cada text addicional de la pàgina d’inici necessita text i autoria en català.');
  for (const language of ['ca', 'es', 'en']) {
    if (item.text[language]) await assertMarkdownAssets(item.text[language], 'home');
  }
}
assert(/^[^\s@<>"'`]+@[^\s@<>"'`]+\.[^\s@<>"'`]+$/.test(pages.contact.contactEmail || ''), 'Adreça de correu de contacte invàlida.');
for (const version of ['short', 'full']) {
  assert(pages.biography[version]?.ca?.length, 'Falta la biografia en català.');
  for (const blocks of Object.values(pages.biography[version])) for (const block of blocks) {
    assert(block.body?.trim(), 'Hi ha un bloc buit a la biografia.');
    await assertMarkdownAssets(block.body, 'biography');
  }
}
const translations = { ca: {}, es: {}, en: {} };
const textKeys = new Set();
for (const filename of await jsonFiles('content/texts')) {
  for (const entry of (await readJson(`content/texts/${filename}`)).entries) {
    assert(!textKeys.has(entry.key) && entry.ca?.trim(), `Text duplicat o buit: ${entry.key}.`);
    textKeys.add(entry.key);
    for (const language of ['ca', 'es', 'en']) {
      const value = entry[language] || entry.ca;
      let rendered = value;
      if (entry.format === 'rich') { rendered = richText(value); await assertMarkdownAssets(value, entry.key); }
      if (entry.format === 'lines') rendered = esc(value).replace(/\n/g, '<br>');
      if (entry.format === 'attribution') {
        const [author, ...source] = value.split('\n');
        rendered = esc(author) + (source.length ? `<br><span class="quote-source">${esc(source.join('\n'))}</span>` : '');
      }
      translations[language][entry.key] = rendered;
    }
  }
}
for (const language of ['ca', 'es', 'en']) translations[language]['contact.email.value'] = pages.contact.contactEmail;
// Catch accidentally removed UI labels before a broken site can be published.
for (const file of ['index.html', 'biografia.html', 'catalogue.html', 'recordings.html', 'premsa.html', 'contact.html', 'js/components.js']) {
  const html = await fs.readFile(path.join(root, file), 'utf8');
  for (const [, key] of html.matchAll(/data-i18n(?:-html|-placeholder)?="([a-z][a-z.]+)"/g)) {
    assert(textKeys.has(key), `Falta la traducció ${key}.`);
  }
}
const config = YAML.parse(await fs.readFile(path.join(root, 'admin/config.yml'), 'utf8'));
if (process.env.NETLIFY === 'true') delete config.local_backend;
if (process.argv.includes('--validate-only')) {
  console.log(`Validació correcta: ${allWorks.length} obres, ${categories.length} categories, 4 pàgines i ${textKeys.size} textos.`);
  process.exit(0);
}
await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });
for (const [file, slug] of Object.entries({ 'index.html': 'home', 'biografia.html': 'biography', 'contact.html': 'contact', 'catalogue.html': 'catalogue', 'premsa.html': 'press' })) {
  let html = await fs.readFile(path.join(root, file), 'utf8');
  const page = pages[slug];
  let body = await fs.readFile(path.join(root, `templates/pages/${slug}.njk`), 'utf8');
  if (slug === 'biography') {
    body = body.replace(/<article class="bio bio-(short|long) lang-block" lang="(ca|es|en)">[\s\S]*?<\/article>/g, (_match, mode, language) => {
      const version = mode === 'short' ? page.short : page.full;
      const blocks = version[language]?.length ? version[language] : version.ca;
      return `<article class="bio bio-${mode} lang-block" lang="${language}">${blocks.map(block => `<section class="bio-block">${richText(block.body)}</section>`).join('<div class="text-divider"></div>')}</article>`;
    });
  }
  if (slug === 'contact') {
    body = body.replaceAll('mqoliu@gmail.com', esc(page.contactEmail)).replace('src="img/contacte.jpg"', `src="${esc(page.image)}"`);
    html = html.replaceAll('mqoliu@gmail.com', page.contactEmail);
  }
  if (slug === 'home') {
    const testimonials = (page.additionalTestimonials || []).map(item => {
      const languages = ['ca', 'es', 'en'];
      const text = languages.map(language => {
        const value = item.text[language] || item.text.ca;
        const author = item.author[language] || item.author.ca;
        return `<div class="testimonial-lang lang-block" lang="${language}"><div class="testimonial-text">${richText(value)}</div><cite>${esc(author)}</cite></div>`;
      }).join('');
      return `<div class="text-divider"></div><div class="testimonial">${text}</div>`;
    }).join('\n');
    body = body.replace('<!-- additional-testimonials -->', testimonials);
  }
  if (slug === 'press') {
    const items = pressItems.filter(item => !item.archived).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id)).map((item, index) => {
      const href = item.sections?.length ? `premsa/${item.id}.html` : item.url;
      const target = item.sections?.length ? '' : ' target="_blank" rel="noopener noreferrer"';
      const arrow = item.sections?.length ? '→' : '↗';
      const localized = field => ['ca', 'es', 'en'].map(language => `<span class="lang-block" lang="${language}">${esc(field[language] || field.ca)}</span>`).join('');
      return `<li class="press-item"><span class="press-item-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><div class="press-item-content"><p class="press-item-kind">${localized(item.kind)}</p><h2 class="press-item-title"><a href="${esc(href)}"${target}>${localized(item.title)}<span class="press-item-arrow" aria-hidden="true">${arrow}</span></a></h2></div></li>`;
    }).join('\n');
    body = body.replace('<!-- press-items -->', items);
  }
  html = html.replace(/(<main\b[^>]*>)[\s\S]*?(<\/main>)/i, (_match, open, close) => `${open}${body}${close}`);
  if (page?.heroImage) html = html.replace(/(<header class="home-hero">\s*<img src=")[^"]+/, `$1${esc(page.heroImage)}`);
  await write(file, html);
}
let recordingsHtml = await fs.readFile(path.join(root, 'recordings.html'), 'utf8');
const recordingCards = recordingItems.filter(item => !item.archived)
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
  .map(item => {
    const subtitle = [item.release && item.release.trim().toLowerCase() !== item.title.trim().toLowerCase() ? item.release : '', item.performers]
      .filter(Boolean).map(esc).join(' · ');
    return `<a class="recording-card" href="${esc(item.spotifyUrl)}" target="_blank" rel="noopener noreferrer">
          <img src="${esc(item.cover)}" alt="Cover for ${esc(item.release || item.title)}" loading="lazy" decoding="async">
          <span class="recording-card-title">${esc(item.title)}</span>
          <span class="recording-card-year">${esc(item.year)}</span>
          ${subtitle ? `<span class="recording-card-credit">${subtitle}</span>` : ''}
        </a>`;
  }).join('\n        ');
recordingsHtml = recordingsHtml.replace('<!-- recording-items -->', recordingCards);
await write('recordings.html', recordingsHtml);
for (const directory of ['css', 'js', 'img', 'admin']) await fs.cp(path.join(root, directory), path.join(dist, directory), { recursive: true });
try { await fs.cp(path.join(root, 'audio'), path.join(dist, 'audio'), { recursive: true }); } catch (error) { if (error.code !== 'ENOENT') throw error; }
await write('admin/config.yml', YAML.stringify(config, { lineWidth: 0 }));
// Netlify previews cannot publish to main; editors use the production CMS URL.
if (process.env.NETLIFY === 'true' && process.env.CONTEXT !== 'production') {
  await fs.rm(path.join(dist, 'admin'), { recursive: true, force: true });
  await write('admin/index.html', '<!doctype html><html lang="ca"><meta charset="utf-8"><title>Gestió del web</title><p>Per editar el contingut, obriu <a href="https://miqueloliu.netlify.app/admin/">el gestor del web publicat</a>.</p></html>');
}
try { await fs.cp(path.join(root, 'uploads'), path.join(dist, 'uploads'), { recursive: true }); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const catalogue = categories.map(category => ({ ...category, works: allWorks.filter(work => work.category === category.id && !work.archived).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id)) }));
await write('js/data/works.js', `/* Generated from Decap records. */\nconst WORKS = ${js(catalogue)};\n`);
await write('js/translations.js', `/* Generated from Decap text fields. */\nconst TRANSLATIONS = ${js(translations)};\n`);
const noteIndex = {};
for (const work of allWorks.filter(hasNote)) {
  const sections = work.programmeNote.sections;
  const blocks = section => section.blocks.map(block => {
    if (block.type === 'prose') return richText(block.body).replace(/<ul>/g, '<ul class="work-info-list">');
    if (block.type === 'separator') return '<div class="work-info-stanza-break"></div>';
    return `<div class="work-info-poem">${block.text.split('\n').map(line => line.trim() ? `<p class="work-info-poem-line">${esc(line)}</p>` : '<div class="work-info-stanza-break"></div>').join('\n')}</div>`;
  }).join('\n');
  const back = `<a href="catalogue.html#work-${work.id}" data-i18n="works.detail.back"></a>`;
  const content = `<article class="work-detail-layout">
    <div class="page-header work-detail-header"><p class="work-detail-back">${back}</p>
    ${sections.map(s => `<div class="work-detail-lang-block" data-detail-lang="${s.language}"><h1>${esc(s.title)}</h1></div>`).join('\n')}</div>
    <nav class="work-detail-language-nav" aria-label="Programme note languages">
      <span class="work-detail-sticky-title" aria-hidden="true"></span><span class="work-detail-language-label"></span>
      <div class="work-detail-language-tabs" role="tablist">${sections.map(s => `<button class="work-detail-language-tab" type="button" role="tab" data-content-language="${s.language}" aria-label="${languages[s.language]}" aria-selected="false">${s.language.toUpperCase()}</button>`).join('')}</div>
    </nav><div class="work-detail-content">${sections.map(s => `<div class="work-detail-lang-block" data-detail-lang="${s.language}"><div class="work-info">${blocks(s)}</div></div>`).join('\n')}</div>
    <p class="work-detail-back work-detail-back-bottom">${back}</p></article>`;
  const title = typeof work.title === 'string' ? work.title : work.title.ca;
  const route = `obres/${work.id}.html`;
  await write(route, templates.render('detail.njk', { id: work.id, title, description: `Nota de programa de ${title}.`, content, pageType: 'work-detail' }));
  const available = sections.map(s => s.language);
  noteIndex[work.id] = { href: route, languages: available, siteLanguages: available.filter(l => ['ca', 'es', 'en'].includes(l)), hasSiteLanguage: available.some(l => ['ca', 'es', 'en'].includes(l)) };
}
await write('js/data/work-info.js', `/* Generated from Decap programme notes. */\nconst WORK_INFO = ${js(noteIndex)};\n`);
for (const item of pressItems.filter(record => record.sections?.length)) {
  const sections = item.sections;
  const back = `<a href="premsa.html" data-i18n="press.detail.back"></a>`;
  const content = `<article class="work-detail-layout press-detail-layout">
    <div class="page-header work-detail-header"><p class="work-detail-back">${back}</p>
    ${sections.map(section => `<div class="work-detail-lang-block" data-detail-lang="${section.language}"><h1>${esc(section.title)}</h1><p class="press-detail-author">${esc(item.author?.[section.language] || item.author?.ca || '')}</p>${item.url ? `<p class="press-detail-source"><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" data-i18n="press.detail.source"></a></p>` : ''}</div>`).join('\n')}</div>
    <nav class="work-detail-language-nav" aria-label="Article languages">
      <span class="work-detail-sticky-title" aria-hidden="true"></span><span class="work-detail-language-label"></span>
      <div class="work-detail-language-tabs" role="tablist">${sections.map(section => `<button class="work-detail-language-tab" type="button" role="tab" data-content-language="${section.language}" aria-label="${languages[section.language]}" aria-selected="false">${section.language.toUpperCase()}</button>`).join('')}</div>
    </nav><div class="work-detail-content">${sections.map(section => `<div class="work-detail-lang-block" data-detail-lang="${section.language}"><div class="work-info press-article-body">${richText(section.body)}</div></div>`).join('\n')}</div>
    <p class="work-detail-back work-detail-back-bottom">${back}</p></article>`;
  const caTitle = item.sections.find(section => section.language === 'ca')?.title || item.title.ca;
  await write(`premsa/${item.id}.html`, templates.render('detail.njk', {
    id: item.id,
    title: caTitle,
    description: `Text de Ramon Humet sobre el Llibre d’hores.`,
    content,
    pageType: 'press-detail',
  }));
}
console.log(`Generat dist/ amb ${allWorks.length} obres, ${Object.keys(noteIndex).length} notes de programa i ${pressItems.length} articles de premsa.`);
