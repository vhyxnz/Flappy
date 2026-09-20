const CACHE='flappy-v8';
const CORE=[
  './','./index.html','./game.css','./game.js','./manifest.webmanifest',
  './logo.png','./bird-up.png','./bird-mid.png','./bird-down.png',
  './bird-berry-up.png','./bird-berry-mid.png','./bird-berry-down.png',
  './bird-aqua-up.png','./bird-aqua-mid.png','./bird-aqua-down.png',
  './bird-ember-up.png','./bird-ember-mid.png','./bird-ember-down.png',
  './icon-180.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;
  }).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):undefined)));
});
