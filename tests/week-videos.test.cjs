const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {runInNewContext} = require('node:vm');

const source=readFileSync(join(__dirname, '..', 'concept-coach.html'), 'utf8');
function selection(focus, videos) {
  const scope={
    WEEK_FOCUS:focus, WEEK_KEY:'2026-10-12', weekEnsure:()=>{},
    vdAlles:()=>videos, vdPlek:v=>({cat:v.cat,sub:v.sub||''}),
    vdSource:()=>'', hashStr:s=>Array.from(s).reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,0)
  };
  runInNewContext(source.slice(source.indexOf('  var VD_FOCUS_WOORDEN ='),
    source.indexOf('  function vdBodyHtml(')), scope);
  return scope.vdWeekSelectie();
}
const clips=Array.from({length:24}, (_,i)=>({
  id:'clip-'+i, cat:'gyeorugi',
  sub:['techniek','aanval','counter','wedstrijden'][i%4], title:'Clip '+i
}));

test('selects ten clips with a mix of all four gyeorugi subcategories', () => {
  const result=selection(['gyeorugi'], clips);
  assert.equal(result.length,10);
  assert.equal(new Set(result.map(v=>v.id)).size,10);
  assert.equal(new Set(result.map(v=>v.sub)).size,4);
  for(const sub of ['techniek','aanval','counter','wedstrijden'])
    assert(result.filter(v=>v.sub===sub).length>=2);
});

test('mixes multiple focus categories without including unrelated clips', () => {
  const videos=clips.concat([{id:'h',cat:'hosinsul',title:'Verdediging'},
    {id:'p',cat:'poomsae',title:'Vorm'}, {id:'unrelated',cat:'cooling',title:'Relax'}]);
  const result=selection(['gyeorugi','hosinsul','poomsae'],videos);
  assert(result.some(v=>v.id==='h'));
  assert(result.some(v=>v.id==='p'));
  assert(!result.some(v=>v.id==='unrelated'));
});

test('uses title keywords for focus areas without a dedicated video folder', () => {
  assert.equal(selection(['standen'], [{id:'s',cat:'poomsae',title:'Ap kubi stand'}])[0].id,'s');
});

test('selection is stable across input ordering and returns fewer clips when necessary', () => {
  const ids=list=>Array.from(list,v=>v.id).sort();
  assert.deepEqual(ids(selection(['gyeorugi'], clips)),ids(selection(['gyeorugi'], [...clips].reverse())));
  assert.equal(selection(['gyeorugi'], clips.slice(0,3)).length,3);
  assert.equal(selection([],clips).length,0);
  assert.equal(selection(['hosinsul'],clips).length,0);
  assert.equal(selection(['gyeorugi'],[clips[0],clips[0]]).length,1);
});

test('ordinary folders no longer have inline week-goal sections', () => {
  assert.doesNotMatch(source,/De rest van deze map|function vdUitgelicht/);
  assert.match(source,/Weekdoel filmpjes/);
});
