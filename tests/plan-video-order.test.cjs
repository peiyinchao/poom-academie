const test=require('node:test');const assert=require('node:assert');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/../concept-coach.html','utf8');
function grab(name){const i=html.indexOf('function '+name+'(');let d=0,j=html.indexOf('{',i);for(let k=j;;k++){if(html[k]==='{')d++;else if(html[k]==='}'&&--d===0)return html.slice(i,k+1);}}
const zet=new Function(grab('plVidZetVolgorde')+';return plVidZetVolgorde;')();
const VD_CATS=[{k:'opwarmen',label:'Opwarmen'},{k:'gyeorugi',label:'Gyeorugi',subs:[{k:'techniek',label:'Techniek'},{k:'aanval',label:'Aanval'},{k:'counter',label:'Counter'}]}];
const vids={a1:{id:'a1',cat:'gyeorugi',sub:'aanval'},c1:{id:'c1',cat:'gyeorugi',sub:'counter'},a2:{id:'a2',cat:'gyeorugi',sub:'aanval'},o1:{id:'o1',cat:'opwarmen'}};
const groepen=new Function('VD_CATS','vdById','vdPlek','vdCat','vdSub',grab('plVidRang')+grab('plVidGroepen')+';return plVidGroepen;')(
  VD_CATS,id=>vids[id]||null,v=>({cat:v.cat,sub:v.sub||null}),k=>VD_CATS.find(c=>c.k===k),(c,k)=>c.subs?c.subs.find(s=>s.k===k)||c.subs[0]:null);
test('volgorde van het scherm wordt bewaard',()=>{const it={vids:['a','b','c']};assert.ok(zet(it,['b','c','a']));assert.deepStrictEqual(it.vids,['b','c','a']);});
test('verdwenen filmpjes blijven achteraan bewaard',()=>{const it={vids:['a','x','b','c']};assert.ok(zet(it,['c','a','b']));assert.deepStrictEqual(it.vids,['c','a','b','x']);});
test('zelfde volgorde verandert niets',()=>{const it={vids:['a','b']};assert.ok(!zet(it,['a','b']));});
test('filmpjes gegroepeerd per soort in lesvolgorde',()=>{
  const g=groepen({k:'gyeorugi',vids:['c1','a1','o1','zz','a2']});
  assert.deepStrictEqual(g.map(x=>x.naam),['Opwarmen','Aanval','Counter']);
  assert.deepStrictEqual(g.map(x=>x.vids.map(v=>v.id)),[['o1'],['a1','a2'],['c1']]);
});
test('greep per groep en gebonden aan de coach',()=>{assert.match(html,/rij\(v, g\.vids\.length>1\)/);assert.match(html,/plBindVidSleep\(coachScreen\)/);});
test('rij zelf sleepbaar met landingslijn, zonder browser-sleep',()=>{
  assert.match(html,/draggable="false"/);
  assert.match(html,/className='plt-vdrop'/);
  assert.match(html,/addEventListener\('dragstart'/);
});
