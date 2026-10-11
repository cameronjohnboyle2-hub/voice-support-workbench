import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState, applyEvent, scenarios} from '../site/replay.mjs';
const run = events => events.reduce(applyEvent, initialState());
test('grounded answer retains its policy reference', () => {
  const state = run(scenarios[0].events);
  assert.equal(state.status, 'answered');
  assert.equal(state.transcript.at(-1).source, 'fictional-policy/returns-v1');
});
test('interruption rejects the old result and applies the new answer', () => {
  const state = run(scenarios[1].events);
  assert.equal(state.ignored, 1);
  assert.equal(state.applied, 1);
  assert.ok(state.transcript.at(-1).text.includes('Lamp One'));
  assert.ok(!state.transcript.some(x => x.text.includes('must be ignored')));
});
test('duplicate delivery cannot apply the same answer twice', () => {
  const events = [...scenarios[0].events, scenarios[0].events.at(-1)];
  const state = run(events);
  assert.equal(state.applied, 1);
  assert.equal(state.ignored, 1);
});
test('failure never becomes answered and clears pending lookup', () => {
  const state = run(scenarios[2].events);
  assert.equal(state.status, 'needs review');
  assert.equal(state.pending, null);
});
test('wrong call identity leaves legitimate active lookup intact', () => {
  const active = run(scenarios[0].events.slice(0,2));
  const state = applyEvent(active, {...scenarios[0].events[2], call:'other'});
  assert.equal(state.pending, 'return-1');
  assert.equal(state.applied, 0);
});
test('new user turn invalidates pending previous lookup', () => {
  const state = run([...scenarios[0].events.slice(0,2), {type:'user',text:'Different question'}, scenarios[0].events[2]]);
  assert.equal(state.ignored, 1);
  assert.equal(state.status, 'thinking');
});
test('rejected inputs do not mutate prior state', () => {
  const state = initialState();
  assert.throws(() => applyEvent(state, {type:'user',text:'x'.repeat(501)}));
  assert.deepEqual(state, initialState());
});
test('two active calls cannot overwrite the pending identity', () => {
  const state = run(scenarios[0].events.slice(0,2));
  assert.throws(() => applyEvent(state, {type:'tool_start',turn:1,call:'second'}));
});
test('a result without a started tool is ignored', () => {
  const state = applyEvent(initialState(), {type:'tool_result',turn:0,call:null,text:'uninvited answer'});
  assert.equal(state.applied, 0);
  assert.equal(state.ignored, 1);
  assert.equal(state.transcript.length, 0);
});
