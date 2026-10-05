// Copia de la aplicación para que abra sin conexión.
// La página se pide primero a la red (así llegan las actualizaciones) y, si no hay red, se usa la copia.
const CACHE = 'economato-v2';
const BASE = ['/', '/manifest.webmanifest', '/iconos/icono-192.png', '/iconos/icono-512.png', '/iconos/apple-touch-icon.png', '/iconos/favicon-32.png'];
const FIJOS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET') return;
  if (u.origin === location.origin) {
    e.respondWith(fetch(r).then(res => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r.mode === 'navigate' ? '/' : r, copia)); }
      return res;
    }).catch(() => caches.match(r.mode === 'navigate' ? '/' : r)));
  } else if (FIJOS.includes(u.hostname)) {
    e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => {
      if (res.ok || res.type === 'opaque') { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r, copia)); }
      return res;
    })));
  }
});
