
    // serviceworker script, should be refactored in a different file in the future.
    // does the browser support service workers?
    if ('serviceWorker' in navigator) {
      // fires when the service worker is ready
      navigator.serviceWorker.ready.then(reg => {
        // we have an active service worker working for us
        console.log(`Service Worker ready (Scope: ${reg.scope})`);
        // do something interesting, if you want...
      });
      // then register our service worker
      navigator.serviceWorker.register('./sw.js')
        .then(function (reg) {
          // display a success message
          console.log(`Service Worker Registration (Scope: ${reg.scope})`);
        })
        .catch(function (error) {
          // display an error message
          console.log(`Service Worker Error (${error})`);
        });
    } else {
      // happens when the app isn't served over a TLS connection (HTTPS)
      console.warn('Service Worker not available');
    }
    
 
