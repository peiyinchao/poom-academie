const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {runInNewContext} = require('node:vm');

const source = readFileSync(join(__dirname, '..', 'concept-coach.html'), 'utf8');
const weekly = source.slice(source.indexOf('  var WEEK_FOCUS ='), source.indexOf('  /* ---- Training van vandaag:'));
const extras = source.slice(source.indexOf('  function pickExtras(){'), source.indexOf('  /* De dagkaart opent'));
const save = source.slice(source.indexOf('  function ciSave(){'), source.indexOf('  function ciValid(){'));

function app(stored, initial = '2026-10-13T12:00:00Z') {
  let time = initial;
  const values = new Map(stored ? [['poom_week', stored]] : []);
  const notices = [];
  class ClockDate extends Date {
    constructor(...args) { super(...(args.length ? args : [time])); }
  }
  const scope = {
    Date:ClockDate, location:{search:''},
    plainObj:v => v && typeof v==='object' && !Array.isArray(v) ? v : null,
    store:{
      get:(key, fallback) => values.get(key) || fallback,
      set:(key, value) => {values.set(key, JSON.parse(JSON.stringify(value))); return true;}
    },
    toast:text => notices.push(text),
    dseed:() => 42,
    missionsSave:() => {},
    missionsEnsure:() => {},
    missionDone:{},
    rfMode:'goal', rfPick:[], rfMood:'ok', rfRating:null, rfHelp:null
  };
  runInNewContext(weekly + extras + save, scope);
  scope.weekEnsure();
  return {scope, values, notices, advance:date => {time=date;}};
}

test('week goals use the nine supported handbook and vocabulary areas', () => {
  const {scope} = app();
  assert.deepEqual(Array.from(scope.FOCUS_AREAS, area => area.id),
    ['standen','technieken','poomsae','taeryon','hosinsul','gyeorugi','gyeokpa','examen','moeilijk']);
});

test('weekly input influences suggestions without rendering a weekly checklist', () => {
  assert.doesNotMatch(source, /weekChecklistHtml|class="week-task|data-act="weekcheck"/);
  assert.match(source, /<button class="checkin set" data-act="cigoal"/);
  assert.match(source, /Je keuzes sturen de twee suggesties op je dagkaart/);
});

test('goal saving and editing preserve completion only for retained goals', () => {
  const {scope, values} = app();
  scope.rfPick=['standen','technieken','poomsae'];
  scope.ciSave();
  scope.weekMark('standen', true);
  scope.weekMark('technieken', true);
  scope.rfPick=['standen','hosinsul'];
  scope.ciSave();
  assert.deepEqual(values.get('poom_week').done, {standen:true});
  assert.deepEqual(values.get('poom_week').focus, ['standen','hosinsul']);
  const loaded = app(values.get('poom_week'));
  assert.equal(loaded.scope.WEEK_DONE.standen, true);
  loaded.scope.weekMark('standen', false);
  assert.deepEqual(loaded.values.get('poom_week').done, {});
});

test('two suggestions prioritize open weekly tasks without duplicates', () => {
  const {scope} = app();
  scope.WEEK_FOCUS=['standen','technieken','hosinsul'];
  assert.deepEqual(Array.from(scope.pickExtras()), ['standen','technieken']);
  scope.weekMark('standen', true);
  assert.deepEqual(Array.from(scope.pickExtras()), ['technieken','hosinsul']);
  scope.weekMark('technieken', true);
  const single = Array.from(scope.pickExtras());
  assert.equal(single[0], 'hosinsul');
  assert.equal(new Set(single).size, 2);
  scope.weekMark('hosinsul', true);
  assert.equal(scope.pickExtras().length, 2);
  assert(scope.pickExtras().every(id => !scope.WEEK_DONE[id]));
});

test('daily changes preserve weekly goals but Monday resets goals and reflection', () => {
  const {scope, advance} = app();
  scope.rfPick=['standen'];
  scope.ciSave();
  scope.weekMark('standen', true);
  scope.rfMode='reflect'; scope.rfRating='sterk'; scope.rfHelp='ja';
  scope.ciSave();
  advance('2026-10-18T12:00:00Z');
  assert.equal(scope.weekEnsure(), false);
  assert.equal(scope.WEEK_DONE.standen, true);
  assert.equal(scope.weekReflected, true);
  advance('2026-10-19T12:00:00Z');
  assert.equal(scope.weekEnsure(), true);
  assert.equal(scope.WEEK_KEY, '2026-10-19');
  assert.equal(scope.WEEK_FOCUS.length, 0);
  assert.equal(Object.keys(scope.WEEK_DONE).length, 0);
  assert.equal(scope.WEEK_RATING, null);
  assert.equal(scope.weekReflected, false);
});

test('week key spans New Year without colliding with another year', () => {
  const {scope, advance} = app(null, '2027-01-01T12:00:00Z');
  assert.equal(scope.WEEK_KEY, '2026-12-28');
  advance('2027-01-04T12:00:00Z');
  scope.weekEnsure();
  assert.equal(scope.WEEK_KEY, '2027-01-04');
});

test('restoring weekly data rejects obsolete, duplicate and unselected entries', () => {
  const {scope} = app({week:'2026-10-12',focus:['standen','tempo','standen','moeilijk'],
    done:{standen:true,tempo:true,hosinsul:true},mood:'unexpected',rating:'sterk',help:'ja'});
  assert.deepEqual(Array.from(scope.WEEK_FOCUS), ['standen','moeilijk']);
  assert.deepEqual(Object.keys(scope.WEEK_DONE), ['standen']);
  assert.equal(scope.WEEK_MOOD, null);
  assert.equal(scope.weekReflected, true);
});

test('failed storage explicitly warns instead of pretending the week is saved', () => {
  const {scope, notices} = app();
  scope.store.set=() => false;
  assert.equal(scope.weekSave(), false);
  assert.equal(notices.length, 1);
  assert.match(notices[0], /niet worden bewaard/);
});
