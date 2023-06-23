const CACHE_NAME = "Mis_pelis_app",
urlCache= [
    '',
    './index.html',
    './trailers.html',
    './favoritos.html',

    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',

    './estilos/estilos.css',

    './img/icon-512.png',
    './img/icon.png',

    './js/movies.js',
    './js/favoritos.js',
    './js/trailer.js',
    './js/serviceWorker.js',
    './js/script.js'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(cacheFiles);
        })
    );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (cacheName !== CACHE_NAME) {
                return caches.delete(cacheName);
              }
            })
          );
        })
    );
  });

// Intercepción de solicitudes y gestión de la caché
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  });

