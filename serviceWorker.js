const CACHE_NAME = "mis_pelis_app_v1";

importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.0.0/workbox-sw.js'
);


// 
self.addEventListener('message', event => {
    if(event.data && event.data.type == "SKYP_WAITING"){
        self.skipWaiting();
    }
});

workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName:CACHE_NAME
    })
);
