import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import YAML from 'yaml';

const config = YAML.parse(await fs.readFile('admin/config.yml', 'utf8'));
const fields = config.collections.find(collection => collection.name === 'works').fields;
const field = (fields, name) => fields.find(item => item.name === name);
const partFields = field(fields, 'parts').fields;

// Decap's ObjectControl reads each child by name, including an object declared
// through a list's singular `field`. Check those paths against real saved data.
function requiredPaths(fields, value, path = '') {
  return fields.flatMap(item => {
    const currentPath = `${path}${item.name}`;
    const current = value?.[item.name];
    if (item.widget === 'object') return requiredPaths(item.fields, current, `${currentPath}.`);
    if (item.widget === 'list') {
      return (current || []).flatMap((entry, index) =>
        requiredPaths(item.fields || [item.field], entry, `${currentPath}.${index}.`));
    }
    return item.required !== false && !current?.trim() ? [currentPath] : [];
  });
}

test('saved movement titles satisfy required CMS paths for works and all four notebooks', async () => {
  let notebooks = 0;
  for (const name of await fs.readdir('content/works')) {
    if (!name.endsWith('.json')) continue;
    const work = JSON.parse(await fs.readFile(`content/works/${name}`, 'utf8'));
    assert.deepEqual(requiredPaths([field(fields, 'movements')], work), [], name);
    for (const part of work.parts || []) {
      assert.deepEqual(requiredPaths([field(partFields, 'movements')], part), [], `${name}/${part.id}`);
      if (work.id === 'llibre-dhores') notebooks++;
    }
  }
  assert.equal(notebooks, 4);
});

test('Catalan movement titles remain required while translations can be left blank', () => {
  for (const schema of [fields, partFields]) {
    const movement = field(schema, 'movements');
    assert.deepEqual(requiredPaths([movement], { movements: [{ ca: 'Misteri de nit' }] }), []);
    assert.deepEqual(requiredPaths([movement], { movements: [{ ca: '', en: 'Title' }] }), ['movements.0.ca']);
    assert.deepEqual(requiredPaths([movement], {}), []);
  }
});

test('notebooks offer the same score and audio link controls as the complete work', () => {
  for (const name of ['score', 'links']) {
    assert.deepEqual(field(partFields, name), field(fields, name));
  }
});
