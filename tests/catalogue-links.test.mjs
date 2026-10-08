import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const playerSource = await fs.readFile('js/recording-player.js', 'utf8');
const catalogueSource = (await fs.readFile('catalogue.html', 'utf8')).match(/<script>\s*(const PageInit = [\s\S]*?)<\/script>/)[1];
function render(work) {
  const container = { innerHTML: '', querySelectorAll: () => [] };
  const nav = { querySelectorAll: () => [] };
  const context = { WORKS: [{ id: 'solista', name: 'Solista', works: [work] }],
    I18n: { fmt: v => v, loc: v => typeof v === 'string' ? v : v?.ca || '', t: v => v, apply() {}, onChange() {} },
    document: { getElementById: id => id === 'catalogue-content' ? container : id === 'catalogue-nav' ? nav : null,
      querySelector: () => null, body: { scrollHeight: 10000 }, documentElement: { scrollHeight: 10000 } },
    window: { scrollY: 0, innerHeight: 800, addEventListener() {}, location: { hash: '' } },
    requestAnimationFrame() {}, setTimeout() {}, clearTimeout() {},
  };
  vm.runInNewContext(`${playerSource}\n${catalogueSource}\nPageInit.catalogue();`, context);
  return container.innerHTML;
}
test('catalogue links the CD description and Ficta, with both types of audio initially collapsed', () => {
  const work = { id: 'prova', title: 'Prova', score: 'ficta',
    details: [{ ca: 'CD: Mirades sonores', url: 'https://example.com/cd' }],
    links: { score: 'https://example.com/score', audio: 'https://example.com/listen' } };
  let html = render(work);
  assert.match(html, /href="https:\/\/example.com\/cd"[^>]*>CD: Mirades sonores<\/a>/);
  assert.match(html, /href="https:\/\/example.com\/score"[^>]*data-i18n="works.score.ficta"/);
  assert.doesNotMatch(html, /data-i18n="works.link.score"/);
  assert.equal((html.match(/class="work-audio-toggle"/g) || []).length, 1);
  assert.match(html, /id="audio-prova" hidden><p[^>]*><a href="https:\/\/example.com\/listen"/);
  work.links.audio = 'https://example.com/listen.mp3?version=2';
  html = render(work);
  assert.match(html, /id="audio-prova" hidden>/);
  assert.match(html, /<audio[^>]*src="https:\/\/example.com\/listen.mp3\?version=2"/);
});
