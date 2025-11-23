self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
  // 기본적으로 네트워크 요청을 그대로 수행
  e.respondWith(fetch(e.request));
});
