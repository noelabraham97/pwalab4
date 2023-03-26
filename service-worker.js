//Fetch event
self, addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});

//Service worker Installation
self.addEventListener('install', function (event) {
    console.log('Install service worker: ', event);
    event.waitUntil(
        caches.open('cache')
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/musicApp.html',
                    '/js/musicApp.js',
                    '/css/main.css'

                ]);
            })
    )
}
);

//Service worker Activation    
self.addEventListener('activate', function (event) {
    console.log('Activate service worker: ', event);
    event.waitUntil(clients.claim());
});

// Notification on the service worker
self.addEventListener('notificationclick', function (event) {
    const action = event.action;
    const notification = event.notification;
    const data = notification.data;
    console.log('Data:', data);

    switch (action) {
        case 'agree':
            console.log('agree!!!');
            clients.matchAll().then(function (clients) {
                clients.forEach(function (client) {
                    client.postMessage('agree');
                });
            });
            break;

        case 'disagree':
            console.log('disagree.');
            clients.matchAll().then(function (clients) {
                clients.forEach(function (client) {
                    client.postMessage('disagree');
                });
            });
            break;

        case '':
            console.log('Clicked on the notification.');
            const openPromise = clients.openWindow('/pages/add/');
            event.waitUntil(openPromise);
            break;
    }
}
);
