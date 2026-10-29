(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reducedPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reducedPreference.matches;
  let raf = 0;
  let lastFocused = null;
  const visuals = {
    forensic: '<div class="terminal-art forensic-art"><div class="terminal-dots">DFIR DESK / CASE FILES</div><div><b>8 incidents.</b> One investigator.</div><div>VPN → evidence → timeline</div><div>37 challenges. Your move.</div></div>',
    honeypot: '<div class="audit-art honeypot-art"><span>HONEYFILE MONITOR</span><div class="audit-item"><span>SHA-256</span><b>CHANGED</b></div><div class="audit-item"><span>Entropy delta</span><b>+0.30</b></div><div class="audit-item"><span>Event burst</span><b>3 / 20 SEC</b></div></div>',
    nexus: '<div class="nexus-art"><div class="search-chip">⌕ &nbsp; Find the proof of payment<span>↵</span></div><div class="document-stack"><b>Payment found.</b><div class="document-lines"><i></i><i></i><i></i></div></div><span class="found-badge">✓ &nbsp; Linked to the source</span></div>',
    forecast: '<div class="forecast-art"><div class="chart-heading"><b>12 months.</b><span>ONE CLEARER PICTURE</span></div><svg class="chart" viewBox="0 0 260 85" preserveAspectRatio="none"><path class="chart-grid" d="M0 20H260M0 45H260M0 70H260"/><path class="chart-area" d="M0 67L24 56 48 61 73 39 97 44 120 27 145 34 169 16 193 25 217 11 240 15 260 3V85H0Z"/><path class="chart-line" d="M0 67L24 56 48 61 73 39 97 44 120 27 145 34 169 16 193 25 217 11 240 15 260 3"/></svg><div class="chart-axis"><span>JAN</span><span>JUN</span><span>DEC</span></div></div>',
    audit: '<div class="audit-art"><span>RECONCILIATION REVIEW</span><div class="audit-item"><span>01 &nbsp; Reviewer notes</span><b>INTERPRET</b></div><div class="audit-item"><span>02 &nbsp; Remediation</span><b>CLASSIFY</b></div><div class="audit-item"><span>03 &nbsp; Structured report</span><b>CONNECT</b></div></div>',
    email: '<div class="email-art"><b>✉</b><span>···→</span><b>▤</b></div>',
    threat: '<div class="radar"><i></i><i></i></div><span class="radar-label">RESEARCH IN PROGRESS</span>',
    lab: '<div class="terminal-art"><div class="terminal-dots">● ● ●</div><div><b>~/lab</b> $ explore</div><div>→ security / data / systems</div><div><b>keep_learning</b> = True</div><div>$ <span class="terminal-cursor"></span></div></div>'
  };
  function renderProjects(filter = 'All') {
    const projects = data.projects.filter(p => filter === 'All' || p.category === filter);
    $('#project-grid').innerHTML = projects.map(p => `<button type="button" class="project-card" data-project="${escape(p.id)}" aria-label="Read ${escape(p.title)} case study"><div class="project-visual visual-${p.visual}" aria-hidden="true"><div class="visual-topline"><span>${escape(p.title.toUpperCase())}</span><span>↗</span></div>${visuals[p.visual]}<div class="visual-caption"><span>CONCEPT VISUAL</span><span>${escape(p.number)} / ${String(data.projects.length).padStart(2,'0')}</span></div></div><div class="project-meta"><span>${escape(p.context)}</span><span>${escape(p.number)}</span></div><div class="project-title-row"><h3>${escape(p.title)}</h3><span aria-hidden="true">↗</span></div><p>${escape(p.subtitle)}</p><div class="project-tags">${p.tags.map(t => `<span>${escape(t)}</span>`).join('')}</div></button>`).join('');
    $('.work-count').textContent = `${projects.length} ${projects.length === 1 ? 'project' : 'projects'}`;
  }
  const countLabel=String(data.projects.length).padStart(2,'0');
  $$('.project-total').forEach(el=>el.textContent=countLabel);
  renderProjects();
  $$('.filters button').forEach(button => button.addEventListener('click', () => {
    $$('.filters button').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    renderProjects(button.dataset.filter);
  }));
  const dialog = $('#project-dialog');
  $('#project-grid').addEventListener('click', event => {
    const card = event.target.closest('[data-project]');
    if (!card) return;
    const p = data.projects.find(p => p.id === card.dataset.project);
    lastFocused = card;
    $('#dialog-content').innerHTML = `<div class="dialog-context">${escape(p.context)}</div><h2 id="dialog-title">${escape(p.title)}</h2><p class="dialog-summary">${escape(p.summary)}</p>${p.demo?`<a class="button primary case-demo" href="${escape(p.demo)}">${escape(p.demoLabel)} <span>↗</span></a>`:''}<div class="dialog-result"><strong>${escape(p.result)}</strong><span>${escape(p.resultLabel)}</span></div>${[['The challenge',p.problem],['My approach',p.approach],['The outcome',p.outcome]].map(([title,text])=>`<section class="dialog-section"><h3>${title}</h3><p>${escape(text)}</p></section>`).join('')}<section class="dialog-section"><h3>Tools & focus</h3><div class="skill-tags">${p.tools.map(t=>`<span>${escape(t)}</span>`).join('')}</div></section>${p.note?`<p class="dialog-note">${escape(p.note)}</p>`:''}<p class="dialog-note">${p.context.startsWith('NOVARTIS')?'This project was completed as part of my internship. Internal source code, data, and systems are not publicly shared.':'This portfolio presents a project overview. Ask me about the implementation and current progress.'}</p>`;
    dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');
  });
  $('#dialog-content').addEventListener('click',event=>{if(event.target.closest('.case-demo'))dialog.close();});
  $('#close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{ if(event.target===dialog){ const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close(); }});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastFocused?.focus();});
  const menu=$('.menu-toggle');
  menu.addEventListener('click',()=>{ const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#mobile-nav').hidden=!open;menu.querySelector('span').textContent=open?'−':'+'; });
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');$('#mobile-nav').hidden=true;menu.querySelector('span').textContent='+';}));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#mobile-nav').hidden){menu.click();menu.focus();}});
  $('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(data.email);$('#copy-status').textContent='Copied!';setTimeout(()=>{$('#copy-status').textContent='';},3000);}catch{$('#copy-status').textContent=`Email: ${data.email}`;}});
  $$('.resume-link').forEach(link=>link.href=data.resume);
  $('#year').textContent=new Date().getFullYear();
  let running=false;
  const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  $('#run-demo').addEventListener('click',async()=>{
    if(running)return;running=true;const button=$('#run-demo');button.disabled=true;button.innerHTML='Running workflow <span>↻</span>';
    const steps=$$('.flow-step');steps.forEach((step,i)=>{step.classList.remove('running','complete');step.querySelector('.step-state').textContent=`0${i+1}`;});
    const logs=['Trigger received: a sample email contains invoice-sample.pdf.','Attachment retrieved: the sample file is ready for processing.','Record saved: sample filename and email details added to the demo database.'];
    $('#demo-status').textContent='RUNNING';
    for(let i=0;i<steps.length;i++){steps[i].classList.add('running');$('#demo-log').textContent=logs[i];await delay(reduced?150:950);steps[i].classList.remove('running');steps[i].classList.add('complete');steps[i].querySelector('.step-state').textContent='✓';}
    $('#demo-status').textContent='COMPLETE';$('#demo-log').textContent='✓ Workflow complete. One sample file, one structured record, no manual handling.';button.innerHTML='Run it again <span>↻</span>';button.disabled=false;running=false;
  });
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});$$('.section-heading,.about-intro,.about-detail,.playground-copy,.workflow-demo').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
  const progress=$('.reading-progress');
  function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${max>0?window.scrollY/max*100:0}%`;}
  window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
  // An original generative orbital sculpture. No tracking or third-party assets.
  const canvas=$('#orbital');const ctx=canvas.getContext('2d');
  let width=0,height=0,angle=0,lastTime=0,visible=true;const pointer={x:0,y:0};
  const points=[];const count=850;
  for(let i=0;i<count;i++){const y=1-2*(i+.5)/count;const r=Math.sqrt(1-y*y);const phi=i*2.399963229728653;points.push({x:Math.cos(phi)*r,y,z:Math.sin(phi)*r,size:i%13===0?1.8:.7});}
  function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);if(reduced)draw(0);}
  function project(x,y,z,r){const a=angle+pointer.x*.1;const x1=x*Math.cos(a)+z*Math.sin(a),z1=-x*Math.sin(a)+z*Math.cos(a);const tilt=-.30+pointer.y*.12;const y1=y*Math.cos(tilt)-z1*Math.sin(tilt),z2=y*Math.sin(tilt)+z1*Math.cos(tilt);const s=3.6/(3.6-z2);return{x:width*.55+x1*r*s,y:height*.48+y1*r*s,z:z2,s};}
  function draw(time){if(!ctx||!width)return;ctx.clearRect(0,0,width,height);const r=Math.min(width*.29,height*.34);if(time&&lastTime&&!reduced)angle+=Math.min(time-lastTime,60)*.00007;lastTime=time;
    const cx=width*.55,cy=height*.48;
    const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,r*1.65);glow.addColorStop(0,'rgba(147,181,94,0.06)');glow.addColorStop(.65,'rgba(135,174,80,0.025)');glow.addColorStop(1,'rgba(135,174,80,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    for(let j=0;j<8;j++){const lat=(j/7-.5)*Math.PI;ctx.beginPath();for(let i=0;i<=100;i++){const a=i/100*Math.PI*2;const p=project(Math.cos(lat)*Math.cos(a),Math.sin(lat),Math.cos(lat)*Math.sin(a),r);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.strokeStyle='rgba(163,190,116,0.13)';ctx.lineWidth=.6;ctx.stroke();}
    for(let j=0;j<11;j++){ctx.beginPath();for(let i=0;i<=100;i++){const a=i/100*Math.PI*2,b=j/11*Math.PI;const p=project(Math.cos(a)*Math.cos(b),Math.sin(a),Math.cos(a)*Math.sin(b),r);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.strokeStyle='rgba(163,190,116,0.1)';ctx.lineWidth=.5;ctx.stroke();}
    for(let ring=0;ring<3;ring++){ctx.beginPath();for(let i=0;i<=220;i++){const a=i/220*Math.PI*2;const x=Math.cos(a)*(1.4+ring*.15),y=Math.sin(a)*.45,z=Math.sin(a)*(1.3+ring*.1);const tilt=ring*.48-.4;const p=project(x*Math.cos(tilt)-y*Math.sin(tilt),x*Math.sin(tilt)+y*Math.cos(tilt),z,r);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.strokeStyle=ring===1?'rgba(198,233,154,0.65)':'rgba(159,180,118,0.24)';ctx.lineWidth=ring===1?1:.7;ctx.stroke();}
    const mapped=points.map(p=>({...project(p.x,p.y,p.z,r),size:p.size})).sort((a,b)=>a.z-b.z);
    for(const p of mapped){const alpha=.2+(p.z+1)/2*.7;ctx.beginPath();ctx.arc(p.x,p.y,p.size*p.s,0,Math.PI*2);ctx.fillStyle=`rgba(198,224,155,${alpha})`;ctx.fill();}
    const satellite=project(Math.cos(angle*2+1.1)*1.55,Math.sin(angle*2+1.1)*.4,Math.sin(angle*2+1.1)*1.4,r);ctx.beginPath();ctx.arc(satellite.x,satellite.y,4,0,Math.PI*2);ctx.fillStyle='#d6edb6';ctx.shadowBlur=16;ctx.shadowColor='#c6e99a';ctx.fill();ctx.shadowBlur=0;
  }
  function tick(time){raf=0;if(!reduced&&visible&&!document.hidden){draw(time);raf=requestAnimationFrame(tick);}}
  function start(){if(!raf&&!reduced&&visible&&!document.hidden){lastTime=0;raf=requestAnimationFrame(tick);}}
  function setMotion(value){reduced=value;document.documentElement.classList.toggle('reduce-motion',value);$('#motion-toggle').setAttribute('aria-pressed',String(value));$('#motion-toggle').innerHTML=`Motion: ${value?'off':'on'} <span>${value?'○':'◉'}</span>`;if(value){cancelAnimationFrame(raf);raf=0;draw(0);}else start();}
  $('#motion-toggle').addEventListener('click',()=>setMotion(!reduced));reducedPreference.addEventListener('change',e=>setMotion(e.matches));
  $('.hero').addEventListener('pointermove',e=>{const rect=canvas.getBoundingClientRect();pointer.x=(e.clientX-rect.left)/rect.width-.5;pointer.y=(e.clientY-rect.top)/rect.height-.5;},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else start();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(raf);raf=0;}},{threshold:0}).observe(canvas);
  window.addEventListener('resize',()=>{resize();updateProgress();},{passive:true});resize();setMotion(reduced);draw(0);start();
})();
