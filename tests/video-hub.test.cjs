const test=require('node:test');const assert=require('node:assert');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/../concept-coach.html','utf8');
test('hub toont weekplank en fototegels',()=>{
  assert.match(html,/function vdHubHtml\(\)/);
  assert.match(html,/Voor je weekdoel/);
  assert.match(html,/class="vd-plank"/);
  assert.match(html,/function vdTegelHtml/);
  assert.match(html,/function vdLeegTegelHtml/);
  assert.match(html,/vol\.length%2\?' oneven'/);
});
test('kapotte beelden in de hub vallen weg',()=>{
  assert.match(html,/function vdBindHubBeeld/);
  assert.match(html,/vdBindHubBeeld\(scr\)/);
});
test('oude lijstweergave is weg',()=>{ assert.doesNotMatch(html,/function vdRowHtml/); });
