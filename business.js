(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const samples = {standard:{id:'DEMO-1001',qty:4},large:{id:'DEMO-1002',qty:30},repeat:{id:'DEMO-1001',qty:4}};
  const buttons=[...document.querySelectorAll('[data-scenario]')];
  let stock=24,total=0;
  const accepted=new Set(),events=[];
  function logEvent(name,order){events.push({event:name,order_id:order.id,quantity:order.qty,available_stock:stock});$('event-log').textContent=JSON.stringify(events.slice(-12),null,2);}
  function renderMetrics(){$('stock-count').textContent=stock;$('order-count').textContent=accepted.size;$('order-value').textContent='RM '+total;}
  function decision(title,lines,benefit){$('ops-result').textContent=title;$('ops-log').replaceChildren(...lines.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));$('ops-benefit').textContent=benefit;}
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const order=samples[button.dataset.scenario];
    buttons.forEach(b=>b.classList.toggle('scenario-selected',b===button));
    if(accepted.has(order.id)){
      decision('Already received — no double counting.',['This is the same order for 4 meals.','The system recognises it and leaves the totals unchanged.'], 'A repeated message won’t reduce stock twice or create a second order.');logEvent('demo_duplicate_blocked',order);return;
    }
    if(order.qty>stock){
      decision('Not enough meals. Ask the team.',['The customer wants '+order.qty+' meals, but only '+stock+' are available.','The order is held for someone to review. Stock stays the same.'], 'Staff can offer another option before accepting an order they cannot fulfil.');logEvent('demo_order_held',order);return;
    }
    stock-=order.qty;total+=order.qty*18;accepted.add(order.id);renderMetrics();
    buttons.find(b=>b.dataset.scenario==='repeat').disabled=false;
    decision('Order received. Four meals reserved.',['The order for 4 meals is recorded once.','Available meals drop from 24 to 20. The order total is RM 72.','Now try “Send it again” to see what happens with a repeated order.'], 'Staff get an up-to-date order count and stock total without updating them by hand.');logEvent('demo_order_accepted',order);
  }));
  $('reset-ops').addEventListener('click',()=>{stock=24;total=0;accepted.clear();events.length=0;renderMetrics();$('event-log').textContent='No events yet.';buttons.forEach(b=>{b.classList.remove('scenario-selected');b.disabled=b.dataset.scenario==='repeat';});decision('Let’s place the first order.',['Click “Place an order” to reserve four meals and update the totals.'],'The team can see what needs attention without manually checking every order.');});
  function calculate(){
    const tasks=Number($('tasks').value),before=Number($('before').value),after=Number($('after').value),difference=before-after;
    ['tasks','before','after'].forEach(id=>$(id+'-out').textContent=$(id).value);
    const hours=tasks*difference*22/60;
    $('hours-saved').textContent=Math.abs(hours).toFixed(1)+' hours';
    $('value-caption').textContent=hours>0?'freed per month':hours<0?'extra work per month':'saved — the time is unchanged';
    $('value-formula').textContent=tasks+' × ('+before+' − '+after+') × 22 ÷ 60';
    $('value-story').textContent=difference>0?'That’s '+difference+' minutes saved each time, across '+tasks+' tasks a day.':difference<0?'This version takes '+Math.abs(difference)+' more minutes each time. It needs improving before it saves time.':'Both versions take the same time. There is no time saving in this example.';
  }
  $('value-form').addEventListener('input',calculate);$('value-form').addEventListener('submit',e=>e.preventDefault());calculate();
})();
