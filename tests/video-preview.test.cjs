const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {runInNewContext} = require('node:vm');

const source=readFileSync(join(__dirname, '..', 'concept-coach.html'), 'utf8');

test('tapping a playable clip opens the preview card, not fullscreen', () => {
  assert.match(source, /vdKanInApp\(_vp\)\)\{ e\.preventDefault\(\); vdVoorbeeld\(_vp\);/);
  assert.match(source, /a==='vdprevfull'\)\{ vdPrevVolledig\(\);/);
});

test('preview plays muted and inline', () => {
  assert.match(source, /autoplay=1&mute=1&playsinline=1/);
  assert.match(source, /<video src="'\+vdPrevUrl\+'" muted autoplay loop playsinline>/);
});

test('only own phone clips get the cover picker', () => {
  const scope={};
  const start=source.indexOf('  function vdPrevMagOmslag(');
  runInNewContext(source.slice(start, source.indexOf('\n', start)), scope);
  assert.equal(scope.vdPrevMagOmslag({film:'f1'}), true);
  assert.equal(scope.vdPrevMagOmslag({vid:'abc', vast:true}), false);
  assert.equal(scope.vdPrevMagOmslag({url:'https://facebook.com/x'}), false);
  assert.equal(scope.vdPrevMagOmslag({film:'f1', vast:true}), false);
});

test('fullscreen continues where the preview was', () => {
  assert.match(source, /function vdPlay\(v, vanaf\)/);
  assert.match(source, /closeVdVoorbeeld\(true\);\n    vdPlay\(v, t\);/);
});
