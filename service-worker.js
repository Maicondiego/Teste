// service-worker.js

self.addEventListener('install', () => {
  console.log('Service Worker instalado.');
});

self.addEventListener('activate', () => {
  console.log('Service Worker ativo.');
});

// Quando clicar na notificação
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
