/* ============================================================
   Mijn Poom Academie — App-logica (vanilla JS, geen build)
   Router + views + voortgang (localStorage) + uitspraak + quiz.
   ============================================================ */
(function () {
  "use strict";
  var C = window.CURRICULUM;
  var view = document.getElementById('view');
  var nav = document.getElementById('nav');

  /* ---------- Voortgang (localStorage) ---------- */
  var KEY = 'poom.v1';
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {} }
  var prog = load();
  if (!prog.poomsae) prog.poomsae = {};
  if (typeof prog.quizBest !== 'number') prog.quizBest = 0;
  if (prog.level !== '1' && prog.level !== '2') prog.level = '1';

  /* ---------- Niveau (1e / 2e poom) ---------- */
  function curLevel() { return prog.level === '2' ? 2 : 1; }
  function visPoomsae() { var L = curLevel(); return C.poomsae.filter(function (p) { return (p.level || 0) === 0 || p.level <= L; }); }
  function foundationPoomsae() { return C.poomsae.filter(function (p) { return (p.level || 0) === 0; }); }
  function examPoomsae() { var L = curLevel(); return C.poomsae.filter(function (p) { return p.level >= 1 && p.level <= L; }); }

  function poomDone() { return visPoomsae().filter(function (p) { return prog.poomsae[p.id]; }).length; }
  function refreshStreak() { document.getElementById('streakN').textContent = poomDone(); }

  /* ---------- Dagelijkse uitdagingen ---------- */
  function dkey(d) { d = d || new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function seededPick(arr, n, seedStr) {
    var seed = 0; for (var i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 1e9;
    var a = arr.slice(), out = [];
    for (var k = 0; k < n && a.length; k++) { seed = (seed * 1103515245 + 12345) % 2147483647; var j = seed % a.length; out.push(a.splice(j, 1)[0]); }
    return out;
  }
  function daily() {
    if (!prog.daily || prog.daily.date !== dkey()) {
      var pool = foundationPoomsae().map(function (p) { return p.id; });
      prog.daily = { date: dkey(), quiz: false, practiced: {}, flash: 0, suggest: seededPick(pool, 3, dkey()), counted: false };
      save(prog);
    }
    if (!prog.daily.practiced) prog.daily.practiced = {};
    if (!prog.daily.suggest) prog.daily.suggest = seededPick(foundationPoomsae().map(function (p) { return p.id; }), 3, dkey());
    return prog.daily;
  }
  function dailyGoals() {
    var d = daily();
    var pDone = d.suggest.filter(function (id) { return d.practiced[id]; }).length;
    var names = d.suggest.map(function (id) { var p = C.poomsae.filter(function (x) { return x.id === id; })[0]; return p ? (p.sino || ('T' + p.nr)) : id; });
    return [
      { id: 'quiz', label: 'Doe een quiz', done: !!d.quiz, n: d.quiz ? 1 : 0, need: 1 },
      { id: 'poomsae', label: 'Oefen 3 poomsae', sub: names.join(' · '), done: pDone >= 3, n: pDone, need: 3 },
      { id: 'flash', label: 'Flashcards: 5 termen', done: (d.flash || 0) >= 5, n: d.flash || 0, need: 5 }
    ];
  }
  function dailyAllDone() { return dailyGoals().every(function (g) { return g.done; }); }
  function checkDaily() {
    var d = daily();
    if (dailyAllDone() && !d.counted) {
      d.counted = true;
      var y = dkey(new Date(Date.now() - 864e5));
      prog.streakDays = (prog.lastDone === y ? (prog.streakDays || 0) + 1 : 1);
      prog.lastDone = dkey();
      save(prog);
      toast('Dagdoel gehaald! 🔥 ' + prog.streakDays + ' dag' + (prog.streakDays === 1 ? '' : 'en'));
      if (location.hash.indexOf('home') >= 0 || location.hash === '' || location.hash === '#/') viewHome();
    } else save(prog);
  }

  /* ---------- Helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  var toastT;
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 1900);
  }

  /* ---------- Uitspraak (Web Speech API) ---------- */
  var koVoice = null;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    var vs = speechSynthesis.getVoices();
    koVoice = vs.filter(function (v) { return /ko(-|_)?/i.test(v.lang); })[0] || null;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) { toast('Uitspraak niet ondersteund'); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR'; if (koVoice) u.voice = koVoice; u.rate = .9; u.pitch = 1;
    speechSynthesis.speak(u);
  }

  /* ---------- Kleine SVG's ---------- */
  var ICON_SPEAK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a4 4 0 0 1 0 7"/><path d="M18.5 6a7 7 0 0 1 0 12"/></svg>';
  var ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var ICON_CHEV = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
  function feetSVG() {
    return '<svg viewBox="0 0 40 40" fill="#AEB6C2"><g><ellipse cx="13" cy="24" rx="5" ry="8.5"/><circle cx="9.6" cy="13.5" r="1.7"/><circle cx="13" cy="12.2" r="1.9"/><circle cx="16.4" cy="13.5" r="1.7"/></g><g><ellipse cx="27" cy="24" rx="5" ry="8.5"/><circle cx="23.6" cy="13.5" r="1.7"/><circle cx="27" cy="12.2" r="1.9"/><circle cx="30.4" cy="13.5" r="1.7"/></g></svg>';
  }

  /* ---------- Router ---------- */
  var routes = ['home', 'poomsae', 'techniek', 'termen', 'quiz', 'theorie', 'standen', 'examen', 'teller', 'flash'];
  function parse() {
    var h = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!h.length) h = ['home'];
    return h;
  }
  function go() {
    var seg = parse();
    var r = seg[0];
    if (routes.indexOf(r) < 0) r = 'home';
    if (tellerTimer) { clearInterval(tellerTimer); tellerTimer = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    view.innerHTML = '';
    if (r === 'home') viewHome();
    else if (r === 'poomsae') { seg[1] ? viewPoomDetail(seg[1]) : viewPoomList(); }
    else if (r === 'techniek') viewTechniek(seg[1]);
    else if (r === 'standen') viewTechniek('standen');
    else if (r === 'termen') viewTermen();
    else if (r === 'quiz') viewQuiz();
    else if (r === 'theorie') viewTheorie();
    else if (r === 'examen') viewExamen();
    else if (r === 'teller') viewTeller();
    else if (r === 'flash') viewFlash();
    // nav active state
    var navMap = { standen: 'techniek', examen: 'theorie', teller: 'termen', flash: 'termen' };
    var navR = navMap[r] || r;
    [].forEach.call(nav.querySelectorAll('a'), function (a) {
      a.classList.toggle('on', a.getAttribute('data-r') === navR);
    });
    window.scrollTo(0, 0);
    refreshStreak();
  }

  /* ---------- View: Home ---------- */
  function viewHome() {
    var vis = visPoomsae(), done = poomDone(), pct = Math.round(done / vis.length * 100);
    var idx = new Date().getDate() + new Date().getMonth();
    var all = []; C.termen.forEach(function (g) { g.items.forEach(function (i) { all.push(i); }); });
    var tod = all[idx % all.length];
    var quote = C.quotes[idx % C.quotes.length];

    var lvlToggle = '<div class="lvltoggle">' + ['1', '2'].map(function (l) {
      return '<button data-act="lvl" data-l="' + l + '" class="' + (prog.level === l ? 'on' : '') + '">' + esc(C.levels[l].naam) + '</button>';
    }).join('') + '</div>';

    var goals = dailyGoals();
    var goalHtml = goals.map(function (g) {
      var cnt = g.need > 1 ? '<span class="dn">' + g.n + '/' + g.need + '</span>' : '';
      return '<button class="goal-item' + (g.done ? ' done' : '') + '" data-act="goal" data-g="' + g.id + '">' +
        '<span class="gck">' + (g.done ? ICON_CHECK : '') + '</span>' +
        '<span class="gl">' + esc(g.label) + (g.sub ? '<small>' + esc(g.sub) + '</small>' : '') + '</span>' + cnt +
        '<span class="gchev">' + (g.done ? '' : ICON_CHEV) + '</span></button>';
    }).join('');
    var streak = prog.streakDays || 0;
    var allDone = dailyAllDone();

    var tiles = [
      ['#/poomsae', 'Poomsae', 'De Taegeuk-vormen', svgCircle()],
      ['#/techniek', 'Techniek', 'Standen, blokken, trappen', svgBolt()],
      ['#/termen', 'Termen', 'Koreaans met uitspraak', svgChat()],
      ['#/quiz', 'Quiz', 'Test wat je weet', svgQuiz()],
      ['#/standen', 'Standen', 'De 6 basisstanden', feetMini()],
      ['#/examen', 'Examen', 'Sparren, breken, zelfverdediging', svgExam()],
      ['#/theorie', 'Theorie', 'Achtergrond & etiquette', svgBook()],
      ['#/teller', 'Teller', 'Koreaans tellen 1–10', svgTimer()]
    ].map(function (t) {
      return '<a class="tile" href="' + t[0] + '"><span class="ti">' + t[3] + '</span>' +
        '<h3>' + t[1] + '</h3><small>' + t[2] + '</small></a>';
    }).join('');

    view.innerHTML =
      '<div class="view active"><div class="screen">' +
        '<div class="hero">' +
          '<div class="myline">Mijn</div>' +
          '<h1>Poom<span class="dot">.</span>Academy</h1>' +
          '<div class="lvlsel"><span class="ll">Ik oefen voor</span>' + lvlToggle + '</div>' +
          '<div class="prog-wrap">' +
            '<div class="ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
            '<div class="pl">Poomsae geoefend<b>' + done + ' / ' + vis.length + '</b>' +
              (done === vis.length ? 'Alles gehad — knap werk! 🥋' : 'Ga zo door!') + '</div>' +
          '</div>' +
          '<img class="wm" src="mark-taeguk.svg" alt="">' +
        '</div>' +

        '<div class="trow tod"><button class="speak" data-act="speak" data-ko="' + esc(tod.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button>' +
          '<div class="tx"><div class="ko">' + esc(tod.ko) + '</div><div class="ro">' + esc(tod.roman) + '</div><div class="nl">Term van de dag · ' + esc(tod.nl) + '</div></div></div>' +

        '<div class="quotecard">“' + esc(quote) + '”</div>' +

        '<div class="daily">' +
          '<div class="daily-hd"><span class="secnum" style="margin:0">Dagdoel</span>' +
            '<span class="daystreak' + (streak ? ' on' : '') + '">🔥 ' + streak + ' dag' + (streak === 1 ? '' : 'en') + '</span></div>' +
          '<div class="goals">' + goalHtml + '</div>' +
          (allDone ? '<div class="daily-done">Alle dagdoelen gehaald! Top gedaan. 🎉</div>' : '') +
        '</div>' +

        '<span class="secnum">Ontdek</span>' +
        '<div class="tiles">' + tiles + '</div>' +
        '<div class="notecard">' + esc(C.meta.bron) + ' Bekijk ook de <a href="styleguide.html">merk- &amp; stijlgids</a>.</div>' +
      '</div></div>';
  }

  /* ---------- View: Poomsae-lijst ---------- */
  function poomRow(p) {
    var done = !!prog.poomsae[p.id];
    var title = p.level >= 1 ? esc(p.korean) : 'Taegeuk ' + p.nr + (p.sino ? ' · ' + esc(p.sino) : '');
    var ask = (p.level || 0) === 0 && !done && daily().suggest.indexOf(p.id) >= 0;
    return '<button class="poomrow" data-act="poom" data-id="' + p.id + '">' +
      '<span class="tg' + (done ? ' done' : '') + '">' + p.trigram + '</span>' +
      '<span class="pm"><b>' + title + (ask ? ' <span class="askbadge">vandaag</span>' : '') + '</b>' +
      '<small>' + esc(p.trigramNaam) + ' · ' + esc(p.element) + ' · ' + esc(p.kup) + '</small></span>' +
      '<span class="meta"><span class="mv">' + p.bewegingen + '</span><small>bew.</small></span>' +
      (done ? '<span class="check on">' + ICON_CHECK + '</span>' : '<span class="chev">' + ICON_CHEV + '</span>') +
      '</button>';
  }
  function viewPoomList() {
    var foundation = foundationPoomsae().map(poomRow).join('');
    var exams = examPoomsae();
    var examHtml = exams.length
      ? '<div class="grouphd">Examenpoomsae — ' + esc(C.levels[prog.level].naam) + '</div><div class="poomlist">' + exams.map(poomRow).join('') + '</div>'
      : '';
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">01 — De vormen</span>' +
      '<h1 class="screen-title">Poomsae</h1>' +
      '<p class="screen-sub">De acht Taegeuk-vormen zijn je basis. Daarboven komt de zwarteband-vorm voor jouw poom. Tik op een vorm voor de betekenis, het trigram en de nieuwe technieken.</p>' +
      '<div class="grouphd">Taegeuk 1–8 · il i sam sa o yuk chil pal</div>' +
      '<div class="poomlist">' + foundation + '</div>' +
      examHtml +
      '<div class="notecard">Elke Taegeuk-vorm hoort bij één van de acht <b>trigrammen</b> (pal gwae). De volledige choreografie leer je met je trainer in de dojang.</div>' +
      '</div></div>';
  }

  /* ---------- View: Poomsae-detail ---------- */
  function viewPoomDetail(id) {
    var p = C.poomsae.filter(function (x) { return x.id === id; })[0];
    if (!p) { location.hash = '#/poomsae'; return; }
    var done = !!prog.poomsae[p.id];
    var nieuw = p.nieuw.map(function (t) {
      return '<div class="trow"><button class="speak" data-act="speak" data-ko="' + esc(t.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button>' +
        '<div class="tx"><div class="ko">' + esc(t.ko) + '</div><div class="ro">' + esc(t.roman) + '</div><div class="nl">' + esc(t.nl) + '</div></div></div>';
    }).join('');
    var focus = p.focus.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
    var standen = p.standen.map(function (s) { return '<span class="tag" style="color:var(--blue);font-size:13px">' + esc(s) + '</span>'; }).join(' · ');
    var videoHtml = p.video
      ? '<div class="sect"><h4>Instructievideo</h4></div>' +
        '<div class="video" data-act="video" data-v="' + p.video + '">' +
          '<img src="https://i.ytimg.com/vi/' + p.video + '/hqdefault.jpg" alt="" loading="lazy">' +
          '<span class="playbtn" aria-hidden="true"></span>' +
          '<span class="vlabel">Poomsae-video · Kyuhyung Lee</span>' +
        '</div>'
      : '';

    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<button class="backlink" data-act="back">‹ Alle poomsae</button>' +
      '<div class="detail-head"><span class="tg">' + p.trigram + '</span>' +
        '<div><h2>' + esc(p.korean) + '</h2><div class="kr">' + esc(p.hangul) + ' · ' + esc(p.trigramNaam) + ' (' + esc(p.trigramHangul) + ')</div></div></div>' +
      '<div class="factrow">' +
        fact('Element', p.element) + fact('Graad', p.kup) + fact('Band', p.band) + fact('Bewegingen', p.bewegingen) +
      '</div>' +
      '<div class="blurb">' + esc(p.betekenis) + '</div>' +
      '<div class="sect"><h4>Waar let je op</h4></div><ul class="ul">' + focus + '</ul>' +
      '<div class="sect"><h4>Nieuwe technieken</h4></div><div class="rows">' + nieuw + '</div>' +
      '<div class="sect"><h4>Standen in deze vorm</h4></div><p style="color:var(--gray);font-size:14px">' + standen + '</p>' +
      videoHtml +
      '<button class="btn ' + (done ? 'ghost' : 'primary') + '" style="width:100%;margin-top:22px" data-act="togglepoom" data-id="' + p.id + '">' +
        (done ? '✓ Geoefend — tik om te wissen' : 'Markeer als geoefend') + '</button>' +
      '</div></div>';
  }
  function fact(l, v) { return '<div class="fact"><div class="fl">' + esc(l) + '</div><div class="fv">' + esc(v) + '</div></div>'; }

  /* ---------- View: Techniek (standen + technieken) ---------- */
  function viewTechniek(sub) {
    var segs = [{ k: 'standen', label: 'Standen' }];
    C.technieken.forEach(function (g, i) { segs.push({ k: 'g' + i, label: g.cat.replace(/ \(.*/, '') }); });
    if (!sub || !segs.some(function (s) { return s.k === sub; })) sub = 'standen';

    var segHtml = segs.map(function (s) {
      return '<button class="' + (s.k === sub ? 'on' : '') + '" data-act="seg" data-k="' + s.k + '">' + esc(s.label) + '</button>';
    }).join('');

    var body;
    if (sub === 'standen') {
      body = '<div class="stancelegend">' + legFoot('red') + ' gewicht &nbsp;·&nbsp; ' + legFoot('ink') + ' 50/50 &nbsp;·&nbsp; ' + legFoot('out') + ' lichte voet</div>' +
        '<div class="rows">' + C.standen.map(function (s) {
        return '<div class="stance"><span class="feet">' + stanceSVG(s.roman) + '</span>' +
          '<div class="sd"><div class="sdhd"><b>' + esc(s.roman) + '</b>' +
          '<button class="speak sm" data-act="speak" data-ko="' + esc(s.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button></div>' +
          '<span class="ko">' + esc(s.ko) + ' · ' + esc(s.nl) + '</span>' +
          '<small>' + esc(s.uitleg) + '</small></div><span class="wt">' + esc(s.gewicht) + '</span></div>';
      }).join('') + '</div>';
    } else {
      var g = C.technieken[+sub.slice(1)];
      body = '<div class="grouphd">' + esc(g.cat) + '</div><div class="rows">' + g.items.map(termRow).join('') + '</div>';
    }

    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">02 — Techniek</span>' +
      '<h1 class="screen-title">Standen &amp; technieken</h1>' +
      '<p class="screen-sub">De bouwstenen van elke vorm. Tik op de luidspreker om de Koreaanse naam te horen.</p>' +
      '<div class="seg">' + segHtml + '</div>' +
      '<div id="techbody">' + body + '</div>' +
      '</div></div>';
  }

  function termRow(t) {
    return '<div class="trow"><button class="speak" data-act="speak" data-ko="' + esc(t.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button>' +
      '<div class="tx"><div class="ko">' + esc(t.ko) + '</div><div class="ro">' + esc(t.roman) + '</div><div class="nl">' + esc(t.nl) + '</div></div></div>';
  }

  /* ---------- View: Termen ---------- */
  function viewTermen() {
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">03 — Woordenschat</span>' +
      '<h1 class="screen-title">Koreaanse termen</h1>' +
      '<p class="screen-sub">Commando\'s, tellen en begrippen. Zoek of blader, en luister naar de uitspraak.</p>' +
      '<input id="termsearch" class="opt" style="width:100%;font-family:inherit;font-size:15px" placeholder="Zoek een term of betekenis…" autocomplete="off">' +
      '<div id="termbody" style="margin-top:14px"></div>' +
      '</div></div>';
    renderTerms('');
    var inp = document.getElementById('termsearch');
    inp.addEventListener('input', function () { renderTerms(inp.value.toLowerCase().trim()); });
  }
  function renderTerms(q) {
    var out = '';
    C.termen.forEach(function (g) {
      var items = g.items.filter(function (i) {
        return !q || i.roman.toLowerCase().indexOf(q) >= 0 || i.nl.toLowerCase().indexOf(q) >= 0 || i.ko.indexOf(q) >= 0;
      });
      if (!items.length) return;
      out += '<div class="grouphd">' + esc(g.groep) + '</div><div class="rows">' + items.map(termRow).join('') + '</div>';
    });
    document.getElementById('termbody').innerHTML = out || '<p style="color:var(--gray)">Niets gevonden.</p>';
  }

  /* ---------- View: Quiz ---------- */
  var quizState = null;
  var tellerTimer = null;
  var flashState = null;
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function viewQuiz() {
    var picked = shuffle(C.quiz).slice(0, Math.min(10, C.quiz.length)).map(function (q) {
      var idx = shuffle(q.o.map(function (_, i) { return i; }));
      return { v: q.v, o: idx.map(function (i) { return q.o[i]; }), a: idx.indexOf(q.a) };
    });
    quizState = { qs: picked, i: 0, score: 0, answered: false };
    renderQuiz();
  }
  function renderQuiz() {
    var s = quizState, n = s.qs.length;
    if (s.i >= n) return renderQuizDone();
    var q = s.qs[s.i];
    var opts = q.o.map(function (o, i) {
      return '<button class="opt" data-act="qopt" data-i="' + i + '"><span class="lt">' + 'ABCD'[i] + '</span>' + esc(o) + '</button>';
    }).join('');
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">04 — Oefenen</span>' +
      '<h1 class="screen-title">Quiz</h1>' +
      '<p class="screen-sub">Vraag ' + (s.i + 1) + ' van ' + n + ' · beste score: ' + prog.quizBest + '/' + n + '</p>' +
      '<div class="quizbar"><i style="width:' + (s.i / n * 100) + '%"></i></div>' +
      '<div class="quizcard"><div class="qnum">Vraag ' + (s.i + 1) + '</div>' +
        '<div class="q">' + esc(q.v) + '</div><div class="opts">' + opts + '</div>' +
        '<div class="qfoot" id="qfoot"></div>' +
      '</div></div></div>';
  }
  function answerQuiz(i) {
    var s = quizState; if (s.answered) return;
    s.answered = true;
    var q = s.qs[s.i], btns = view.querySelectorAll('.opt');
    if (i === q.a) s.score++;
    [].forEach.call(btns, function (b, bi) {
      b.disabled = true;
      if (bi === q.a) b.classList.add('correct');
      else if (bi === i) b.classList.add('wrong');
    });
    var last = s.i === s.qs.length - 1;
    document.getElementById('qfoot').innerHTML =
      '<span style="color:var(--gray);font-size:14px">' + (i === q.a ? 'Goed! 🎉' : 'Bijna — kijk het juiste antwoord.') + '</span>' +
      '<button class="btn primary" data-act="qnext">' + (last ? 'Bekijk score' : 'Volgende') + '</button>';
  }
  function renderQuizDone() {
    var s = quizState, n = s.qs.length;
    if (s.score > prog.quizBest) { prog.quizBest = s.score; save(prog); }
    var d = daily(); if (!d.quiz) { d.quiz = true; save(prog); checkDaily(); }
    var msg = s.score === n ? 'Perfect! Meesterlijk. 🥋' : s.score >= n * 0.7 ? 'Sterk gedaan!' : 'Goed geoefend — probeer het nog eens.';
    view.innerHTML = '<div class="view active"><div class="screen"><div class="quizcard quizdone">' +
      '<div class="score">' + s.score + '/' + n + '</div>' +
      '<h2 style="margin:10px 0 4px">' + msg + '</h2>' +
      '<p>Beste score tot nu: ' + prog.quizBest + '/' + n + '</p>' +
      '<p class="qhint">Elke ronde krijg je nieuwe, willekeurige vragen.</p>' +
      '<button class="btn primary" data-act="qretry" style="margin-top:14px">Opnieuw</button> ' +
      '<a class="btn ghost" href="#/home" style="margin-top:14px;display:inline-block;text-decoration:none">Naar home</a>' +
      '</div></div></div>';
  }

  /* ---------- View: Theorie ---------- */
  function viewTheorie() {
    var acc = C.theorie.map(function (t, i) {
      return '<details' + (i === 0 ? ' open' : '') + '><summary>' + esc(t.titel) + '<span class="pl">+</span></summary>' +
        '<div class="body">' + t.body + '</div></details>';
    }).join('');
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">05 — Achtergrond</span>' +
      '<h1 class="screen-title">Theorie</h1>' +
      '<p class="screen-sub">De verhalen achter de sport — vaak gevraagd op je examen.</p>' +
      '<div class="acc">' + acc + '</div>' +
      '<div class="notecard">' + esc(C.meta.bron) + '</div>' +
      '</div></div>';
  }

  /* ---------- View: Examenonderdelen ---------- */
  function onderIcon(k) {
    var s = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    if (k === 'step') return '<svg ' + s + '><path d="M7 4v7l-2 9"/><path d="M7 11l4 1 1 8"/><circle cx="8" cy="3" r="0"/><path d="M14 6l4 2"/></svg>';
    if (k === 'shield') return '<svg ' + s + '><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9.5 12l2 2 3.5-4"/></svg>';
    if (k === 'spar') return '<svg ' + s + '><path d="M4 9l3-1 3 3 4-4 3 1"/><path d="M5 14h14"/><path d="M7 14v4M17 14v4"/></svg>';
    if (k === 'break') return '<svg ' + s + '><path d="M5 4h14v16H5z"/><path d="M11 4l2 7-3 2 2 7"/></svg>';
    return '<svg ' + s + '><circle cx="12" cy="12" r="8"/></svg>';
  }
  function viewExamen() {
    var cards = C.onderdelen.map(function (o) {
      var tips = o.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      return '<div class="examcard">' +
        '<div class="examhd"><span class="examico">' + onderIcon(o.icon) + '</span>' +
          '<div class="examt"><b>' + esc(o.nl) + '</b><span class="kr">' + esc(o.ko) + ' · ' + esc(o.roman) + '</span></div>' +
          '<button class="speak" data-act="speak" data-ko="' + esc(o.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button></div>' +
        '<p class="examb">' + esc(o.uitleg) + '</p>' +
        '<div class="sect"><h4>Let op</h4></div><ul class="ul">' + tips + '</ul>' +
        '</div>';
    }).join('');
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">06 — Examen</span>' +
      '<h1 class="screen-title">Examenonderdelen</h1>' +
      '<p class="screen-sub">Op je poom-examen laat je meer zien dan alleen poomsae. Tik op de luidspreker voor de Koreaanse uitspraak.</p>' +
      cards +
      '<div class="notecard">Oefen sparren, zelfverdediging en breektesten <b>altijd onder begeleiding</b> van je trainer.</div>' +
      '</div></div>';
  }

  /* ---------- View: Teller (Koreaans 1–10) ---------- */
  function tellCounts() { var g = C.termen.filter(function (x) { return /Tellen/.test(x.groep); })[0]; return g ? g.items : []; }
  function tellSet(numTxt, c, activeIdx) {
    var n = document.getElementById('cnum'), k = document.getElementById('cko');
    if (n) n.textContent = numTxt;
    if (k) k.textContent = c ? (c.roman + (c.nl ? ' · ' + c.nl : '')) : '';
    var dots = document.querySelectorAll('#cdots span');
    [].forEach.call(dots, function (d, i) { d.classList.toggle('on', i === activeIdx); });
  }
  function tellerStart() {
    var counts = tellCounts(); if (!counts.length) return;
    if (tellerTimer) { clearInterval(tellerTimer); tellerTimer = null; }
    var loop = !!(document.getElementById('cloop') && document.getElementById('cloop').checked);
    var startBtn = document.getElementById('cstart'); if (startBtn) startBtn.textContent = 'Opnieuw';
    var i = 0;
    function step() {
      if (i >= counts.length) {
        if (loop) { i = 0; }
        else { clearInterval(tellerTimer); tellerTimer = null; tellSet('', { roman: 'Klaar! Goed geteld 🎉', nl: '' }, -1); return; }
      }
      var c = counts[i];
      tellSet(String(i + 1), c, i);
      speak(c.ko);
      i++;
    }
    step();
    tellerTimer = setInterval(step, 1000);
  }
  function tellerStop() {
    if (tellerTimer) { clearInterval(tellerTimer); tellerTimer = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    var startBtn = document.getElementById('cstart'); if (startBtn) startBtn.textContent = 'Start';
  }
  function viewTeller() {
    var counts = tellCounts();
    var dots = counts.map(function (_, i) { return '<span data-i="' + i + '"></span>'; }).join('');
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">Tellen</span>' +
      '<h1 class="screen-title">Koreaans tellen</h1>' +
      '<p class="screen-sub">Voor je 10-herhalingen: de app telt hardop mee in het Koreaans, één tel per seconde.</p>' +
      '<div class="counter">' +
        '<div class="cnum" id="cnum"></div>' +
        '<div class="cko" id="cko">Druk op start</div>' +
        '<div class="cdots" id="cdots">' + dots + '</div>' +
      '</div>' +
      '<div class="cctrl">' +
        '<button class="btn primary" id="cstart" data-act="tellerStart">Start</button>' +
        '<button class="btn ghost" id="cstop" data-act="tellerStop">Stop</button>' +
      '</div>' +
      '<label class="cloop"><input type="checkbox" id="cloop"> <span>Blijf herhalen</span></label>' +
      '<div class="notecard">Tip: zet je toestel op de standaard, tel hardop mee en beweeg op de tel. Zo leer je de telwoorden vanzelf. Heb je geluid nodig? Zet je iPhone uit stil-stand.</div>' +
      '</div></div>';
  }

  /* ---------- View: Flashcards (termen) ---------- */
  function allTerms() { var a = []; C.termen.forEach(function (g) { g.items.forEach(function (i) { a.push(i); }); }); return a; }
  function viewFlash() {
    flashState = { cards: shuffle(allTerms()).slice(0, 10), i: 0, flipped: false, knew: 0 };
    renderFlash();
  }
  function renderFlash() {
    var s = flashState;
    if (s.i >= s.cards.length) return renderFlashDone();
    var c = s.cards[s.i], d = daily();
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<button class="backlink" data-act="flashexit">‹ Terug</button>' +
      '<span class="secnum">Flashcards</span>' +
      '<h1 class="screen-title">Termen oefenen</h1>' +
      '<p class="screen-sub">Kaart ' + (s.i + 1) + ' van ' + s.cards.length + ' · dagdoel ' + Math.min(d.flash || 0, 5) + '/5</p>' +
      '<div class="flashbar"><i style="width:' + (s.i / s.cards.length * 100) + '%"></i></div>' +
      '<div class="flashcard' + (s.flipped ? ' flip' : '') + '" data-act="flashflip">' +
        '<div class="fc-in">' +
          '<div class="fc-face fc-front"><button class="speak" data-act="speak" data-ko="' + esc(c.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button>' +
            '<div class="ko">' + esc(c.ko) + '</div><div class="hint">Tik om te draaien</div></div>' +
          '<div class="fc-face fc-back"><div class="ro">' + esc(c.roman) + '</div><div class="nl">' + esc(c.nl) + '</div></div>' +
        '</div></div>' +
      '<div class="flashctrl">' +
        '<button class="btn ghost" data-act="flashnext" data-k="0">Nog niet</button>' +
        '<button class="btn primary" data-act="flashnext" data-k="1">Wist ik ✓</button>' +
      '</div>' +
      '</div></div>';
  }
  function flashNext(knew) {
    var s = flashState; if (knew) s.knew++;
    var d = daily(); d.flash = (d.flash || 0) + 1; save(prog); checkDaily();
    s.i++; s.flipped = false; renderFlash();
  }
  function renderFlashDone() {
    var s = flashState;
    view.innerHTML = '<div class="view active"><div class="screen"><div class="quizcard quizdone">' +
      '<div class="score">' + s.knew + '/' + s.cards.length + '</div>' +
      '<h2 style="margin:10px 0 4px">Sterk geoefend! 🧠</h2>' +
      '<p>Je wist ' + s.knew + ' van de ' + s.cards.length + ' termen.</p>' +
      '<button class="btn primary" data-act="flashretry" style="margin-top:14px">Nog een set</button> ' +
      '<a class="btn ghost" href="#/home" style="margin-top:14px;display:inline-block;text-decoration:none">Naar home</a>' +
      '</div></div></div>';
  }

  /* ---------- Stand-illustraties (top-down voetafdrukken) ----------
     Ingekleurde voet = daar draag je gewicht, lijnvoet = lichte voet.
     kind: 'red' = hoofdgewicht · 'ink' = draagt gewicht (50/50) · 'out' = licht. */
  var SOLE = 'M -3.6 -6.5 C -4.2 -10.5 -2.8 -14 0 -14 C 2.8 -14 4.2 -10.5 3.6 -6.5 C 3.3 -3.5 3.2 -0.5 2.7 3 C 2.3 7.5 1.8 12 0.9 13.2 C 0.35 13.9 -0.35 13.9 -0.9 13.2 C -1.8 12 -2.3 7.5 -2.7 3 C -3.2 -0.5 -3.3 -3.5 -3.6 -6.5 Z';
  function sfoot(x, y, a, mir, kind) {
    var g = '<g transform="translate(' + x + ' ' + y + ') rotate(' + a + ') scale(' + (mir ? -1 : 1) + ' 1)">';
    if (kind === 'out') {
      return g + '<path d="' + SOLE + '" fill="none" stroke="#9AA4B2" stroke-width="1.6"/>' +
        '<g fill="none" stroke="#9AA4B2" stroke-width="1.2"><circle cx="-1.3" cy="-14" r=".9"/><circle cx="0.3" cy="-14.4" r="1"/><circle cx="1.8" cy="-13.8" r=".9"/></g></g>';
    }
    var col = kind === 'red' ? '#E11D3F' : '#37415A';
    return g + '<path d="' + SOLE + '" fill="' + col + '"/>' +
      '<g fill="' + col + '"><circle cx="-1.9" cy="-13.7" r=".95"/><circle cx="-0.4" cy="-14.4" r="1.05"/><circle cx="1.2" cy="-14.3" r="1.05"/><circle cx="2.5" cy="-13.4" r=".9"/></g></g>';
  }
  function legFoot(kind) {
    return '<svg viewBox="0 0 12 34" width="10" height="28" aria-hidden="true">' + sfoot(6, 17, 0, false, kind) + '</svg>';
  }
  function stanceSVG(roman) {
    var r = String(roman).toLowerCase(), s;
    if (r.indexOf('moa') >= 0) s = sfoot(27, 33, 0, false, 'ink') + sfoot(37, 33, 0, true, 'ink');
    else if (r.indexOf('naranhi') >= 0) s = sfoot(22, 33, 0, false, 'ink') + sfoot(42, 33, 0, true, 'ink');
    else if (r.indexOf('ap seogi') >= 0) s = sfoot(25, 45, 0, false, 'ink') + sfoot(39, 21, 0, true, 'ink');
    else if (r.indexOf('ap kubi') >= 0) s = sfoot(24, 47, 20, false, 'out') + sfoot(41, 17, 0, true, 'red');
    else if (r.indexOf('dwit') >= 0) s = sfoot(35, 17, 0, false, 'out') + sfoot(29, 46, 90, true, 'red');
    else if (r.indexOf('juchum') >= 0) s = sfoot(20, 33, 0, false, 'ink') + sfoot(44, 33, 0, true, 'ink');
    else s = sfoot(27, 33, 0, false, 'ink') + sfoot(37, 33, 0, true, 'ink');
    return '<svg viewBox="0 0 64 64" width="58" height="58" aria-hidden="true"><rect width="64" height="64" rx="15" fill="#EEF1F6"/>' + s + '</svg>';
  }


  function svgCircle() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9" stroke-linecap="round"/></svg>'; }
  function svgBolt() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3L5 13h6l-1 8 9-11h-6z"/></svg>'; }
  function svgChat() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11h-9l-4 4v-4H4z"/></svg>'; }
  function svgQuiz() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3-5 3V6a2 2 0 0 1 2-2z"/><path d="M9.5 9.5l1.8 1.8 3.2-3.4"/></svg>'; }
  function svgBook() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h10v16H6a2 2 0 0 0-2 2z"/><path d="M16 3h2a2 2 0 0 1 2 2v14"/></svg>'; }
  function feetMini() { return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.249 3.224a.75.75 0 0 0-.774-.724.75.75 0 0 0-.725.776zM5.114 18.53l-.738.13zM3.77 6.512a.75.75 0 0 0-.868-.608.75.75 0 0 0-.61.87zm2.298-1.369a.75.75 0 0 0-.868-.607.75.75 0 0 0-.61.87zM4.753 6.338l.13.738 1.477-.262-.13-.738zM8.446 4.24a.75.75 0 0 0-.868-.608.75.75 0 0 0-.609.87zM7.133 5.435l.13.739 1.476-.262-.13-.739zM10.5 3.25l-.75.026v.008l.013.464c.008.296.017.71.023 1.183a53 53 0 0 1-.035 3.032L10.5 8l.748.037c.05-.965.049-2.172.037-3.128a96 96 0 0 0-.035-1.651v-.032l-.001-.002zm0 4.75-.75-.037c-.04.808-.362 1.526-.709 2.585-.33 1.011-.619 2.198-.363 3.656l.738-.13.739-.131c-.194-1.106.012-2.016.311-2.93.284-.867.728-1.904.782-2.976zm-1.084 6.073-.738.131c.18 1.033.413 1.6.63 2.083.2.446.349.747.453 1.344l.739-.131.738-.13c-.14-.803-.365-1.259-.562-1.699-.18-.403-.367-.85-.521-1.728zM10.5 17.5l-.739.13a2.24 2.24 0 0 1-.283 1.562c-.275.44-.756.82-1.542.96l.13.738.13.739c1.183-.21 2.042-.826 2.553-1.644.5-.802.64-1.754.49-2.616zm-2.434 3.39-.13-.739c-.664.118-1.124-.141-1.473-.542-.376-.43-.57-.978-.61-1.21l-.739.13-.738.132c.082.467.38 1.274.956 1.936.604.692 1.559 1.263 2.863 1.032zm-2.952-2.36.739-.131-1.594-9.09-.739.13-.738.132 1.594 9.09zM3.52 9.44l.739-.131-.49-2.797-.739.131-.738.131.49 2.797zm1.808-4.166-.738.131.163.933.739-.131.738-.131-.163-.933zm2.38-.902-.739.13.164.933.738-.131.739-.131-.164-.932zm5.043-1.124a.75.75 0 1 1 1.5.002zm6.115 15.292.739.13zm1.36-12.029a.75.75 0 0 1 1.477.26zm-2.298-1.367a.75.75 0 1 1 1.477.26zm1.313 1.193-.13.739-1.477-.26.13-.74zm-3.692-2.094a.75.75 0 1 1 1.477.26zm1.312 1.194-.13.738-1.477-.26.13-.739zm-3.36-2.188.75.001V8h-1.5V3.248zm0 4.75h.75c0 .781.31 1.491.664 2.548.337 1.006.65 2.201.39 3.669l-.738-.13-.739-.131c.194-1.1-.026-2.008-.336-2.932-.293-.876-.742-1.925-.742-3.023zm1.066 6.086.739.13c-.182 1.031-.41 1.594-.62 2.072-.195.442-.341.742-.447 1.343l-.739-.13-.739-.13c.141-.8.36-1.25.552-1.688.177-.4.36-.845.515-1.727zM13.5 17.5l.739.13c-.096.542-.006 1.117.275 1.577.27.442.745.823 1.527.96l-.13.74-.13.738c-1.189-.21-2.043-.832-2.547-1.655-.493-.807-.624-1.761-.473-2.62zm2.41 3.407.13-.74c.665.118 1.126-.142 1.476-.544.376-.431.57-.98.612-1.212l.738.13.739.13c-.082.467-.381 1.276-.959 1.938-.605.694-1.56 1.266-2.866 1.036zm2.956-2.366-.738-.13 1.604-9.1.739.13.738.131-1.604 9.1zm1.605-9.1-.739-.13.494-2.799.738.13.739.13-.494 2.8zm-1.804-4.166.738.13-.164.933-.739-.13-.738-.13.164-.933zm-2.38-.9.739.13-.165.933-.738-.13-.739-.13.165-.934z"/></svg>'; }
  function svgExam() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9.5 12l2 2 3.5-4"/></svg>'; }
  function svgTimer() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6"/><path d="M12 8v6l4 2"/><circle cx="12" cy="14" r="8"/></svg>'; }

  /* ---------- Event-delegatie ---------- */
  view.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'speak') speak(b.getAttribute('data-ko'));
    else if (act === 'poom') location.hash = '#/poomsae/' + b.getAttribute('data-id');
    else if (act === 'back') location.hash = '#/poomsae';
    else if (act === 'seg') { location.hash = '#/techniek/' + b.getAttribute('data-k'); }
    else if (act === 'lvl') {
      var l = b.getAttribute('data-l');
      if (prog.level !== l) { prog.level = l; save(prog); toast('Niveau: ' + C.levels[l].naam); viewHome(); refreshStreak(); }
    }
    else if (act === 'goal') {
      var g = b.getAttribute('data-g');
      location.hash = g === 'quiz' ? '#/quiz' : g === 'flash' ? '#/flash' : '#/poomsae';
    }
    else if (act === 'togglepoom') {
      var id = b.getAttribute('data-id');
      prog.poomsae[id] = !prog.poomsae[id];
      if (prog.poomsae[id]) daily().practiced[id] = true;
      save(prog);
      toast(prog.poomsae[id] ? 'Gemarkeerd als geoefend ✓' : 'Markering gewist');
      if (prog.poomsae[id]) checkDaily();
      viewPoomDetail(id); refreshStreak();
    }
    else if (act === 'video') {
      var v = b.getAttribute('data-v');
      b.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v + '?rel=0&modestbranding=1&autoplay=1" title="Poomsae-video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      b.classList.add('playing'); b.removeAttribute('data-act');
    }
    else if (act === 'tellerStart') tellerStart();
    else if (act === 'tellerStop') tellerStop();
    else if (act === 'flashflip') { flashState.flipped = !flashState.flipped; b.classList.toggle('flip', flashState.flipped); }
    else if (act === 'flashnext') flashNext(b.getAttribute('data-k') === '1');
    else if (act === 'flashretry') viewFlash();
    else if (act === 'flashexit') location.hash = '#/home';
    else if (act === 'qopt') answerQuiz(+b.getAttribute('data-i'));
    else if (act === 'qnext') { quizState.i++; quizState.answered = false; renderQuiz(); }
    else if (act === 'qretry') viewQuiz();
  });

  /* ---------- Segmented control zonder route-herlaad (soepeler) ---------- */
  // (seg gebruikt hash zodat terugknop werkt; hashchange re-rendert)

  /* ---------- Install-prompt (A2HS) ---------- */
  var deferred = null;
  var bar = document.getElementById('installbar');
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (localStorage.getItem('poom.install.dismissed') !== '1') bar.classList.add('show');
  });
  document.getElementById('installYes').addEventListener('click', function () {
    bar.classList.remove('show');
    if (deferred) { deferred.prompt(); deferred = null; }
  });
  document.getElementById('installNo').addEventListener('click', function () {
    bar.classList.remove('show'); localStorage.setItem('poom.install.dismissed', '1');
  });
  window.addEventListener('appinstalled', function () { bar.classList.remove('show'); toast('Geïnstalleerd 🥋'); });

  /* ---------- Start ---------- */
  window.addEventListener('hashchange', go);
  if (!location.hash) location.replace('#/home');
  go();
})();
