self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./",
                                    "style.css",
                                    "auto.js",
                                    "canvasButton.js",
                                    "constant.js",
                                    "event.js",
                                    "field.js",
                                    "live.js",
                                    "post.js",
                                    "pre.js",
                                    "script.js"]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});