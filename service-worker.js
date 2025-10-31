// service-worker.js

self.addEventListener('install', event => {
  console.log('Service Worker instalado.');
});

self.addEventListener('activate', event => {
  console.log('Service Worker ativo.');
});

// Quando a notificação for clicada
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
