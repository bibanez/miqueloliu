import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import YAML from 'yaml';

const root = process.cwd();
async function fixture(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'miqueloliu-test-'));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  for (const name of ['content', 'scripts', 'templates', 'admin', 'css', 'js', 'img', 'uploads', 'index.html', 'biografia.html', 'catalogue.html', 'recordings.html', 'premsa.html', 'contact.html', 'package.json']) {
    await fs.cp(path.join(root, name), path.join(dir, name), { recursive: true });
  }
  await fs.symlink(path.join(root, 'node_modules'), path.join(dir, 'node_modules'), 'dir');
  return dir;
}
function build(dir, environment = {}, validateOnly = false) {
  const result = spawnSync(process.execPath, ['scripts/build.mjs', ...(validateOnly ? ['--validate-only'] : [])], {
    cwd: dir, encoding: 'utf8', env: { ...process.env, NETLIFY: '', CONTEXT: '', ...environment },
  });
  return { ...result, output: result.stdout + result.stderr };
}
const read = (dir, file) => fs.readFile(path.join(dir, file), 'utf8');
const save = (dir, file, value) => fs.writeFile(path.join(dir, file), JSON.stringify(value));

test('production emits the site and GitHub CMS without source documents or deployment secrets', async t => {
  const dir = await fixture(t);
  const result = build(dir, { NETLIFY: 'true', CONTEXT: 'production' });
  assert.equal(result.status, 0, result.output);
  const config = YAML.parse(await read(dir, 'dist/admin/config.yml'));
  assert.equal(config.backend.name, 'github');
  assert.equal(config.backend.repo, 'bibanez/miqueloliu');
  assert.equal(config.backend.site_domain, 'miqueloliu.netlify.app');
  assert.equal(config.publish_mode, 'simple');
  assert.equal(config.local_backend, undefined);
  const outputs = await fs.readdir(path.join(dir, 'dist'));
  for (const privateFile of ['content', 'documentacio', 'auth-worker', 'wrangler.jsonc', 'package.json', '.git']) assert.ok(!outputs.includes(privateFile));
  const contact = await read(dir, 'dist/contact.html');
  assert.match(contact, /<textarea id="contact-message"/);
  assert.match(contact, /<option value="general"/);
});

test('an editor can create a new work and programme note without adding an HTML template', async t => {
  const dir = await fixture(t);
  const work = {
    id: 'prova-nova', category: 'cambra', order: 0, title: { ca: 'Prova & llum' },
    programmeNote: { sections: [{ language: 'ca', title: 'Prova & llum', blocks: [
      { type: 'prose', body: 'Una **nota** nova.' },
      { type: 'poem', text: 'Primer vers\nSegon vers\n\nUna altra estrofa <script>' },
    ] }] },
  };
  await save(dir, 'content/works/prova-nova.json', work);
  let result = build(dir);
  assert.equal(result.status, 0, result.output);
  const page = await read(dir, 'dist/obres/prova-nova.html');
  assert.match(page, /<strong>nota<\/strong>/);
  assert.match(page, /work-info-stanza-break/);
  assert.match(page, /Una altra estrofa &lt;script&gt;/);
  assert.match(await read(dir, 'dist/js/data/work-info.js'), /obres\/prova-nova.html/);
  work.archived = true;
  await save(dir, 'content/works/prova-nova.json', work);
  result = build(dir);
  assert.equal(result.status, 0, result.output);
  assert.doesNotMatch(await read(dir, 'dist/js/data/works.js'), /"id":"prova-nova"/);
  assert.ok(await read(dir, 'dist/obres/prova-nova.html'));
});

test('contact changes update the visible address, copy action, and email form', async t => {
  const dir = await fixture(t);
  const contact = JSON.parse(await read(dir, 'content/pages/contact.json'));
  contact.contactEmail = 'editor@example.com';
  await save(dir, 'content/pages/contact.json', contact);
  const result = build(dir);
  assert.equal(result.status, 0, result.output);
  const page = await read(dir, 'dist/contact.html');
  assert.match(page, /mailto:editor@example.com/);
  assert.match(page, /const email = 'editor@example.com'/);
  assert.doesNotMatch(page, /mqoliu@gmail.com/);
});

test('missing nested audio and unsafe asset paths fail before publication', async t => {
  const dir = await fixture(t);
  const work = JSON.parse(await read(dir, 'content/works/pluja.json'));
  work.parts = [{ id: 'prova', recordings: [{ id: 'audio', title: 'Prova', src: '/audio/missing.mp3' }] }];
  await save(dir, 'content/works/pluja.json', work);
  let result = build(dir, {}, true);
  assert.notEqual(result.status, 0);
  assert.match(result.output, /No existeix el fitxer/);
  work.parts = []; work.links = { score: 'javascript:alert(1)' };
  await save(dir, 'content/works/pluja.json', work);
  result = build(dir, {}, true);
  assert.notEqual(result.status, 0);
  assert.match(result.output, /URL no vàlida/);
});

test('deploy previews point editors to production and do not expose an active CMS', async t => {
  const dir = await fixture(t);
  const result = build(dir, { NETLIFY: 'true', CONTEXT: 'deploy-preview' });
  assert.equal(result.status, 0, result.output);
  const admin = await read(dir, 'dist/admin/index.html');
  assert.match(admin, /https:\/\/miqueloliu.netlify.app\/admin\//);
  assert.doesNotMatch(admin, /decap-cms.js/);
  await assert.rejects(read(dir, 'dist/admin/config.yml'), { code: 'ENOENT' });
});
