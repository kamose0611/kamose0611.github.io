// キャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/kamose0611.github.io/',
];

// インストール処理
self.addEventListener('install', function(event) {
    console.log('sw event: install called');
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    console.log('sw event: fetch called');
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});

self.addEventListener('push', function(event){
    console.log('sw event: push called');
  
    var notificationDataObj = event.data.json();
    var content = {
      body: notificationDataObj.body,
    };
    event.waitUntil(
      self.registration.showNotification(notificationDataObj.title, content)
    );
  });