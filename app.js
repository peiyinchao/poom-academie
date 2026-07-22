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
  function doBackupCopy() {
    var code = JSON.stringify(prog);
    var box = document.getElementById('backupbox');
    if (box) box.value = code;
    var done = function () { toast('Back-up gekopieerd — bewaar hem veilig'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done, function () {
        if (box) { box.focus(); box.select(); } toast('Back-up staat in het tekstvak — kopieer hem zelf');
      });
    } else if (box) { box.focus(); box.select(); toast('Back-up staat in het tekstvak — kopieer hem zelf'); }
  }
  function doBackupRestore() {
    var box = document.getElementById('backupbox');
    var raw = box ? box.value.trim() : '';
    if (!raw) { toast('Plak eerst je back-upcode in het vak'); return; }
    var data;
    try { data = JSON.parse(raw); } catch (e) { toast('Deze back-upcode is niet leesbaar'); return; }
    if (!data || typeof data !== 'object') { toast('Deze back-upcode is niet leesbaar'); return; }
    prog = data; save(prog);
    normalizeProg();
    refreshStreak();
    toast('Voortgang hersteld ✓');
    go();
  }
  var prog = load();
  function normalizeProg() {
    if (!prog.poomsae) prog.poomsae = {};
    if (prog.quizBest == null || typeof prog.quizBest === 'number') prog.quizBest = {};
    if (prog.level !== '1' && prog.level !== '2') prog.level = '1';
    if (!prog.exam) prog.exam = {};
    if (!prog.hardTerms) prog.hardTerms = {};
  }
  normalizeProg();

  /* ---------- Niveau (1e / 2e poom) ---------- */
  function curLevel() { return prog.level === '2' ? 2 : 1; }
  function examCount() { return curLevel() >= 2 ? 25 : 15; }
  function bestScore() { return prog.quizBest[prog.level] || 0; }
  function setBest(v) { prog.quizBest[prog.level] = v; save(prog); }
  /* ---------- Moeilijke termen ---------- */
  function termKey(t) { return t.roman; }
  function isHard(t) { return !!prog.hardTerms[termKey(t)]; }
  function toggleHard(k) {
    if (prog.hardTerms[k]) delete prog.hardTerms[k]; else prog.hardTerms[k] = 1;
    save(prog); return !!prog.hardTerms[k];
  }
  function allStudyItems() {
    var a = allTerms();
    C.technieken.forEach(function (g) { g.items.forEach(function (i) { a.push(i); }); });
    C.standen.forEach(function (s) { a.push(s); });
    return a;
  }
  function hardTermList() { return allStudyItems().filter(isHard); }
  function hardBtn(t, sm) {
    var h = isHard(t);
    return '<button class="hardbtn' + (sm ? ' sm' : '') + (h ? ' on' : '') + '" data-act="hardterm" data-k="' + esc(termKey(t)) +
      '" aria-pressed="' + h + '" aria-label="Markeer als moeilijk" title="Moeilijk">' + ICON_BOOKMARK + '</button>';
  }
  function visPoomsae() { var L = curLevel(); return C.poomsae.filter(function (p) { return (p.level || 0) === 0 || p.level <= L; }); }
  function foundationPoomsae() { return C.poomsae.filter(function (p) { return (p.level || 0) === 0; }); }
  function examPoomsae() { var L = curLevel(); return C.poomsae.filter(function (p) { return p.level >= 1 && p.level <= L; }); }
  function examChecks() { prog.exam[prog.level] = prog.exam[prog.level] || {}; return prog.exam[prog.level]; }
  var TILE_IDS = ['theorie', 'standen', 'examen'];
  function tileOrderIds() {
    var saved = (prog.tileOrder || []).filter(function (id) { return TILE_IDS.indexOf(id) >= 0; });
    TILE_IDS.forEach(function (id) { if (saved.indexOf(id) < 0) saved.push(id); });
    return saved;
  }

  function isPracticedToday(id) { return !!daily().practiced[id]; }
  function refreshStreak() { document.getElementById('streakN').textContent = prog.streakDays || 0; }

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
      { id: 'poomsae', label: 'Oefen 3 poomsae', sub: names.join(' · '), done: pDone >= 3, n: pDone, need: 3 },
      { id: 'flash', label: 'Flashcards: 5 termen', done: (d.flash || 0) >= 5, n: d.flash || 0, need: 5 },
      { id: 'quiz', label: 'Doe een quiz', done: !!d.quiz, n: d.quiz ? 1 : 0, need: 1 }
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
      celebrate(); flareStreak();
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
  var speakingBtn = null;
  function clearSpeaking() { if (speakingBtn) { speakingBtn.classList.remove('speaking'); speakingBtn = null; } }
  function speak(text, btn) {
    if (!('speechSynthesis' in window)) { toast('Uitspraak niet ondersteund'); return; }
    speechSynthesis.cancel();
    clearSpeaking();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR'; if (koVoice) u.voice = koVoice; u.rate = .9; u.pitch = 1;
    if (btn) {
      speakingBtn = btn; btn.classList.add('speaking');
      u.onend = u.onerror = function () { if (speakingBtn === btn) clearSpeaking(); };
    }
    speechSynthesis.speak(u);
  }
  function prefersReduce() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function pop(el, cls) { if (!el || prefersReduce()) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function celebrate() {
    if (prefersReduce()) return;
    var wrap = document.createElement('div'); wrap.className = 'confetti';
    var colors = ['#E11D3F', '#2440B8', '#F79009', '#ffffff', '#12B76A'];
    for (var i = 0; i < 44; i++) {
      var p = document.createElement('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--x', (Math.random() * 180 - 90) + 'px');
      p.style.animationDelay = (Math.random() * .25) + 's';
      p.style.animationDuration = (1.1 + Math.random() * .8) + 's';
      wrap.appendChild(p);
    }
    document.body.appendChild(wrap);
    setTimeout(function () { wrap.remove(); }, 2300);
  }
  function flareStreak() {
    var s = document.getElementById('streak');
    if (!s || prefersReduce()) return;
    s.classList.remove('flare'); void s.offsetWidth; s.classList.add('flare');
    setTimeout(function () { s.classList.remove('flare'); }, 900);
  }

  /* ---------- Kleine SVG's ---------- */
  var ICON_SPEAK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a4 4 0 0 1 0 7"/><path d="M18.5 6a7 7 0 0 1 0 12"/></svg>';
  var ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var ICON_CHEV = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
  var ICON_BOOKMARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1z"/></svg>';
  var ICON_RESET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';
  var ICON_REPEAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>';
  // Klein icoon dat middenin een zin past, zodat kinderen de knop herkennen.
  function iic(svg) { return '<span class="iic" aria-hidden="true">' + svg + '</span>'; }
  var ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5l13 7.5-13 7.5z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1.3"/><rect x="14" y="4.5" width="4" height="15" rx="1.3"/></svg>';
  var ICON_TERM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>';
  var ICON_IDEA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 18h5"/><path d="M10 21.5h4"/><path d="M12 2.5a6.5 6.5 0 0 0-4 11.6c.6.5 1 1.3 1 2.1V18h6v-1.8c0-.8.4-1.6 1-2.1A6.5 6.5 0 0 0 12 2.5z"/></svg>';
  function feetSVG() {
    return '<svg viewBox="0 0 40 40" fill="#AEB6C2"><g><ellipse cx="13" cy="24" rx="5" ry="8.5"/><circle cx="9.6" cy="13.5" r="1.7"/><circle cx="13" cy="12.2" r="1.9"/><circle cx="16.4" cy="13.5" r="1.7"/></g><g><ellipse cx="27" cy="24" rx="5" ry="8.5"/><circle cx="23.6" cy="13.5" r="1.7"/><circle cx="27" cy="12.2" r="1.9"/><circle cx="30.4" cy="13.5" r="1.7"/></g></svg>';
  }
  function trigramSVG(ch) {
    var code = (ch.codePointAt(0) - 0x2630) & 7;
    var bars = '';
    for (var k = 0; k < 3; k++) {
      var y = 6 + k * 6, broken = (code >> k) & 1;
      bars += broken
        ? '<rect x="3" y="' + (y - 1.4) + '" width="7.4" height="2.8" rx="1.4"/><rect x="13.6" y="' + (y - 1.4) + '" width="7.4" height="2.8" rx="1.4"/>'
        : '<rect x="3" y="' + (y - 1.4) + '" width="18" height="2.8" rx="1.4"/>';
    }
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + bars + '</svg>';
  }

  /* ---------- Router ---------- */
  var routes = ['home', 'poomsae', 'techniek', 'termen', 'quiz', 'theorie', 'standen', 'examen', 'examenkaart', 'teller', 'flash', 'bronnen'];
  function parse() {
    var h = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!h.length) h = ['home'];
    return h;
  }
  function go() {
    var seg = parse();
    var r = seg[0];
    if (routes.indexOf(r) < 0) r = 'home';
    if (tellerTimer) { clearInterval(tellerTimer); tellerTimer = null; } tellerRunning = false;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    clearSpeaking();
    view.innerHTML = '';
    if (r === 'home') viewHome();
    else if (r === 'poomsae') { seg[1] ? viewPoomDetail(seg[1]) : viewPoomList(); }
    else if (r === 'techniek') viewTechniek(seg[1]);
    else if (r === 'standen') viewTechniek('standen');
    else if (r === 'termen') viewTermen();
    else if (r === 'quiz') viewQuiz();
    else if (r === 'theorie') viewTheorie();
    else if (r === 'examen') viewExamen();
    else if (r === 'examenkaart') viewExamenkaart();
    else if (r === 'teller') viewTeller();
    else if (r === 'flash') viewFlash();
    else if (r === 'bronnen') viewBronnen();
    // nav active state
    var navMap = { standen: 'techniek', examen: 'theorie', examenkaart: 'home', bronnen: 'home', flash: 'termen' };
    var navR = navMap[r] || r;
    [].forEach.call(nav.querySelectorAll('a'), function (a) {
      a.classList.toggle('on', a.getAttribute('data-r') === navR);
    });
    moveNavPill();
    window.scrollTo(0, 0);
    refreshStreak();
  }

  function moveNavPill() {
    var pill = document.getElementById('navpill');
    if (!pill) return;
    var a = nav.querySelector('a.on');
    if (!a) { pill.classList.remove('show'); return; }
    var w = a.offsetWidth, x = a.offsetLeft;
    var pw = Math.min(w - 8, 74);
    pill.style.width = pw + 'px';
    pill.style.transform = 'translateX(' + (x + (w - pw) / 2) + 'px)';
    pill.classList.add('show');
  }
  window.addEventListener('resize', moveNavPill);
  window.addEventListener('orientationchange', function(){ setTimeout(moveNavPill, 120); });

  /* ---------- View: Home ---------- */
  function viewHome() {
    var idx = new Date().getDate() + new Date().getMonth();
    var all = allTerms();
    var todPool = hardTermList(); var todHard = todPool.length > 0; if (!todHard) todPool = all;
    var tod = todPool[idx % todPool.length];
    var todLabel = todHard ? 'Moeilijke term van de dag' : 'Term van de dag';
    var quote = C.quotes[idx % C.quotes.length];
    var WD = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    var MO = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    var nowD = new Date();
    var dateStr = WD[nowD.getDay()] + ' ' + nowD.getDate() + ' ' + MO[nowD.getMonth()] + ' ' + nowD.getFullYear();

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

    var tileDefs = {
      standen: ['#/standen', 'Standen', 'Standen met voetdiagram', feetMini()],
      examen: ['#/examenkaart', 'Examen', 'Onderdelen & aftekenlijst', svgExam()],
      theorie: ['#/theorie', 'Theorie', 'Achtergrond & etiquette', svgBook()]
    };
    var order = TILE_IDS.slice();
    var tiles = order.map(function (id) {
      var t = tileDefs[id]; if (!t) return '';
      return '<a class="tile' + (id === 'examen' ? ' wide' : '') + '" href="' + t[0] + '"><span class="ti">' + t[3] + '</span>' +
        '<h3>' + t[1] + '</h3><small>' + t[2] + '</small></a>';
    }).join('');

    view.innerHTML =
      '<div class="view active"><div class="screen">' +
        '<div class="hero hero-daily">' +
          '<div class="myline">Mijn</div>' +
          '<h1>Poom<span class="dot">.</span>Academy</h1>' +
          '<div class="lvlsel"><span class="ll">Ik oefen voor</span>' + lvlToggle + '</div>' +
          '<div class="hdaily-hd">' +
            '<div class="hd-l"><span class="hd-label">Dagdoel</span>' +
              '<span class="hd-date">' + esc(dateStr) + '</span></div>' +
            '<span class="daystreak' + (streak ? ' on' : '') + '">🔥 ' + streak + ' dag' + (streak === 1 ? '' : 'en') + '</span>' +
          '</div>' +
          '<div class="hgoals">' + goalHtml + '</div>' +
          (allDone ? '<div class="daily-done">Alle dagdoelen gehaald! Top gedaan. 🎉</div>' : '') +
          '<img class="wm" src="mark-taeguk.svg" alt="">' +
        '</div>' +

        '<div class="trow tod">' +
          '<div class="tx"><div class="cardkick"><span class="dk-ic">' + ICON_TERM + '</span>' + esc(todLabel) + '</div>' +
            '<div class="ko">' + esc(tod.ko) + ' · ' + esc(tod.nl) + '</div><div class="ro">' + esc(tod.roman) + '</div></div>' +
          '<button class="speak" data-act="speak" data-ko="' + esc(tod.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button></div>' +

        '<div class="quotecard"><div class="cardkick"><span class="dk-ic">' + ICON_IDEA + '</span>Gedachte van de dag</div>' +
          '<span class="qt">“' + esc(quote) + '”</span></div>' +

        '<div class="grouphd">Naslag</div>' +
        '<div class="tiles">' + tiles + '</div>' +

        '<div class="notecard srcnote">' + esc(C.meta.bron) + ' Bekijk de <a href="#/bronnen">bronnen &amp; verantwoording</a>.</div>' +
      '</div></div>';
  }

  /* ---------- View: Poomsae-lijst ---------- */
  function poomRow(p) {
    var done = isPracticedToday(p.id);
    var title = p.level >= 1 ? esc(p.korean) : 'Taegeuk ' + p.nr + (p.sino ? ' · ' + esc(p.sino) : '');
    var ask = (p.level || 0) === 0 && !done && daily().suggest.indexOf(p.id) >= 0;
    return '<button class="poomrow" data-act="poom" data-id="' + p.id + '">' +
      '<span class="tg' + (done ? ' done' : '') + '">' + trigramSVG(p.trigram) + '</span>' +
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
      '<div class="stickyhd">' +
      '<span class="secnum">De vormen</span>' +
      '<h1 class="screen-title">Poomsae</h1>' +
      '</div>' +
      '<p class="screen-sub">De acht Taegeuk-vormen zijn je basis. Wat je daarboven nodig hebt, hangt af van je poom. Tik op een vorm voor de betekenis, het trigram en de nieuwe technieken.</p>' +
      '<p class="screen-sub">' + esc(C.levels[prog.level].omschrijving) + '</p>' +
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
    var done = isPracticedToday(p.id);
    var nieuw = p.nieuw.map(function (t) {
      return '<div class="trow"><button class="speak" data-act="speak" data-ko="' + esc(t.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button>' +
        '<div class="tx"><div class="ko">' + esc(t.ko) + '</div><div class="ro">' + esc(t.roman) + '</div><div class="nl">' + esc(t.nl) + '</div></div></div>';
    }).join('');
    var focus = p.focus.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
    var beeldBox = (p.beeld || p.kernpunt) ?
      '<div class="focusbox">' +
        (p.beeld ? '<div class="fb-beeld"><span class="fb-tag">Beeld</span>' + esc(p.beeld) + '</div>' : '') +
        (p.kernpunt ? '<div class="fb-focus"><span class="fb-tag">Focus</span>' + esc(p.kernpunt) + '</div>' : '') +
      '</div>' : '';
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
      '<div class="detail-head"><span class="tg">' + trigramSVG(p.trigram) + '</span>' +
        '<div><h2>' + esc(p.korean) + '</h2><div class="kr">' + esc(p.hangul) + ' · ' + esc(p.trigramNaam) + ' (' + esc(p.trigramHangul) + ')</div></div></div>' +
      '<div class="factrow">' +
        fact('Element', p.element) + fact('Graad', p.kup) + fact('Band', p.band) + fact('Stappen', p.bewegingen) +
      '</div>' +
      '<div class="blurb">' + esc(p.betekenis) + '</div>' +
      '<div class="sect"><h4>Waar let je op</h4></div>' + beeldBox + '<ul class="ul">' + focus + '</ul>' +
      '<div class="sect"><h4>Nieuwe technieken</h4></div><div class="rows">' + nieuw + '</div>' +
      '<div class="sect"><h4>Standen in deze vorm</h4></div><p style="color:var(--gray);font-size:14px">' + standen + '</p>' +
      videoHtml +
      '<button class="btn ' + (done ? 'ghost donebtn' : 'primary') + '" style="width:100%;margin-top:22px" data-act="togglepoom" data-id="' + p.id + '">' +
        (done ? '<span class="ck">' + ICON_CHECK + '</span>Geoefend — tik om te wissen' : 'Markeer als geoefend') + '</button>' +
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

    var body, legendHtml = '';
    if (sub === 'standen') {
      legendHtml = '<div class="stancelegend">' + legFoot('red') + ' gewicht &nbsp;·&nbsp; ' + legFoot('ink') + ' 50/50 &nbsp;·&nbsp; ' + legFoot('out') + ' lichte voet &nbsp;·&nbsp; <b class="facear">↑</b> voorkant</div>';
      body = '<div class="rows">' + C.standen.map(function (s) {
        var hard = isHard(s);
        return '<div class="stance' + (hard ? ' hard' : '') + '"><span class="feet">' + stanceSVG(s.roman) + '</span>' +
          '<div class="sd"><div class="sdhd"><b>' + esc(s.roman) + '</b>' +
          hardBtn(s, true) +
          '<button class="speak sm" data-act="speak" data-ko="' + esc(s.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button></div>' +
          '<span class="ko">' + esc(s.ko) + ' · ' + esc(s.nl) + '</span>' +
          '<small>' + esc(s.uitleg) + '</small>' +
          '<span class="wt">' + esc(s.gewicht) + '</span></div></div>';
      }).join('') + '</div>';
    } else {
      var g = C.technieken[+sub.slice(1)];
      body = '<div class="grouphd">' + esc(g.cat) + '</div><div class="rows">' + g.items.map(termRowH).join('') + '</div>';
    }

    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<div class="stickyhd">' +
      '<span class="secnum">Techniek</span>' +
      '<h1 class="screen-title">Standen &amp; technieken</h1>' +
      '<p class="screen-sub">De bouwstenen van elke vorm. Tik op de luidspreker ' + iic(ICON_SPEAK) + ' om de Koreaanse naam te horen.</p>' +
      '<div class="termtabs">' + segHtml + '</div>' +
      legendHtml +
      '</div>' +
      '<div id="techbody">' + body + '</div>' +
      '</div></div>';
  }

  function termRow(t) {
    return '<div class="trow"><button class="speak" data-act="speak" data-ko="' + esc(t.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button>' +
      '<div class="tx"><div class="ko">' + esc(t.ko) + '</div><div class="ro">' + esc(t.roman) + '</div><div class="nl">' + esc(t.nl) + '</div></div></div>';
  }

  /* ---------- View: Termen ---------- */
  var termTab = null;
  function termTabs() {
    var tabs = C.termen.map(function (g) { return { k: g.groep, label: g.groep }; });
    if (hardTermList().length) tabs.push({ k: 'hard', label: 'Moeilijk' });
    return tabs;
  }
  function viewTermen() {
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<div class="stickyhd">' +
      '<span class="secnum">Woordenschat</span>' +
      '<h1 class="screen-title">Koreaanse termen</h1>' +
      '<p class="screen-sub">Kies een categorie en luister naar de uitspraak ' + iic(ICON_SPEAK) + '. Tik op de bladwijzer ' + iic(ICON_BOOKMARK) + ' om een term als moeilijk te bewaren — die komt vaker terug in je dagterm en flashcards.</p>' +
      '<div class="termtabs" id="termtabs"></div>' +
      '</div>' +
      '<div id="termbody"></div>' +
      '</div></div>';
    renderTermTabs();
    renderTermTab();
  }
  function renderTermTabs() {
    var tabs = termTabs();
    if (!termTab || !tabs.some(function (t) { return t.k === termTab; })) termTab = tabs[0].k;
    document.getElementById('termtabs').innerHTML = tabs.map(function (t) {
      return '<button class="' + (t.k === termTab ? 'on' : '') + '" data-act="termtab" data-k="' + esc(t.k) + '">' + esc(t.label) + '</button>';
    }).join('');
  }
  function termRowH(t) {
    var hard = isHard(t);
    return '<div class="trow' + (hard ? ' hard' : '') + '">' + hardBtn(t) +
      '<div class="tx"><div class="ko">' + esc(t.ko) + '</div><div class="ro">' + esc(t.roman) + '</div><div class="nl">' + esc(t.nl) + '</div></div>' +
      '<button class="speak" data-act="speak" data-ko="' + esc(t.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button></div>';
  }
  function renderTermTab() {
    var items, hd;
    if (termTab === 'hard') { items = hardTermList(); hd = 'Moeilijke termen'; }
    else { var g = C.termen.filter(function (x) { return x.groep === termTab; })[0]; items = g ? g.items : []; hd = g ? g.groep : ''; }
    var body = items.length
      ? '<div class="grouphd">' + esc(hd) + ' <span class="gcount">' + items.length + '</span></div><div class="rows">' + items.map(termRowH).join('') + '</div>'
      : '<p class="termempty">Nog geen moeilijke termen. Tik op de bladwijzer ' + iic(ICON_BOOKMARK) + ' bij een term om die vaker te oefenen.</p>';
    document.getElementById('termbody').innerHTML = body;
  }

  /* ---------- View: Quiz ---------- */
  var quizState = null;
  var tellerTimer = null, tellerIdx = 0, tellerSpeed = 1, tellerRunning = false, tellerLoop = false, tellerPrep = null;
  var SPEEDS = [0.25, 0.5, 1, 1.5, 2];
  function fmtSpeed(v) { return String(v).replace('.', ',') + '×'; }
  function nativeRoman(c) { return String(c.roman || '').split('/')[0].trim(); }
  var flashState = null;
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function viewQuiz() {
    var L = curLevel();
    var pool = C.quiz.filter(function (q) { return !q.lvl || q.lvl <= L; });
    var picked = shuffle(pool).slice(0, Math.min(examCount(), pool.length)).map(function (q) {
      var idx = shuffle(q.o.map(function (_, i) { return i; }));
      return { v: q.v, o: idx.map(function (i) { return q.o[i]; }), a: idx.indexOf(q.a) };
    });
    quizState = { qs: picked, i: 0, score: 0, answered: false };
    renderQuiz();
  }
  function quizPass(n) { return Math.ceil(n * 0.6); }
  function renderQuiz() {
    var s = quizState, n = s.qs.length;
    if (s.i >= n) return renderQuizDone();
    var q = s.qs[s.i];
    var opts = q.o.map(function (o, i) {
      return '<button class="opt" data-act="qopt" data-i="' + i + '"><span class="lt">' + 'ABCD'[i] + '</span>' + esc(o) + '</button>';
    }).join('');
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">Oefenen</span>' +
      '<h1 class="screen-title">Examenquiz</h1>' +
      '<p class="screen-sub">Vraag ' + (s.i + 1) + ' van ' + n + ' · net als op je ' + esc(C.levels[prog.level].naam) + '-examen. Geslaagd vanaf ' + quizPass(n) + ' goed.</p>' +
      '<div class="quizbar"><i id="qbar" style="width:' + (s.prevPct || 0) + '%"></i></div>' +
      '<div class="quizcard"><div class="qnum">Vraag ' + (s.i + 1) + '</div>' +
        '<div class="q">' + esc(q.v) + '</div><div class="opts">' + opts + '</div>' +
        '<div class="qfoot" id="qfoot"></div>' +
      '</div></div></div>';
    var qpct = s.i / n * 100; s.prevPct = qpct;
    requestAnimationFrame(function () { var el = document.getElementById('qbar'); if (el) el.style.width = qpct + '%'; });
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
    if (s.score > bestScore()) setBest(s.score);
    var d = daily(); if (!d.quiz) { d.quiz = true; save(prog); checkDaily(); }
    var need = quizPass(n), passed = s.score >= need;
    var msg = s.score === n ? 'Perfect! Meesterlijk. 🥋' : passed ? 'Geslaagd! Dit was genoeg geweest. ✅' : 'Nog niet gehaald — blijf oefenen.';
    view.innerHTML = '<div class="view active"><div class="screen"><div class="quizcard quizdone">' +
      '<div class="score">' + s.score + '/' + n + '</div>' +
      '<div class="qbadge ' + (passed ? 'pass' : 'fail') + '">' + (passed ? 'Geslaagd' : 'Nog niet geslaagd') + '</div>' +
      '<h2 style="margin:10px 0 4px">' + msg + '</h2>' +
      '<p>Je hebt <b>' + need + ' van de ' + n + '</b> goed nodig om te slagen (60%).</p>' +
      '<p class="qhint">Beste score tot nu: ' + bestScore() + '/' + n + '. Zoveel vragen krijg je ook op je echte ' + esc(C.levels[prog.level].naam) + '-examen — elke ronde is willekeurig.</p>' +
      '<button class="btn primary" data-act="qretry" style="margin-top:14px">Opnieuw</button> ' +
      '<a class="btn ghost" href="#/home" style="margin-top:14px;display:inline-block;text-decoration:none">Naar home</a>' +
      '</div></div></div>';
    if (passed) celebrate();
  }

  /* ---------- View: Theorie ---------- */
  function viewTheorie() {
    var acc = C.theorie.map(function (t, i) {
      return '<details' + (i === 0 ? ' open' : '') + '><summary>' + esc(t.titel) + '<span class="pl">+</span></summary>' +
        '<div class="body">' + t.body + '</div></details>';
    }).join('');
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">Achtergrond</span>' +
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
      '<span class="secnum">Examen</span>' +
      '<h1 class="screen-title">Examenonderdelen</h1>' +
      '<p class="screen-sub">Op je poom-examen laat je meer zien dan alleen poomsae. Tik op de luidspreker ' + iic(ICON_SPEAK) + ' voor de Koreaanse uitspraak.</p>' +
      cards +
      '<div class="notecard">Oefen sparren, zelfverdediging en breektesten <b>altijd onder begeleiding</b> van je trainer.</div>' +
      '</div></div>';
  }

  /* ---------- View: Examen (examenkaart + onderdeel-detail, samengevoegd) ---------- */
  function onderByRow(id) {
    var map = { pyojeok: 'gyeorugi' };
    var key = map[id] || id;
    return C.onderdelen.filter(function (o) { return o.id === key; })[0];
  }
  function viewExamenkaart() {
    var L = prog.level, kaart = C.examenkaart[L], checks = examChecks();
    var total = kaart.onderdelen.length;
    var doneN = kaart.onderdelen.filter(function (o) { return checks[o.id]; }).length;
    var pct = Math.round(doneN / total * 100);

    var toggle = '<div class="lvltoggle light">' + ['1', '2'].map(function (l) {
      return '<button data-act="lvl" data-l="' + l + '" class="' + (L === l ? 'on' : '') + '">' + esc(C.levels[l].naam) + '</button>';
    }).join('') + '</div>';

    var rows = kaart.onderdelen.map(function (o) {
      var on = !!checks[o.id];
      var spk = o.ko ? '<button class="speak" data-act="speak" data-ko="' + esc(o.ko) + '" aria-label="Spreek uit">' + ICON_SPEAK + '</button>' : '';
      var kr = (o.ko ? esc(o.ko) + ' · ' : '') + esc(o.roman);
      var link = o.link ? '<a class="btn ghost sm" href="' + o.link + '">' + esc(o.linkLabel || 'Oefen') + '</a>' : '';
      var det = onderByRow(o.id);
      var detail = '';
      if (det) {
        var tips = det.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
        detail = '<details class="exdet"><summary>Wat is dit &amp; waar let je op<span class="pl">+</span></summary>' +
          '<div class="exdet-b"><p>' + esc(det.uitleg) + '</p><ul class="ul">' + tips + '</ul></div></details>';
      }
      return '<div class="exrow' + (on ? ' on' : '') + '">' +
        '<button class="exchk" data-act="examchk" data-id="' + o.id + '" aria-label="Afvinken">' + (on ? ICON_CHECK : '') + '</button>' +
        '<div class="exmain">' +
          '<div class="exhd"><b>' + esc(o.nl) + '</b><span class="kr">' + kr + '</span>' + spk + '</div>' +
          '<p class="exeis">' + esc(o.eis) + '</p>' +
          detail +
          (link ? '<div class="exact">' + link + '</div>' : '') +
        '</div></div>';
    }).join('');

    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">Examen</span>' +
      '<h1 class="screen-title">Jouw examen in één beeld</h1>' +
      '<p class="screen-sub">Alle onderdelen die je laat zien voor je poom. Tik een onderdeel open voor uitleg, of vink af ' + iic(ICON_CHECK) + ' wat al goed gaat.</p>' +
      toggle +
      '<div class="exprog"><div class="quizbar"><i id="exbar" style="width:0%"></i></div>' +
        '<span>' + doneN + ' / ' + total + ' onderdelen afgevinkt</span></div>' +
      '<div class="exlist">' + rows + '</div>' +
      '<div class="notecard"><b>Slagen voor theorie:</b> ' + esc(kaart.slagen) + '.</div>' +
      '<div class="notecard">Oefen sparren, zelfverdediging en breektesten <b>altijd onder begeleiding</b> van je trainer. Deze kaart vertelt <b>wát</b> je laat zien — je trainer leert je <b>hoe</b>.</div>' +
      '</div></div>';
    requestAnimationFrame(function () { var el = document.getElementById('exbar'); if (el) el.style.width = pct + '%'; });
  }

  /* ---------- View: Bronnen & back-up ---------- */
  function viewBronnen() {
    var b = C.bronnen || { items: [] };
    var rows = (b.items || []).map(function (s) {
      return '<div class="srccard">' +
        '<div class="src-hd"><b>' + esc(s.titel) + '</b>' + (s.org ? '<span class="src-org">' + esc(s.org) + '</span>' : '') + '</div>' +
        '<p class="src-wat">' + esc(s.wat) + '</p>' +
        (s.url ? '<a class="src-link" href="' + esc(s.url) + '" target="_blank" rel="noopener">Open officiële bron ↗</a>' : '') +
        '</div>';
    }).join('');
    view.innerHTML = '<div class="view active"><div class="screen">' +
      '<span class="secnum">Bronnen</span>' +
      '<h1 class="screen-title">Bronnen &amp; verantwoording</h1>' +
      '<p class="screen-sub">' + esc(b.gecontroleerd || '') + ' ' + esc(b.disclaimer || '') + '</p>' +
      '<div class="srclist">' + rows + '</div>' +
      '<div class="sect"><h4>Back-up &amp; herstel</h4></div>' +
      '<div class="notecard">Je voortgang (streak, dagdoelen, moeilijke termen) staat alleen op dit toestel. ' +
        'Maak af en toe een back-up — handig als je de app opnieuw op je beginscherm zet.</div>' +
      '<div class="cctrl">' +
        '<button class="btn primary" data-act="backupCopy">Back-up kopiëren</button>' +
        '<button class="btn ghost" data-act="backupRestore">Herstellen</button>' +
      '</div>' +
      '<textarea class="backupbox" id="backupbox" placeholder="Plak hier je back-upcode om te herstellen…" spellcheck="false"></textarea>' +
      '</div></div>';
  }

  /* ---------- View: Teller (Koreaans 1–10) ---------- */
  function tellCounts() { var g = C.termen.filter(function (x) { return /Tellen/.test(x.groep); })[0]; return g ? g.items : []; }
  var tellAudio = null;
  function beep(freq, dur) {
    try {
      if (!tellAudio) tellAudio = new (window.AudioContext || window.webkitAudioContext)();
      if (tellAudio.state === 'suspended') tellAudio.resume();
      var t = tellAudio.currentTime, d = dur || 0.12;
      var o = tellAudio.createOscillator(), g = tellAudio.createGain();
      o.type = 'sine'; o.frequency.value = freq || 620;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.22, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(tellAudio.destination);
      o.start(t); o.stop(t + d + 0.02);
    } catch (e) {}
  }
  function tellSet(numTxt, c, activeIdx) {
    var n = document.getElementById('cnum'), k = document.getElementById('cko');
    if (n) n.textContent = numTxt;
    if (k) k.textContent = c ? (c.msg ? c.msg : nativeRoman(c)) : '';
  }
  function tellSetPlaying(on) {
    var b = document.getElementById('cplaybtn');
    if (b) { b.innerHTML = on ? ICON_PAUSE : ICON_PLAY; b.setAttribute('aria-label', on ? 'Pauze' : 'Start'); }
    var card = document.getElementById('ccard');
    if (card) card.classList.toggle('running', on);
  }
  function tellStep() {
    var counts = tellCounts(); if (!counts.length) return;
    if (tellerIdx >= counts.length) {
      if (tellerLoop) { tellerIdx = 0; }
      else { tellerPause(); tellSet('✓', { msg: 'Klaar!' }, -1); tellerIdx = 0; tellSetPlaying(false); return; }
    }
    var c = counts[tellerIdx];
    tellSet(String(tellerIdx + 1), c, tellerIdx);
    speak(c.ko);
    tellerIdx++;
  }
  function tellArm() {
    if (tellerTimer) clearInterval(tellerTimer);
    tellerTimer = setInterval(tellStep, Math.round(1000 / tellerSpeed));
  }
  function tellerPause() {
    tellerRunning = false;
    if (tellerTimer) { clearInterval(tellerTimer); tellerTimer = null; }
    if (tellerPrep) { clearInterval(tellerPrep); tellerPrep = null; }
    var card = document.getElementById('ccard'); if (card) card.classList.remove('prep');
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }
  function tellerStartCountdown() {
    var n = 3;
    tellSetPlaying(true);
    var card = document.getElementById('ccard'); if (card) card.classList.add('prep');
    tellSet(String(n), { msg: 'Junbi / Klaarstaan' }, -1);
    beep(620, 0.12);
    var iv = Math.min(Math.round(1000 / tellerSpeed), 850);
    tellerPrep = setInterval(function () {
      n--;
      if (n <= 0) {
        clearInterval(tellerPrep); tellerPrep = null;
        if (card) card.classList.remove('prep');
        beep(920, 0.16);
        tellStep(); tellArm();
      } else {
        tellSet(String(n), { msg: 'Junbi / Klaarstaan' }, -1);
        beep(620, 0.12);
      }
    }, iv);
  }
  function tellerToggle() {
    if (!tellCounts().length) return;
    if (tellerRunning) { tellerPause(); tellSetPlaying(false); return; }
    tellerRunning = true;
    tellerStartCountdown();
  }
  function tellerReset() {
    tellerPause(); tellerIdx = 0;
    var n = document.getElementById('cnum'), k = document.getElementById('cko');
    if (n) n.textContent = '';
    if (k) k.textContent = 'Tik om te starten';
    tellSetPlaying(false);
  }
  function tellerSetSpeed(v) {
    tellerSpeed = v;
    var seg = document.getElementById('cspeed');
    if (seg) {
      var btns = seg.querySelectorAll('button');
      for (var i = 0; i < btns.length; i++) {
        var on = parseFloat(btns[i].getAttribute('data-v')) === v;
        btns[i].classList.toggle('on', on);
        btns[i].setAttribute('aria-pressed', on);
      }
    }
    if (tellerRunning) tellArm();
  }
  function tellerToggleLoop() {
    tellerLoop = !tellerLoop;
    var b = document.getElementById('cloopbtn');
    if (b) { b.classList.toggle('on', tellerLoop); b.setAttribute('aria-pressed', tellerLoop); }
  }
  function viewTeller() {
    tellerIdx = 0; tellerRunning = false;
    view.innerHTML = '<div class="view active"><div class="tellerpage">' +
      '<button class="ccard" id="ccard" data-act="tellerToggle" aria-label="Start">' +
        '<div class="cnum" id="cnum"></div>' +
        '<div class="cko" id="cko">Tik om te starten</div>' +
      '</button>' +
      '<div class="tp-speed" id="cspeed" role="group" aria-label="Tempo">' +
        '<span class="tp-speed-lab">Tempo</span>' +
        '<div class="segctrl">' +
        SPEEDS.map(function (v) {
          return '<button class="' + (v === tellerSpeed ? 'on' : '') + '" data-act="tellerSpeed" data-v="' + v + '" aria-pressed="' + (v === tellerSpeed) + '">' + fmtSpeed(v) + '</button>';
        }).join('') +
        '</div>' +
      '</div>' +
      '<div class="transport">' +
        '<button class="tbtn" data-act="tellerReset" aria-label="Opnieuw" title="Opnieuw">' + ICON_RESET + '</button>' +
        '<button class="tbtn play" id="cplaybtn" data-act="tellerToggle" aria-label="Start">' + ICON_PLAY + '</button>' +
        '<button class="tbtn" id="cloopbtn" data-act="tellerLoop" aria-pressed="false" aria-label="Blijf herhalen" title="Blijf herhalen">' + ICON_REPEAT + '</button>' +
      '</div>' +
      '</div></div>';
    tellSetPlaying(false);
  }

  /* ---------- View: Flashcards (termen) ---------- */
  function allTerms() { var a = []; C.termen.forEach(function (g) { g.items.forEach(function (i) { a.push(i); }); }); return a; }
  function viewFlash() {
    var hard = shuffle(hardTermList());
    var rest = shuffle(allTerms().filter(function (t) { return !isHard(t); }));
    flashState = { cards: hard.concat(rest).slice(0, 10), i: 0, flipped: false, knew: 0 };
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
      '<div class="flashbar"><i id="fbar" style="width:' + (s.prevPct || 0) + '%"></i></div>' +
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
    var fpct = s.i / s.cards.length * 100; s.prevPct = fpct;
    requestAnimationFrame(function () { var el = document.getElementById('fbar'); if (el) el.style.width = fpct + '%'; });
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
  var FACE = '<g stroke="#AEB6C2" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M32 4v9M28.6 7.4 32 4l3.4 3.4"/></g>';
  function stanceSVG(roman) {
    var r = String(roman).toLowerCase(), s, face = true;
    if (r.indexOf('moa') >= 0) { s = sfoot(27, 33, 0, false, 'ink') + sfoot(37, 33, 0, true, 'ink'); face = false; }
    else if (r.indexOf('naranhi') >= 0) { s = sfoot(22, 33, 0, false, 'ink') + sfoot(42, 33, 0, true, 'ink'); face = false; }
    else if (r.indexOf('ap seogi') >= 0) s = sfoot(25, 46, 0, false, 'ink') + sfoot(39, 22, 0, true, 'ink');
    else if (r.indexOf('ap kubi') >= 0) s = sfoot(23, 47, 28, false, 'out') + sfoot(42, 18, 0, true, 'red');
    else if (r.indexOf('dwit') >= 0) s = sfoot(38, 18, 0, false, 'out') + sfoot(28, 46, 90, true, 'red');
    else if (r.indexOf('beom') >= 0) s = sfoot(30, 46, 0, false, 'red') + sfoot(34, 25, 0, true, 'out');
    else if (r.indexOf('koa') >= 0) s = sfoot(29, 44, 0, false, 'red') + sfoot(36, 31, 64, true, 'out');
    else if (r.indexOf('hakdari') >= 0 || r.indexOf('haktari') >= 0) s = sfoot(31, 47, 0, false, 'red') + sfoot(35, 29, 90, true, 'out');
    else if (r.indexOf('juchum') >= 0) { s = sfoot(20, 33, 0, false, 'ink') + sfoot(44, 33, 0, true, 'ink'); face = false; }
    else { s = sfoot(27, 33, 0, false, 'ink') + sfoot(37, 33, 0, true, 'ink'); face = false; }
    return '<svg viewBox="0 0 64 64" width="58" height="58" aria-hidden="true"><rect width="64" height="64" rx="15" fill="#EEF1F6"/>' + (face ? FACE : '') + s + '</svg>';
  }


  function svgCircle() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9" stroke-linecap="round"/></svg>'; }
  function svgBolt() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3L5 13h6l-1 8 9-11h-6z"/></svg>'; }
  function svgChat() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11h-9l-4 4v-4H4z"/></svg>'; }
  function svgQuiz() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3-5 3V6a2 2 0 0 1 2-2z"/><path d="M9.5 9.5l1.8 1.8 3.2-3.4"/></svg>'; }
  function svgBook() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h10v16H6a2 2 0 0 0-2 2z"/><path d="M16 3h2a2 2 0 0 1 2 2v14"/></svg>'; }
  function feetMini() { return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.249 3.224a.75.75 0 0 0-.774-.724.75.75 0 0 0-.725.776zM5.114 18.53l-.738.13zM3.77 6.512a.75.75 0 0 0-.868-.608.75.75 0 0 0-.61.87zm2.298-1.369a.75.75 0 0 0-.868-.607.75.75 0 0 0-.61.87zM4.753 6.338l.13.738 1.477-.262-.13-.738zM8.446 4.24a.75.75 0 0 0-.868-.608.75.75 0 0 0-.609.87zM7.133 5.435l.13.739 1.476-.262-.13-.739zM10.5 3.25l-.75.026v.008l.013.464c.008.296.017.71.023 1.183a53 53 0 0 1-.035 3.032L10.5 8l.748.037c.05-.965.049-2.172.037-3.128a96 96 0 0 0-.035-1.651v-.032l-.001-.002zm0 4.75-.75-.037c-.04.808-.362 1.526-.709 2.585-.33 1.011-.619 2.198-.363 3.656l.738-.13.739-.131c-.194-1.106.012-2.016.311-2.93.284-.867.728-1.904.782-2.976zm-1.084 6.073-.738.131c.18 1.033.413 1.6.63 2.083.2.446.349.747.453 1.344l.739-.131.738-.13c-.14-.803-.365-1.259-.562-1.699-.18-.403-.367-.85-.521-1.728zM10.5 17.5l-.739.13a2.24 2.24 0 0 1-.283 1.562c-.275.44-.756.82-1.542.96l.13.738.13.739c1.183-.21 2.042-.826 2.553-1.644.5-.802.64-1.754.49-2.616zm-2.434 3.39-.13-.739c-.664.118-1.124-.141-1.473-.542-.376-.43-.57-.978-.61-1.21l-.739.13-.738.132c.082.467.38 1.274.956 1.936.604.692 1.559 1.263 2.863 1.032zm-2.952-2.36.739-.131-1.594-9.09-.739.13-.738.132 1.594 9.09zM3.52 9.44l.739-.131-.49-2.797-.739.131-.738.131.49 2.797zm1.808-4.166-.738.131.163.933.739-.131.738-.131-.163-.933zm2.38-.902-.739.13.164.933.738-.131.739-.131-.164-.932zm5.043-1.124a.75.75 0 1 1 1.5.002zm6.115 15.292.739.13zm1.36-12.029a.75.75 0 0 1 1.477.26zm-2.298-1.367a.75.75 0 1 1 1.477.26zm1.313 1.193-.13.739-1.477-.26.13-.74zm-3.692-2.094a.75.75 0 1 1 1.477.26zm1.312 1.194-.13.738-1.477-.26.13-.739zm-3.36-2.188.75.001V8h-1.5V3.248zm0 4.75h.75c0 .781.31 1.491.664 2.548.337 1.006.65 2.201.39 3.669l-.738-.13-.739-.131c.194-1.1-.026-2.008-.336-2.932-.293-.876-.742-1.925-.742-3.023zm1.066 6.086.739.13c-.182 1.031-.41 1.594-.62 2.072-.195.442-.341.742-.447 1.343l-.739-.13-.739-.13c.141-.8.36-1.25.552-1.688.177-.4.36-.845.515-1.727zM13.5 17.5l.739.13c-.096.542-.006 1.117.275 1.577.27.442.745.823 1.527.96l-.13.74-.13.738c-1.189-.21-2.043-.832-2.547-1.655-.493-.807-.624-1.761-.473-2.62zm2.41 3.407.13-.74c.665.118 1.126-.142 1.476-.544.376-.431.57-.98.612-1.212l.738.13.739.13c-.082.467-.381 1.276-.959 1.938-.605.694-1.56 1.266-2.866 1.036zm2.956-2.366-.738-.13 1.604-9.1.739.13.738.131-1.604 9.1zm1.605-9.1-.739-.13.494-2.799.738.13.739.13-.494 2.8zm-1.804-4.166.738.13-.164.933-.739-.13-.738-.13.164-.933zm-2.38-.9.739.13-.165.933-.738-.13-.739-.13.165-.934z"/></svg>'; }
  function svgExam() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9.5 12l2 2 3.5-4"/></svg>'; }
  function svgTimer() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6"/><path d="M12 8v6l4 2"/><circle cx="12" cy="14" r="8"/></svg>'; }
  function svgCard() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h4M7 13h7"/><path d="M15.5 8.5l1.4 1.4 2.6-2.8"/></svg>'; }

  /* ---------- Event-delegatie ---------- */
  view.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'speak') speak(b.getAttribute('data-ko'), b);
    else if (act === 'poom') location.hash = '#/poomsae/' + b.getAttribute('data-id');
    else if (act === 'back') location.hash = '#/poomsae';
    else if (act === 'seg') { location.hash = '#/techniek/' + b.getAttribute('data-k'); }
    else if (act === 'lvl') {
      var l = b.getAttribute('data-l');
      if (prog.level !== l) { prog.level = l; save(prog); toast('Niveau: ' + C.levels[l].naam); go(); }
    }
    else if (act === 'examchk') {
      var eid = b.getAttribute('data-id'), ch = examChecks();
      ch[eid] = !ch[eid]; save(prog);
      toast(ch[eid] ? 'Afgevinkt ✓' : 'Vinkje gewist');
      viewExamenkaart();
    }
    else if (act === 'goal') {
      var g = b.getAttribute('data-g');
      location.hash = g === 'quiz' ? '#/quiz' : g === 'flash' ? '#/flash' : '#/poomsae';
    }
    else if (act === 'togglepoom') {
      var id = b.getAttribute('data-id');
      var dd = daily();
      var nowOn = !dd.practiced[id];
      if (nowOn) dd.practiced[id] = true; else delete dd.practiced[id];
      save(prog);
      toast(nowOn ? 'Gemarkeerd als geoefend ✓' : 'Markering gewist');
      if (nowOn) checkDaily();
      viewPoomDetail(id); refreshStreak();
      if (nowOn && !prefersReduce()) {
        var mb = view.querySelector('[data-act="togglepoom"]'); if (mb) mb.classList.add('justdone');
        var tg = view.querySelector('.detail-head .tg'); if (tg) tg.classList.add('tgpop');
      }
    }
    else if (act === 'video') {
      var v = b.getAttribute('data-v');
      b.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v + '?rel=0&modestbranding=1&autoplay=1" title="Poomsae-video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      b.classList.add('playing'); b.removeAttribute('data-act');
    }
    else if (act === 'tellerToggle') tellerToggle();
    else if (act === 'tellerReset') tellerReset();
    else if (act === 'tellerSpeed') tellerSetSpeed(parseFloat(b.getAttribute('data-v')));
    else if (act === 'tellerLoop') tellerToggleLoop();
    else if (act === 'backupCopy') doBackupCopy();
    else if (act === 'backupRestore') doBackupRestore();
    else if (act === 'flashflip') { flashState.flipped = !flashState.flipped; b.classList.toggle('flip', flashState.flipped); }
    else if (act === 'flashnext') {
      var knewC = b.getAttribute('data-k') === '1';
      if (knewC && !prefersReduce()) {
        var fc = view.querySelector('.flashcard');
        if (fc) { pop(fc, 'knew'); setTimeout(function () { flashNext(true); }, 230); return; }
      }
      flashNext(knewC);
    }
    else if (act === 'flashretry') viewFlash();
    else if (act === 'flashexit') location.hash = '#/home';
    else if (act === 'qopt') answerQuiz(+b.getAttribute('data-i'));
    else if (act === 'qnext') { quizState.i++; quizState.answered = false; renderQuiz(); }
    else if (act === 'qretry') viewQuiz();
    else if (act === 'termtab') { termTab = b.getAttribute('data-k'); renderTermTabs(); renderTermTab(); }
    else if (act === 'hardterm') {
      var hk = b.getAttribute('data-k');
      var on = toggleHard(hk);
      toast(on ? 'Bewaard als moeilijk' : 'Markering verwijderd');
      var inTermen = !!document.getElementById('termtabs');
      if (inTermen && termTab === 'hard') { renderTermTabs(); renderTermTab(); }
      else {
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on);
        var row = b.closest('.trow, .stance'); if (row) row.classList.toggle('hard', on);
        if (inTermen) renderTermTabs();
        if (on) pop(b, 'pop');
      }
    }
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

  /* ---------- Swipe tussen tabbladen ---------- */
  (function () {
    var TABS = ['home', 'poomsae', 'techniek', 'termen', 'teller'];
    var sx = 0, sy = 0, tracking = false;
    view.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { tracking = false; return; }
      tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    view.addEventListener('touchend', function (e) {
      if (!tracking) return; tracking = false;
      var t = e.changedTouches[0]; var dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 2) return;
      var seg = parse(); var r = seg[0];
      var i = TABS.indexOf(r); if (i < 0) return;
      if (r === 'poomsae' && seg.length > 1) return;
      var j = dx < 0 ? i + 1 : i - 1;
      if (j < 0 || j >= TABS.length) return;
      location.hash = '#/' + TABS[j];
    }, { passive: true });
  })();

  /* ---------- Start ---------- */
  function setAppbarH() {
    var ab = document.querySelector('.appbar');
    if (ab) document.documentElement.style.setProperty('--appbar-h', Math.round(ab.getBoundingClientRect().height) + 'px');
  }
  setAppbarH();
  window.addEventListener('resize', setAppbarH);
  window.addEventListener('load', setAppbarH);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setAppbarH);
  window.addEventListener('hashchange', go);
  if (!location.hash) location.replace('#/home');
  go();
})();
