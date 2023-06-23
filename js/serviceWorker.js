const CACHE_NAME = "mis_pelis_app";
const urlCache = [
    '../',
    '../index.html',
    '../trailers.html',
    '../favoritos.html',

    '../estilos/estilos.css',

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
                return cache.addAll(urlCache);
            })
            .then(() => self.skipWaiting())
            .catch(error => console.log('Error al registrar el caché:', error))
    );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
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
