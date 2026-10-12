// ==========================================================================
// PIXEL ROOM WALLPAPER - SERVICE WORKER (100% ÇEVRİMDAŞI / OFFLINE CACHE)
// ==========================================================================

const CACHE_NAME = 'pixel-wallpaper-v4.1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=4.1',
  './app.js?v=4.1',
  './background.png',
  './binder_red.svg',
  './binder_green.svg',
  './binder_blue.svg',
  './books_stack.svg',
  './shelf_plant.svg',
  './shelf_clock.svg',
  './shelf_camera.svg',
  './shelf_wood.svg',
  './fonts/press-start-2p.ttf',
  './fonts/vt323.ttf',
  './LivelyInfo.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: false }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html') || caches.match('./');
        }
      });
    })
  );
});
