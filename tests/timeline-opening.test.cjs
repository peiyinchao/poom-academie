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
