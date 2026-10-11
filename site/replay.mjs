export function initialState() {
  return {turn: 0, status: 'ready', pending: null, seen: [], transcript: [], ignored: 0, applied: 0};
}

export function applyEvent(previous, event) {
  const next = structuredClone(previous);
  if (!event || typeof event.type !== 'string') throw new Error('An event type is required.');
  if (event.type === 'user') {
    if (typeof event.text !== 'string' || event.text.length > 500) throw new Error('Invalid authored transcript.');
    next.turn += 1;
    next.pending = null;
    next.status = 'thinking';
    next.transcript.push({role: 'user', text: event.text});
  } else if (event.type === 'tool_start') {
    if (event.turn !== next.turn || typeof event.call !== 'string' || !event.call || next.pending || next.seen.includes(event.call)) throw new Error('Invalid active tool identity.');
    next.pending = event.call;
    next.status = 'looking up';
  } else if (event.type === 'tool_result' || event.type === 'tool_error') {
    if (typeof event.call !== 'string' || !event.call || !next.pending || event.turn !== next.turn || event.call !== next.pending || next.seen.includes(event.call)) {
      next.ignored += 1;
      return next;
    }
    if (typeof event.text !== 'string' || event.text.length > 1000) throw new Error('Invalid tool output.');
    next.seen.push(event.call);
    next.pending = null;
    next.applied += 1;
    next.status = event.type === 'tool_error' ? 'needs review' : 'answered';
    next.transcript.push({role: event.type === 'tool_error' ? 'notice' : 'agent', text: event.text, source: event.source ?? null});
  } else if (event.type === 'interrupt') {
    next.turn += 1;
    next.pending = null;
    next.status = 'listening';
    next.transcript.push({role: 'notice', text: 'Earlier reply cancelled. Await the next question.'});
  } else {
    throw new Error('Unknown event type.');
  }
  return next;
}

export const scenarios = [
  {name: 'Grounded answer', lesson: 'Approved fictional policy provides the source for the answer.', events: [
    {type:'user', text:'Can I return an unused Maple Desk accessory?'},
    {type:'tool_start', turn:1, call:'return-1'},
    {type:'tool_result', turn:1, call:'return-1', text:'Unused Maple Desk accessories can be returned within 14 days in this fictional example.', source:'fictional-policy/returns-v1'},
  ]},
  {name: 'Interruption and late result', lesson: 'A delayed result from an older turn cannot answer the new question.', events: [
    {type:'user', text:'Tell me about returns.'},
    {type:'tool_start', turn:1, call:'old-1'},
    {type:'interrupt'},
    {type:'user', text:'Actually, help me set up Lamp One.'},
    {type:'tool_start', turn:3, call:'new-1'},
    {type:'tool_result', turn:1, call:'old-1', text:'This older returns reply must be ignored.'},
    {type:'tool_result', turn:3, call:'new-1', text:'For the fictional Lamp One, connect its included cable, then hold the power button for two seconds.', source:'fictional-policy/lamp-one-v1'},
  ]},
  {name:'Service failure', lesson:'Show a clear failure and human-review route without inventing success.', events:[
    {type:'user', text:'Can you check the setup instructions?'},
    {type:'tool_start', turn:1, call:'fail-1'},
    {type:'tool_error', turn:1, call:'fail-1', text:'The simulated lookup failed. Try again later or ask a person for help; no request has been sent.'},
  ]},
];
