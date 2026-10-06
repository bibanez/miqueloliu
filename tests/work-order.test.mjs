import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const source = await fs.readFile('admin/work-order.js', 'utf8');
function editor(fetch) {
  let control;
  vm.runInNewContext(source, { fetch, window: {
    CMS: { registerWidget(name, component) { assert.equal(name, 'work-order'); control = component; } },
    createClass: component => component,
    h: (tag, props, ...children) => ({ tag, props, children }),
  } });
  return value => ({
    ...control, state: control.getInitialState(),
    props: { value, onChange(next) { this.value = next; } },
    setState(change) { Object.assign(this.state, change); },
  });
}

test('place-first uses fresh catalogue orders and remembers other drafts in the session', async () => {
  const create = editor(async (url, options) => {
    assert.equal(url, '/admin/work-order.json');
    assert.equal(options.cache, 'no-store');
    return { ok: true, json: async () => ({ orders: [0, 1, -4] }) };
  });
  const first = create(0);
  const button = first.render().children.find(node => node.tag === 'button');
  assert.equal(button.props.type, 'button');
  await button.props.onClick.call(first);
  assert.equal(first.props.value, -5);
  assert.equal(first.isValid(), true);
  const second = create(0);
  await second.placeFirst();
  assert.equal(second.props.value, -6);
  const earlier = create(-10);
  await earlier.placeFirst();
  assert.equal(earlier.props.value, -11);
});

test('failed or invalid catalogue responses preserve the work order and allow retry', async () => {
  for (const fetch of [async () => { throw new Error('Offline'); }, async () => ({ ok: false }), async () => ({ ok: true, json: async () => ({ orders: [1.5] }) })]) {
    const instance = editor(fetch)(3);
    await instance.placeFirst();
    assert.equal(instance.props.value, 3);
    assert.equal(instance.state.busy, false);
    assert.match(instance.state.message, /Torneu-ho a provar/);
  }
});

test('manual order entry accepts negative integers and rejects blank or fractional values', () => {
  const instance = editor(() => {})(0);
  const input = instance.render().children.find(node => node.tag === 'input');
  input.props.onChange({ target: { value: '-7' } });
  assert.equal(instance.props.value, -7);
  assert.equal(instance.isValid(), true);
  for (const value of ['-1.5', '', '9007199254740992']) {
    input.props.onChange({ target: { value } });
    assert.ok(instance.isValid().error);
  }
});
