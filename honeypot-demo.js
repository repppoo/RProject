(() => {
 'use strict';
 function classify(event,hashChanged,before,after){
  if(event==='deleted')return {type:'DELETED',reason:'A monitored honeyfile was deleted.',tracked:true};
  if(event==='renamed')return {type:'RENAMED',reason:'A monitored honeyfile was renamed.',tracked:true};
  if(event==='created')return {type:'CREATED',reason:'A honeyfile creation event was recorded; creation is not tracked by the burst rule.',tracked:false};
  if(!hashChanged)return {type:'MODIFIED_METADATA',reason:'The hash is unchanged. The event does not show an actual content change.',tracked:false};
  if(after-before>=.3-1e-10)return {type:'SUSPICIOUS_ENCRYPTION',reason:'Content changed and entropy increased by at least 0.30. Investigate the cause; this is a heuristic alert.',tracked:true};
  return {type:'MODIFIED_CONTENT',reason:'Content changed, but the entropy increase is below the suspicious-change threshold.',tracked:true};
 }
 window.classifyHoneyEvent=classify;
 if(!document.querySelector('#honey-form'))return;
 const $=s=>document.querySelector(s);let events=[],tracked=[];
 function burst(){const now=Date.now();tracked=tracked.filter(t=>now-t<=20000);$('#honey-burst-count').textContent=tracked.length;$('#honey-burst-state').textContent=tracked.length>=3?'BURST DETECTED — review activity':'Below threshold';}
 document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{const p=b.dataset.preset;$('#honey-event').value='modified';$('#honey-hash').value=p==='metadata'?'same':'changed';$('#entropy-before').value='4.2';$('#entropy-after').value=p==='encryption'?'7.8':p==='metadata'?'4.2':'4.3';}));
 $('#honey-form').addEventListener('submit',event=>{event.preventDefault();const before=Number($('#entropy-before').value),after=Number($('#entropy-after').value);if(!Number.isFinite(before)||!Number.isFinite(after)||before<0||before>8||after<0||after>8)return;const r=classify($('#honey-event').value,$('#honey-hash').value==='changed',before,after);const now=Date.now();if(r.tracked)tracked.push(now);$('#honey-verdict').textContent=r.type;$('#honey-explanation').textContent=r.reason;$('#honey-delta').textContent=$('#honey-event').value==='modified'?`${after-before>=0?'+':''}${(after-before).toFixed(2)}`:'Not applicable';events.unshift({time:new Date(now).toLocaleTimeString(),type:r.type});events=events.slice(0,12);const list=$('#honey-events');list.replaceChildren();events.forEach(e=>{const row=document.createElement('div');row.className='event-line';const time=document.createElement('span'),file=document.createElement('span'),type=document.createElement('strong');time.textContent=e.time;file.textContent='sample-honeyfile.txt';type.textContent=e.type;row.append(time,file,type);list.append(row);});burst();});
 $('#honey-reset').addEventListener('click',()=>{events=[];tracked=[];$('#honey-verdict').textContent='Waiting for an event.';$('#honey-explanation').textContent='Pick a preset or adjust the controls, then send an event.';$('#honey-delta').textContent='—';$('#honey-events').replaceChildren();burst();});setInterval(burst,1000);burst();
})();
