const CACHE_NAME = 'movie-edit-v1';
const ASSETS_TO_CACHE = ['./', './index.html', './manifest.json', './icon.svg'];

// インストール時に基本ファイルをスマホ内へ保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// ネットワーク優先（最新を取りに行き、圏外ならキャッシュを表示）
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
