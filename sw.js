const CACHE_NAME = 'hash-ai-v1.0.1';
const ASSETS = [
  './index.html',
  './icon.png',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Google+Sans:wght@400;500;700&family=Orbitron:wght@700&family=Lora:wght@400;500;700&display=swap',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install: Assets ko cache mein save karna
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Fetch: Agar net na ho, to cache se load karna
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// Activate: Purani cache ko delete karna
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => k !== CACHE_NAME ? caches.delete(k) : null)
    ))
  );
});
