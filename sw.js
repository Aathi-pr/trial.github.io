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

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PWA_CACHE).then((cache) => cache.addAll(PWA_URLS))
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [PWA_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});