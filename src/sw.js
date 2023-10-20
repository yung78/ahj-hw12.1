// import { precacheAndRoute } from 'workbox-precaching';

// precacheAndRoute(self.__WB_MANIFEST);

const FETCH_PRIORITY_URLS = ['/', '/index.html'];

self.addEventListener('install', (event) => {
  console.log('Установлен');

  event.waitUntil(
    caches.open('my-page-cache')
      .then((cache) => {
        cache.addAll([
          './',
          './index.html',
          'https://third-project.onrender.com/css/cacheStyle.css',
          'https://third-project.onrender.com/img/cache.jpg',
        ]);
      }),
  );
});

async function cacheThenFetch(e) {
  const cacheResponse = await caches.match(e.request);

  if (cacheResponse) {
    return cacheResponse;
  }

  const cache = await caches.open('my-page-cache');

  cache.addAll([
    './',
    './index.html',
    'https://third-project.onrender.com/css/cacheStyle.css',
    'https://third-project.onrender.com/img/cache.jpg',
  ]);
  return fetch(e.request);
}

async function cacheThenFetchImg(e) {
  const cacheResponse = await caches.match(e.request);

  if (cacheResponse) {
    return cacheResponse;
  }
  return await caches.match('https://third-project.onrender.com/img/cache.jpg');
}

async function cacheThenFetchCss(e) {
  const cacheResponse = await caches.match(e.request);

  if (cacheResponse) {
    return cacheResponse;
  }
  return await caches.match('https://third-project.onrender.com/css/cacheStyle.css');
}

async function fetchThenCache(e) {
  let response;

  try {
    response = await fetch(e.request);
    console.log('response from server');
  } catch (err) {
    return console.log(err);
  }

  const cache = await caches.open('my-page-cache');

  cache.addAll([
    './',
    './index.html',
    'https://third-project.onrender.com/css/cacheStyle.css',
    'https://third-project.onrender.com/img/cache.jpg',
  ]);

  return response;
}

// self.addEventListener('fetch', (e) => {
//   console.log('Происходит запрос на сервер');

//   const url = new URL(e.request.url);

//   if (FETCH_PRIORITY_URLS.includes(url.pathname)) {
//     e.respondWith(cacheThenFetch(e));
//   }

//   if (url.pathname.startsWith('http://localhost:7070/img')) {
//     e.respondWith(cacheThenFetchImg(e));

//     return;
//   }

//   if (url.pathname.startsWith('http://localhost:7070/css')) {
//     e.respondWith(cacheThenFetchCss(e));
//   }
// });

self.addEventListener('fetch', (e) => {
  console.log('Происходит запрос на сервер 2');
  e.respondWith(fetchThenCache(e));
});







// Установка таймера на выполнение сетевого запроса

// В следующем примере мы пытаемся вернуть ответ из сети. Если запрос выполняется дольше 3 секунд, возвращается ответ из кэша:


// import { registerRoute } from 'workbox-routing'
// import { NetworkFirst } from 'workbox-strategies'
// import { ExpirationPlugin } from 'workbox-expiration'

// registerRoute(
//   ({ url }) => url.origin === 'https://hacker-news.firebaseio.com',
//   new NetworkFirst({
//     networkTimeoutSeconds: 3,
//     cacheName: 'stories',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 5 * 60 // 5 минут
//       })
//     ]
//   })
// )
