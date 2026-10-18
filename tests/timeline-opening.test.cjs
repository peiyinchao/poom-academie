const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {runInNewContext} = require('node:vm');

const source = readFileSync(join(__dirname, '..', 'concept-coach.html'), 'utf8');
const scope = {};
runInNewContext(source.slice(source.indexOf('  function tlLaatsteAfgelopen('),
  source.indexOf('  function tlOpenPositie()')), scope);

test('opens on the most recently completed moment, excluding future and ongoing events', () => {
  const items = [
    {id:'future', date:'2026-11-20'},
    {id:'ongoing', date:'2026-10-13', end:'2026-10-16'},
    {id:'recent', date:'2026-10-11'},
    {id:'range', date:'2026-10-01', end:'2026-10-12'},
    {id:'old', date:'2026-09-01'}
  ];
  assert.equal(scope.tlLaatsteAfgelopen(items, '2026-10-14').id, 'range');
});

test('keeps the default top position when no moment has finished', () => {
  assert.equal(scope.tlLaatsteAfgelopen([], '2026-10-14'), null);
  assert.equal(scope.tlLaatsteAfgelopen([
    {date:'2026-10-14'}, {date:'2026-10-20'}
  ], '2026-10-14'), null);
});

test('event icons belong in the card, with a decorative dot on the line', () => {
  const icons={esc:s=>String(s).replace(/</g,'&lt;')};
  runInNewContext(source.slice(source.indexOf('  var TL_ICOS ='),
    source.indexOf('  function tlItemHtml(')),icons);
  for(const item of [{tk:'wedstrijd'},{tk:'examen'},{tk:'cursus'},{kind:'graad'},{ico:'<custom>'}]){
    const html=icons.tlIconHtml(item,true);
    assert.match(html,/class="tl-card-icon" aria-hidden="true"/);
    assert.doesNotMatch(html,/tl-dot|<custom>/);
  }
  assert.match(source,/'<span class="tl-dot" aria-hidden="true"><\/span>'/);
  assert.match(icons.tlIconHtml({tk:'wedstrijd'},false),/ic-tl-wedstrijd/);
  assert.equal(icons.tlIconHtml({ico:'🏅'},false),'');
  assert.match(source,/'<span class="tl-date">'\+tlIconHtml\(it, fut\)/);
  assert.match(source,/'>'\+esc\(it.title\)\+'<\/b>'/);
});

test('scroll focus tracks the readable moment without resizing timeline dots', () => {
  const items=[10,150,300].map(top=>({
    getBoundingClientRect:()=>({top}),
    querySelector:()=>null,
    classList:{},
  }));
  items.forEach(item=>{item.classList.toggle=(name,on)=>{item.focused=on;};});
  const scope={};
  runInNewContext(source.slice(source.indexOf('  function tlAtop('),
    source.indexOf('  /* Naar rechts vegen')),scope);
  let top=0;
  const sc={querySelectorAll:()=>items,getBoundingClientRect:()=>({top,bottom:500})};
  scope.tlAtop(sc);
  assert.deepEqual(items.map(i=>i.focused),[true,false,false]);
  top=100;scope.tlAtop(sc);
  assert.deepEqual(items.map(i=>i.focused),[false,true,false]);
  assert.match(source,/\.tl-dot\{--tlsz:14px/);
  assert.doesNotMatch(source,/\.tl-item\.tl-atop \.tl-dot/);
});
