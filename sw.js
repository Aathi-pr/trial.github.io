const PWA_CACHE = 'fruitso-v1';
const PWA_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/assets/img/img.jpeg',
  '/assets/img/images.jpeg',
  '/assets/img/home.png',
  '/assets/img/form.png',
  '/assets/img/product.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  '/assets/img/favicon-modified.png',
  '/assets/favicon-modified.png',
  '/manifest.json'
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PWA_CACHE)
      .then((cache) => {
        console.log("Caching resources...");
        return cache.addAll(PWA_URLS);
      })
      .catch((error) => {
        console.error("Failed to cache resources:", error);
      }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
      }),
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});