import {initialState, applyEvent, scenarios} from './replay.mjs';
const el = id => document.getElementById(id);
let choice = 0, position = 0, state = initialState();
for (const [index, scenario] of scenarios.entries()) {
  const option = document.createElement('option'); option.value = String(index); option.textContent = scenario.name; el('scenario').append(option);
}
function render() {
  const scenario = scenarios[choice];
  el('lesson').textContent = scenario.lesson;
  el('status').textContent = state.status;
  el('progress').textContent = `${position} / ${scenario.events.length} events`;
  el('applied').textContent = String(state.applied); el('ignored').textContent = String(state.ignored);
  el('step').disabled = position === scenario.events.length;
  el('transcript').replaceChildren();
  if (!state.transcript.length) { const p = document.createElement('p'); p.className='empty'; p.textContent='Start the example to see the conversation.'; el('transcript').append(p); }
  for (const message of state.transcript) {
    const article=document.createElement('article');article.className=`bubble ${message.role}`;
    const role=document.createElement('span');role.className='role';role.textContent=message.role==='agent'?'Authored assistant':message.role;
    const text=document.createElement('div');text.textContent=message.text;article.append(role,text);
    if(message.source){const source=document.createElement('small');source.textContent=`Source: ${message.source}`;article.append(source);}
    el('transcript').append(article);
  }
}
function reset() {position=0;state=initialState();render();}
el('scenario').addEventListener('change',event=>{choice=Number(event.target.value);reset();});
el('reset').addEventListener('click',reset);
el('step').addEventListener('click',()=>{if(position<scenarios[choice].events.length){state=applyEvent(state,scenarios[choice].events[position]);position+=1;render();}});
render();
