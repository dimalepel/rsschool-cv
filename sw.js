const staticCacheName = 'site-static-v4';
const assetsUrl = [
  './index.html',
  './styles/styles.min.css',
  './scripts/highlight.min.js',
  './scripts/scripts.js'
];

// Event install
self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetsUrl);
});

// Event activate
self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .map(name => caches.delete(name))
  );
});

// Event fetch
self.addEventListener('fetch', event => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? await fetch(request);
}