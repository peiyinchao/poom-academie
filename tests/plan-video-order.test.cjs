const test=require('node:test');const assert=require('node:assert');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/../concept-coach.html','utf8');
function grab(name){const i=html.indexOf('function '+name+'(');let d=0,j=html.indexOf('{',i);for(let k=j;;k++){if(html[k]==='{')d++;else if(html[k]==='}'&&--d===0)return html.slice(i,k+1);}}
const known=new Set(['a','b','c']);
const plVidVerplaats=new Function('vdById',grab('plVidVerplaats')+';return plVidVerplaats;')(id=>known.has(id)?{id}:null);
test('filmpje naar onderen slepen',()=>{const it={vids:['a','b','c']};assert.ok(plVidVerplaats(it,0,2));assert.deepStrictEqual(it.vids,['b','c','a']);});
test('verdwenen filmpjes blijven achteraan bewaard',()=>{const it={vids:['a','x','b','c']};assert.ok(plVidVerplaats(it,2,0));assert.deepStrictEqual(it.vids,['c','a','b','x']);});
test('zelfde plek of buiten bereik verandert niets',()=>{const it={vids:['a','b']};assert.ok(!plVidVerplaats(it,1,1));assert.ok(!plVidVerplaats(it,5,0));assert.deepStrictEqual(it.vids,['a','b']);});
test('greep alleen bij twee of meer filmpjes en gebonden aan de coach',()=>{assert.match(html,/greep=vs\.length>1/);assert.match(html,/plBindVidSleep\(coachScreen\)/);});
