self.addEventListener('install', event => {
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
});

self.addEventListener('activate', event => {
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
});

self.addEventListener('fetch', event => {
    console.log(`Fetching ${event.request.url}`);
    // get the requested resource from the network
    event.respondWith(fetch(event.request));
});