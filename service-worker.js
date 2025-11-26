// service-worker.js

const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',            // 루트
  '/index.html',  // HTML
  '/main.js',     // JS
  '/styles.css',  // CSS
  '/icon.png'     // 아이콘
];

// 1️⃣ 설치: 캐싱 및 설치 완료 로그
self.addEventListener('install', event => {
  console.log('[Service Worker] 설치 중...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] 리소스 캐시 중...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] 설치 완료! 오프라인 준비 완료.');
        return self.skipWaiting(); // 설치 후 즉시 활성화
      })
  );
});

// 2️⃣ 활성화: 이전 캐시 정리
self.addEventListener('activate', event => {
  console.log('[Service Worker] 활성화됨');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 3️⃣ fetch 이벤트: 캐시 우선 전략 (오프라인 지원)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
