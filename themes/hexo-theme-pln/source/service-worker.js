// Choose a cache name
const cacheName = 'gaoryrt.com.101';
// List the files to precache
const precacheResources = ['/', '/css/m.min.css', '/js/zoom-image.js'];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  var cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }),
  );
});
