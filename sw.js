const CACHE_NAME = 'hash-ai-v1.1.1'; // <-- Jab bhi index.html badlein, yeh version zaroor badlein!
const ASSETS = [
  './index.html',
  './icon.png',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Google+Sans:wght@400;500;700&family=Orbitron:wght@700&family=Lora:wght@400;500;700&display=swap',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  // Naye service worker ko foran install hone par waiting state mein le jana
  self.skipWaiting();
});

// Activate Event: Purani cache ko delete karna
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// Message Event: Jab user alert par click kare to naya SW activate ho jaye
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
