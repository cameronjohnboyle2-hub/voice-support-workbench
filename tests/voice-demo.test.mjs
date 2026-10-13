import test from 'node:test';
import assert from 'node:assert/strict';
import { mountVoiceDemo } from '../site/voice-demo.mjs';

function fixture() {
  const elements = Object.fromEntries(['consent', 'start', 'end', 'widget-host', 'voice-status'].map(id => [id, { checked: false, disabled: true, listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; } }]));
  let frame = null;
  let timer = null;
  const document = {
    getElementById: id => elements[id],
    createElement: tag => { assert.equal(tag, 'iframe'); return { remove() { frame = null; } }; }
  };
  elements['widget-host'].append = child => { frame = child; };
  const clock = { setTimeout(callback, delay) { assert.equal(delay, 120_000); timer = callback; return 1; }, clearTimeout() { timer = null; } };
  const controller = mountVoiceDemo(document, clock);
  const click = id => elements[id].listeners.click();
  const consent = checked => { elements.consent.checked = checked; elements.consent.listeners.change(); };
  return { elements, controller, click, consent, frame: () => frame, expire: () => timer(), timer: () => timer };
}

test('widget cannot load without affirmative consent; repeated clicks create no duplicate frame', () => {
  const f = fixture();
  f.click('start');
  assert.equal(f.frame(), null);
  f.consent(true);
  f.click('start');
  const first = f.frame();
  assert.equal(first.src, 'voice-widget.html');
  assert.equal(first.allow, 'microphone');
  f.click('start');
  assert.equal(f.frame(), first);
});

test('withdrawing consent unloads the widget and cancels its timer', () => {
  const f = fixture(); f.consent(true); f.click('start'); f.consent(false);
  assert.equal(f.frame(), null);
  assert.equal(f.timer(), null);
  assert.equal(f.elements.start.disabled, true);
  assert.equal(f.elements.end.disabled, true);
});

test('deadline unloads the frame and a new demo can be ended explicitly', () => {
  const f = fixture(); f.consent(true); f.click('start'); f.expire();
  assert.equal(f.frame(), null);
  assert.equal(f.timer(), null);
  f.click('start');
  assert.ok(f.frame());
  f.click('end');
  assert.equal(f.frame(), null);
  assert.equal(f.timer(), null);
});
