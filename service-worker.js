self.addEventListener('install',()=>{console.log('SW instalado');});
self.addEventListener('activate',()=>{console.log('SW ativo');});
self.addEventListener('notificationclick', event=>{
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(clientsArr=>{
      for(const client of clientsArr){if(client.url===url && 'focus' in client) return client.focus();}
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});
