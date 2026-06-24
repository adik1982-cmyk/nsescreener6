const CACHE = 'nse-intraday-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
self.addEventListener('push', e => { const d=e.data?e.data.json():{};e.waitUntil(self.registration.showNotification(d.title||'NSE Alert',{body:d.body,icon:'./icons/icon-192.png',tag:'nse',renotify:true})); });
self.addEventListener('message', e => { if(e.data?.type==='SCHEDULE_NOTIFICATION'){const{title,body,delay}=e.data;setTimeout(()=>self.registration.showNotification(title,{body,icon:'./icons/icon-192.png',tag:'nse',renotify:true}),delay);} });
