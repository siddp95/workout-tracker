// Bump this version string whenever you push an update.
// Changing it triggers the browser to install the new SW and
// replace the old cache — that's how installed users get updates.
const CACHE_VERSION = 'itrain-v4';

const CORE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png'
];

// --- Install: pre-cache core files ---
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(CORE_FILES))
  );
  // Activate immediately — don't wait for old tabs to close
  self.skipWaiting();
});

// --- Activate: delete stale caches ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// --- Fetch: cache-first, fall back to network ---
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin resources
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Don't cache cross-origin requests (e.g. Google Fonts)
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(event.request, toCache));
        return response;
      });
    })
  );
});
