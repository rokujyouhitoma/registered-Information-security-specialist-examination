const CACHE_NAME = 'sc-exam-cache-v2';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './search.html',
  './compiled.html',
  './search_index.json',
  './data/synonyms.json',
  './data/concept_config.json',
  './fm_index_engine.min.js',
  './js/tokenizer.js',
  './js/synonym_expander.js',
  './js/semantic_scorer.js',
  './js/vector_scorer.js',
  './js/fm_index_engine.js',
  './js/search_worker.js'
];

// インストール時にコア静的ファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// キャッシュのクリーンアップ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ネットワーク優先 ＆ オフライン時キャッシュフォールバック
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
