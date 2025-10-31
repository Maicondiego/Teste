// service-worker.js

// Importa os scripts necessários do Firebase
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Configuração do Firebase (a mesma do HTML)
firebase.initializeApp({
 apiKey: "AIzaSyCYa8tuJHf0JZ1ue6BZO6h-jTZCsPo7ze4",
  authDomain: "site-notificacao-1.firebaseapp.com",
  projectId: "site-notificacao-1",
  storageBucket: "site-notificacao-1.firebasestorage.app",
  messagingSenderId: "236195144349",
  appId: "1:236195144349:web:52f90a57f2f6e986bcaa74"
});

// Inicializa o serviço de mensagens
const messaging = firebase.messaging();

// Escuta mensagens recebidas em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Mensagem recebida em segundo plano:", payload);

  const notificationTitle = payload.notification?.title || "Nova notificação";
  const notificationOptions = {
    body: payload.notification?.body || "Você recebeu uma nova mensagem!",
    icon: payload.notification?.icon || "https://www.svgrepo.com/show/353655/notification-bell.svg"
  };

  // Mostra a notificação
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Quando o usuário clicar na notificação
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://chatgpt.com/") // 👉 link de destino
  );
});
