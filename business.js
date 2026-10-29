(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const samples = { standard: {id:'DEMO-1001',qty:4}, large: {id:'DEMO-1002',qty:30}, repeat: {id:'DEMO-1001',qty:4} };
  let stock = 24, total = 0;
  const accepted = new Set(), events = [];
  function logEvent(name, order) {
    events.push({event:name,order_id:order.id,quantity:order.qty,available_stock:stock});
    $('event-log').textContent=JSON.stringify(events.slice(-12),null,2);
  }
  function renderMetrics() {
    $('stock-count').textContent=stock;
    $('order-count').textContent=accepted.size;
    $('order-value').textContent='RM '+total;
  }
  function decision(title, lines) {
    $('ops-result').textContent=title;
    $('ops-log').replaceChildren(...lines.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  }
  $('scenario').addEventListener('change',()=>{const s=samples[$('scenario').value];$('sample-id').textContent=s.id;$('sample-qty').textContent=s.qty;});
  $('process-order').addEventListener('click',()=>{
    const order=samples[$('scenario').value];
    const trail=['Required fields validated: order ID, product and positive quantity.'];
    if(accepted.has(order.id)) {
      trail.push('Order '+order.id+' already exists. Duplicate processing blocked.','Stock, order count and order value are unchanged.');
      decision('Duplicate blocked. Stock protected.',trail);logEvent('demo_duplicate_blocked',order);return;
    }
    trail.push('Order ID is new; no accepted order found with this ID.');
    if(order.qty>stock) {
      trail.push('Requested '+order.qty+' sets, but only '+stock+' are available.','Order held for staff review. No stock deducted and no acceptance recorded.');
      decision('Needs review. Not enough stock.',trail);logEvent('demo_order_held',order);return;
    }
    stock-=order.qty;total+=order.qty*18;accepted.add(order.id);
    trail.push(order.qty+' sets reserved in this browser demo; '+stock+' remain.','Order accepted. Staff notification would be queued in a production system. No message was sent.');
    decision('Order accepted. Next step is clear.',trail);renderMetrics();logEvent('demo_order_accepted',order);
  });
  $('reset-ops').addEventListener('click',()=>{stock=24;total=0;accepted.clear();events.length=0;renderMetrics();$('event-log').textContent='No events yet.';$('scenario').value='standard';$('sample-id').textContent='DEMO-1001';$('sample-qty').textContent='4';decision('Ready for the first order.',['Choose a scenario to inspect validation, duplicate protection and stock handling.']);});
  function calculate(){
    const tasks=Number($('tasks').value), before=Number($('before').value), after=Number($('after').value);
    ['tasks','before','after'].forEach(id=>$(id+'-out').textContent=$(id).value);
    const hours=tasks*(before-after)*22/60;
    $('hours-saved').textContent=Math.abs(hours).toFixed(1)+' hours';
    $('value-caption').textContent=hours>0?'freed per month':hours<0?'additional effort per month':'net time change per month';
    $('value-formula').textContent=tasks+' × ('+before+' − '+after+') × 22 ÷ 60';
  }
  $('value-form').addEventListener('input',calculate);$('value-form').addEventListener('submit',e=>e.preventDefault());calculate();
})();
