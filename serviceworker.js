console.log("I am a service worker!")
const url = ["/", "app.js", "styles.css"] // this is saying: when user opens the PWA, cache these assets

// This is known as: prefetching the assets!
globalThis.addEventListener("install", event => {
    caches.open("pwa").then(cache => {
        cache.addAll(url)
    })
})

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)  // searching in the cache
            .then( response => {
                if (response) {
                    // The request is in the cache 
                    return response; // cache hit
                } else {
                    // We need to go to the network  
                    return fetch(event.request);  // cache miss
                }
            })
    );
});

globalThis.addEventListener("fetch", event => {
    console.log("HTTP requested")
})