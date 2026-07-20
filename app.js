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

  function poomDone() { return C.poomsae.filter(function (p) { return prog.poomsae[p.id]; }).length; }
  function refreshStreak() { document.getElementById('streakN').textContent = poomDone(); }

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
  var routes = ['home', 'poomsae', 'techniek', 'termen', 'quiz', 'theorie', 'standen'];
  function parse() {
    var h = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!h.length) h = ['home'];
    return h;
  }
  function go() {
    var seg = parse();
    var r = seg[0];
    if (routes.indexOf(r) < 0) r = 'home';
    view.innerHTML = '';
    if (r === 'home') viewHome();
    else if (r === 'poomsae') { seg[1] ? viewPoomDetail(seg[1]) : viewPoomList(); }
    else if (r === 'techniek') viewTechniek(seg[1]);
    else if (r === 'standen') viewTechniek('standen');
    else if (r === 'termen') viewTermen();
    else if (r === 'quiz') viewQuiz();
    else if (r === 'theorie') viewTheorie();
    // nav active state
    var navR = (r === 'standen') ? 'techniek' : r;
    [].forEach.call(nav.querySelectorAll('a'), function (a) {
      a.classList.toggle('on', a.getAttribute('data-r') === navR);
    });
    window.scrollTo(0, 0);
    refreshStreak();
  }

  /* ---------- View: Home ---------- */
  function viewHome() {
    var done = poomDone(), pct = Math.round(done / C.poomsae.length * 100);
    var all = []; C.termen.forEach(function (g) { g.items.forEach(function (i) { all.push(i); }); });
    var tod = all[(new Date().getDate() + new Date().getMonth()) % all.length];

    var tiles = [
      ['#/poomsae', 'Poomsae', 'De 8 Taegeuk-vormen', svgCircle()],
      ['#/techniek', 'Techniek', 'Standen, blokken, trappen', svgBolt()],
      ['#/termen', 'Termen', 'Koreaans met uitspraak', svgChat()],
      ['#/quiz', 'Quiz', 'Test wat je weet', svgQuiz()],
      ['#/standen', 'Standen', 'De 6 basisstanden', feetMini()],
      ['#/theorie', 'Theorie', 'Achtergrond & etiquette', svgBook()]
    ].map(function (t) {
      return '<a class="tile" href="' + t[0] + '"><span class="ti">' + t[3] + '</span>' +
        '<h3>' + t[1] + '</h3><small>' + t[2] + '</small></a>';
    }).join('');

    view.innerHTML =
      '<div class="view active"><div class="screen">' +
        '<div class="hero">' +
          '<div class="myline">Mijn</div>' +
          '<h1>Poom<span class="dot">.</span>Academie</h1>' +
          '<span class="goal">Doel: <b>' + esc(C.meta.doel) + '</b></span>' +
          '<div class="prog-wrap">' +
            '<div class="ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
            '<div class="pl">Poomsae geoefend<b>' + done + ' / ' + C.poomsae.length + '</b>' +
              (done === C.poomsae.length ? 'Alles gehad — knap werk! 🥋' : 'Ga zo door!') + '</div>' +
          '</div>' +
          '<img class="wm" src="mark-taeguk.svg" alt="">' +
        '</div>' +
        '<span class="secnum">Ontdek</span>' +
        '<div class="tiles">' + tiles + '</div>' +
        '<div class="trow" style="margin-top:20px">' +
          '<button class="speak" data-act="speak" data-ko="' + esc(tod.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button>' +
          '<div class="tx"><div class="ko">' + esc(tod.ko) + '</div><div class="ro">' + esc(tod.roman) + '</div><div class="nl">Term van de dag · ' + esc(tod.nl) + '</div></div>' +
        '</div>' +
        '<div class="notecard">' + esc(C.meta.bron) + ' Bekijk ook de <a href="styleguide.html">merk- &amp; stijlgids</a>.</div>' +
      '</div></div>';
  }

  /* ---------- View: Poomsae-lijst ---------- */
  function viewPoomList() {
    var rows = C.poomsae.map(function (p) {
      var done = !!prog.poomsae[p.id];
      return '<button class="poomrow" data-act="poom" data-id="' + p.id + '">' +
        '<span class="tg' + (done ? ' done' : '') + '">' + p.trigram + '</span>' +
        '<span class="pm"><b>Taegeuk ' + p.nr + ' · ' + esc(p.trigramNaam) + '</b>' +
        '<small>' + esc(p.element) + ' · ' + esc(p.kup) + '</small></span>' +
        '<span class="meta"><span class="mv">' + p.bewegingen + '</span><small>bew.</small></span>' +
        (done ? '<span class="check on">' + ICON_CHECK + '</span>' : '<span class="chev">' + ICON_CHEV + '</span>') +
        '</button>';
    }).join('');
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">01 — De vormen</span>' +
      '<h1 class="screen-title">Poomsae 1–8</h1>' +
      '<p class="screen-sub">De acht Taegeuk-vormen naar je eerste poom. Tik op een vorm voor de betekenis, het trigram en de nieuwe technieken.</p>' +
      '<div class="poomlist">' + rows + '</div>' +
      '<div class="notecard">Elke vorm hoort bij één van de acht <b>trigrammen</b> (pal gwae). De volledige choreografie leer je met je trainer in de dojang.</div>' +
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
      body = '<div class="rows">' + C.standen.map(function (s) {
        return '<div class="stance"><span class="feet">' + feetSVG() + '</span>' +
          '<div class="sd"><b>' + esc(s.roman) + '</b><span class="ko">' + esc(s.ko) + '</span>' +
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
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function viewQuiz() {
    quizState = { qs: shuffle(C.quiz), i: 0, score: 0, answered: false };
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
    var msg = s.score === n ? 'Perfect! Meesterlijk. 🥋' : s.score >= n * 0.7 ? 'Sterk gedaan!' : 'Goed geoefend — probeer het nog eens.';
    view.innerHTML = '<div class="view active"><div class="screen"><div class="quizcard quizdone">' +
      '<div class="score">' + s.score + '/' + n + '</div>' +
      '<h2 style="margin:10px 0 4px">' + msg + '</h2>' +
      '<p>Beste score tot nu: ' + prog.quizBest + '/' + n + '</p>' +
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

  /* ---------- Tile-icoontjes ---------- */
  function svgCircle() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9" stroke-linecap="round"/></svg>'; }
  function svgBolt() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3L5 13h6l-1 8 9-11h-6z"/></svg>'; }
  function svgChat() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11h-9l-4 4v-4H4z"/></svg>'; }
  function svgQuiz() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3-5 3V6a2 2 0 0 1 2-2z"/><path d="M9.5 9.5l1.8 1.8 3.2-3.4"/></svg>'; }
  function svgBook() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h10v16H6a2 2 0 0 0-2 2z"/><path d="M16 3h2a2 2 0 0 1 2 2v14"/></svg>'; }
  function feetMini() { return '<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="8" cy="14" rx="3" ry="5"/><circle cx="8" cy="6.5" r="1.5"/><ellipse cx="16" cy="14" rx="3" ry="5"/><circle cx="16" cy="6.5" r="1.5"/></svg>'; }

  /* ---------- Event-delegatie ---------- */
  view.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'speak') speak(b.getAttribute('data-ko'));
    else if (act === 'poom') location.hash = '#/poomsae/' + b.getAttribute('data-id');
    else if (act === 'back') location.hash = '#/poomsae';
    else if (act === 'seg') { location.hash = '#/techniek/' + b.getAttribute('data-k'); }
    else if (act === 'togglepoom') {
      var id = b.getAttribute('data-id');
      prog.poomsae[id] = !prog.poomsae[id]; save(prog);
      toast(prog.poomsae[id] ? 'Gemarkeerd als geoefend ✓' : 'Markering gewist');
      viewPoomDetail(id); refreshStreak();
    }
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
