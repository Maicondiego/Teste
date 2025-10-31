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
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(clientsArr => {
      for(const client of clientsArr){
        if(client.url === url && 'focus' in client) return client.focus();
      }
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});
