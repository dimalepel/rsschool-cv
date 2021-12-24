const staticCacheName = 'site-static-v1';
const assetsUrl = [
  '/',
  '/index.html',
  '/styles/styles.min.css',
  '/scripts/scripts.js'
];

// Event install
self.addEventListener('install', async function () {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetsUrl);
});

// Event activate
self.addEventListener('activate', async function (event) {
  console.log('[SW]: activate');
});

// Event fetch
self.addEventListener('fetch', async function (event) {
  console.log('Fetch', event.request);
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? await fetch(request);
}