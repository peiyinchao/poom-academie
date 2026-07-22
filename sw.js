/* ============================================================
   Mijn Poom Academie — Service Worker (offline-first)
   Verhoog CACHE bij elke inhoud-/codewijziging om te verversen.
   ============================================================ */
var CACHE = 'poom-v18';

/* Kern-schil die vooraf wordt gecachet (rest volgt tijdens gebruik). */
var PRECACHE = [
  './',
  './index.html',
  './app.css',
  './app.js',
  './data/curriculum.js',
  './manifest.webmanifest',
  './mark-taeguk.svg',
  './icon-taeguk-dark.svg',
  './fonts/inter.css',
  './fonts/poster.css',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Individueel toevoegen zodat één ontbrekend bestand de installatie niet breekt.
      return Promise.all(PRECACHE.map(function (u) {
        return c.add(u).catch(function () { /* negeer ontbrekende */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // alles is lokaal

  // Navigaties: probeer netwerk, val terug op gecachte app-schil (offline).
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(function () {
        return caches.match('./index.html');
      })
    );
    return;
  }

  // Overig: cache-first, daarna netwerk (en runtime cachen).
  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
    })
  );
});
