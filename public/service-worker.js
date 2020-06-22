const cacheName = 'v1';

const cacheAssets = [
  'index.html', 'index.js', '/js/main.js', '/icons/icon-192x192.png', '/icons/icon-512x512.png'
];

// Setting event listener for install
self.addEventListener('install', evt => {
  console.log('Files were pre-cached successfully!');
  evt.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
     console.log('Service Worker: Caching now!');
      cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

 // Setting event listener for activate
 self.addEventListener('activate', evt => {
  console.log('Service Worker activated!');
   evt.waitUntil(
   caches.keys().then(cacheNames => {
       return Promise.all(
        cacheNames.map(cache => {
           if (cache !== cacheName) {
             console.log('Removing old cache data');
             return caches.delete(cache);
           }
         })
       );
     })
   );
  //  self.clients.claim();
 });

// Setting event listener for fetch
self.addEventListener('fetch', evt => {
 console.log('Service worker fetching!');
 evt.respondWith(
  fetch(evt.request).catch(() => caches.match(evt.request))
)
});

