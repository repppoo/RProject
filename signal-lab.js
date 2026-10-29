(() => {
  'use strict';
  const model = window.SIGNAL_MODEL;
  const stop = new Set(model.stopwords);
  function classify(text) {
    const tokens = (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter(t => t.length > 2 && !stop.has(t));
    const unique = [...new Set(tokens)];
    const known = unique.filter(t => Object.hasOwn(model.weights, t));
    // Cap repeated words so copying a word many times cannot dominate a result.
    const weights = known.map(word => ({word, weight:model.weights[word]}));
    const score = Math.round(100 / (1 + Math.exp(-weights.reduce((n,t)=>n+t.weight,model.bias)/model.temperature)));
    const coverage = unique.length ? known.length/unique.length : 0;
    const insufficient = known.length < 3 || coverage < .2;
    const label = insufficient ? 'Insufficient context' : score >= 68 ? 'Needs human review' : score <= 32 ? 'Low signal' : 'Mixed signals';
    return {label,score:insufficient?null:score,known:known.length,coverage,evidence:weights.sort((a,b)=>Math.abs(b.weight)-Math.abs(a.weight)).slice(0,5)};
  }
  window.classifySignal = classify;
  window.signalCsvCell = value => '"'+String(value).replace(/^[\s]*[=+@-]/,s=>"'"+s).replace(/"/g,'""')+'"';
  if (!document.querySelector('#signal-form')) return;
  const $ = s=>document.querySelector(s);
  const key='arif-signal-queue-v1';
  let queue=[];
  let canStore=true;
  const labels=['Insufficient context','Needs human review','Low signal','Mixed signals'];
  try { const saved=JSON.parse(localStorage.getItem(key)||'[]'); if(Array.isArray(saved))queue=saved.filter(r=>r&&typeof r.id==='string'&&typeof r.text==='string'&&r.text.length<=1800&&typeof r.time==='string'&&labels.includes(r.label)&&(r.score===null||Number.isFinite(r.score)&&r.score>=0&&r.score<=100)).slice(0,20); }
  catch {canStore=false;}
  function persist(){try{localStorage.setItem(key,JSON.stringify(queue));canStore=true;}catch{canStore=false;}$('#queue-storage').textContent=canStore?'Stored only in this browser. The latest 20 results are retained.':'Browser storage is unavailable. Records last for this page session; export to keep them.';}
  function renderQueue(){
    $('#queue-count').textContent=`${queue.length} ${queue.length===1?'record':'records'}`;
    $('#export-queue').disabled=!queue.length;$('#clear-queue').disabled=!queue.length;
    const list=$('#queue-list');list.replaceChildren();
    if(!queue.length){const p=document.createElement('p');p.className='queue-empty';p.textContent='Your queue is empty. Analyse a post with automatic saving enabled to add the first record.';list.append(p);return;}
    queue.forEach(r=>{
      const row=document.createElement('div');row.className='queue-row';
      const label=document.createElement('span');label.className='queue-badge';label.textContent=r.label;
      const text=document.createElement('p');text.textContent=r.text;
      const time=document.createElement('time');time.dateTime=r.time;time.textContent=new Date(r.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
      const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label',`Remove record ${r.id}`);
      remove.addEventListener('click',()=>{queue=queue.filter(q=>q.id!==r.id);persist();renderQueue();$('#queue-status').textContent='Record removed.';});
      row.append(label,text,time,remove);list.append(row);
    });
  }
  const samples={review:'Someone is selling stolen login credentials and confidential customer records from a breached server.',routine:'I joined a university workshop on secure software development and built a Python project for our training lab.',unknown:'The recipe uses mango, coconut, cardamom and a sprinkle of cinnamon.'};
  document.querySelectorAll('[data-sample]').forEach(button=>button.addEventListener('click',()=>{$('#signal-text').value=samples[button.dataset.sample];$('#signal-length').textContent=`${$('#signal-text').value.length} / 1,800`;$('#signal-message').textContent='Example loaded. Select Analyse to run the model.';$('#signal-text').focus();}));
  $('#signal-text').addEventListener('input',()=>{$('#signal-length').textContent=`${$('#signal-text').value.length} / 1,800`;$('#signal-message').textContent='';});
  $('#signal-form').addEventListener('submit',event=>{
    event.preventDefault();const text=$('#signal-text').value.trim();
    if(text.length<12||text.length>1800){$('#signal-message').textContent='Enter 12–1,800 characters.';$('#signal-text').focus();return;}
    const result=classify(text);$('#signal-label').textContent=result.label.toUpperCase();$('#signal-verdict').textContent=result.label;
    $('#signal-result').dataset.result=result.label==='Needs human review'?'review':result.label==='Low signal'?'low':'mixed';
    $('.signal-orbit').textContent=result.label==='Needs human review'?'⌕':result.label==='Low signal'?'◌':'?';
    const explanations={'Needs human review':'The wording resembles suspicious-activity examples in this small training set. Check the source and context before drawing a conclusion.','Low signal':'The wording resembles routine or educational examples. This is not a safety assessment; important details may be missing.','Mixed signals':'The model sees both routine and review-worthy language. A person should inspect the meaning and context.','Insufficient context':'Too little of this text is represented in the training vocabulary. The model is abstaining rather than guessing.'};
    $('#signal-explanation').textContent=explanations[result.label];$('#signal-details').hidden=result.score===null;
    $('#signal-score').textContent=result.score===null?'—':`${result.score} / 100`;$('#signal-meter').style.width=`${result.score??0}%`;
    const evidence=$('#signal-evidence');evidence.replaceChildren();
    result.evidence.forEach(item=>{const chip=document.createElement('span');chip.textContent=`${item.word} ${item.weight>=0?'↑':'↓'}`;chip.title=item.weight>=0?'Pushes toward review':'Pushes toward routine';evidence.append(chip);});
    if($('#auto-queue').checked){
      if(queue.some(r=>r.text===text)){ $('#signal-message').textContent='Analysed. This text is already in your queue.'; }
      else{queue.unshift({id:`SIG-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`,time:new Date().toISOString(),text,label:result.label,score:result.score});queue=queue.slice(0,20);persist();renderQueue();$('#signal-message').textContent='Analysed → record saved to your queue.';}
    }else{$('#signal-message').textContent='Analysed. Automatic saving is off.';}
  });
  $('#clear-queue').addEventListener('click',()=>{queue=[];persist();renderQueue();$('#queue-status').textContent='Queue cleared from this browser.';});
  $('#export-queue').addEventListener('click',()=>{
    if(!queue.length)return;
    const rows=[['ID','Timestamp UTC','Text','Model label','Review signal score','Model version'],...queue.map(r=>[r.id,r.time,r.text,r.label,r.score??'',model.version])];
    const csv='\uFEFF'+rows.map(row=>row.map(window.signalCsvCell).join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='arif-signal-review.csv';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#queue-status').textContent=`Exported ${queue.length} ${queue.length===1?'record':'records'} as CSV.`;
  });
  renderQueue();if(!canStore)$('#queue-storage').textContent='Browser storage is unavailable. Export your records to keep them.';
})();
