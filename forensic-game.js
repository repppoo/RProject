(() => {
 'use strict';
 const cases=window.FORENSIC_CASES;
 const $=s=>document.querySelector(s);
 const total=cases.reduce((n,c)=>n+c.questions.length,0);
 const solved=new Set(),attempts=new Map();let current=0;
 const normalise=value=>value.trim().toLowerCase().replace(/\s+/g,' ');
 function progress(){const score=solved.size*10;$('#game-score').textContent=`${score} / ${total*10}`;$('#game-progress').textContent=`${solved.size} of ${total} solved`;}
 function render(){
  const nav=$('#case-list');nav.replaceChildren();
  cases.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.className='case-option'+(i===current?' active':'');b.setAttribute('aria-current',i===current?'true':'false');const title=document.createElement('strong');title.textContent=c.title;const meta=document.createElement('small');meta.textContent=`${c.id} · ${c.difficulty}`;b.append(title,meta);b.addEventListener('click',()=>{current=i;render();});nav.append(b);});
  const c=cases[current];$('#case-title').textContent=c.title;$('#case-category').textContent=c.category;$('#case-brief').textContent=c.briefing;$('#case-evidence').textContent=c.evidence;
  const questions=$('#case-questions');questions.replaceChildren();
  c.questions.forEach((q,i)=>{
   const key=`${c.id}:${q.id}`,container=document.createElement('section');container.className='challenge';
   const label=document.createElement('label');label.htmlFor=`answer-${key}`;label.textContent=`${i+1}. ${q.prompt}`;
   const hint=document.createElement('details'),summary=document.createElement('summary'),hintText=document.createElement('p');summary.textContent='Show hint';hintText.textContent=q.hint;hint.append(summary,hintText);
   const form=document.createElement('form'),input=document.createElement('input'),button=document.createElement('button'),feedback=document.createElement('p');input.id=label.htmlFor;input.type='text';input.maxLength=200;input.autocomplete='off';input.placeholder='Your answer';input.required=true;button.type='submit';button.textContent='Check answer';feedback.className='feedback';feedback.setAttribute('role','status');
   const used=attempts.get(key)||0;
   if(solved.has(key)){input.disabled=true;button.disabled=true;feedback.textContent='✓ Correct — 10 points earned.';}else if(used>=2){input.disabled=true;button.disabled=true;feedback.textContent=`Attempts used. Answer: ${q.answer}`;}
   form.addEventListener('submit',event=>{event.preventDefault();const value=normalise(input.value);if(!value||solved.has(key)||(attempts.get(key)||0)>=2)return;const n=(attempts.get(key)||0)+1;attempts.set(key,n);if(value===normalise(q.answer)){solved.add(key);input.disabled=true;button.disabled=true;feedback.textContent='✓ Correct — 10 points earned.';progress();if(solved.size===total)showResults();}else if(n>=2){input.disabled=true;button.disabled=true;feedback.textContent=`Attempts used. Answer: ${q.answer}`;}else{feedback.textContent='Not quite. Check the evidence or hint — one attempt remains.';}});
   form.append(input,button);container.append(label,hint,form,feedback);questions.append(container);
  });progress();
 }
 function showResults(){const score=solved.size*10;const locked=[...attempts].filter(([key,n])=>n>=2&&!solved.has(key)).length;$('#game-results').hidden=false;$('#game-results').textContent=`Current result: ${score} / ${total*10} points · ${solved.size} solved · ${locked} challenges with attempts used · ${total-solved.size-locked} still open. You can continue with any open challenge.`;$('#game-results').scrollIntoView({block:'center',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 $('#game-summary').addEventListener('click',showResults);
 $('#game-reset').addEventListener('click',()=>{solved.clear();attempts.clear();current=0;$('#game-results').hidden=true;render();});render();
})();
