const CACHE_NAME = 'sc-exam-cache-v2';
const PRECACHE_ASSETS = [
  './',
  './docs_index.html',
  './search.html',
  './search_index.json',
  './data/synonyms.json',
  './data/concept_config.json',
  './data/stopwords.json',
  './fm_index_engine.min.js',
  './js/security_validator.js',
  './js/tokenizer.js',
  './js/synonym_expander.js',
  './js/semantic_scorer.js',
  './js/vector_scorer.js',
  './js/fm_index_engine.js',
  './js/search_worker.js'
];

// インストール時にコア静的ファイルをキャッシュ (個別フェッチ例外抑止で堅牢化)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        PRECACHE_ASSETS.map((asset) =>
          cache.add(asset).catch((err) => {
            console.warn(`[SW] Failed to precache asset: ${asset}`, err);
          })
        )
      );
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
