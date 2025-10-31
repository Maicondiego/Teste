<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Site de Notificação 1</title>
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #121212;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    button {
      margin: 10px;
      padding: 10px 20px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }

    #loginBtn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #28a745;
    }

    #adminArea {
      display: none;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
    }

    textarea {
      width: 300px;
      height: 100px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h2>Site de Notificação 1</h2>
  <button id="loginBtn">Logar</button>
  <button id="permBtn">Pedir permissão</button>
  <button id="testBtn">Testar</button>

  <div id="adminArea">
    <h3>Painel de envio</h3>
    <textarea id="msgText" placeholder="Escreva a mensagem da notificação..."></textarea><br>
    <button id="sendBtn">Enviar Notificação</button>
  </div>

  <script>
    // === CONFIGURAÇÃO DO FIREBASE ===
    const firebaseConfig = {
      apiKey: "AIzaSyCYa8tuJHf0JZ1ue6BZO6h-jTZCsPo7ze4",
  authDomain: "site-notificacao-1.firebaseapp.com",
  projectId: "site-notificacao-1",
  storageBucket: "site-notificacao-1.firebasestorage.app",
  messagingSenderId: "236195144349",
  appId: "1:236195144349:web:52f90a57f2f6e986bcaa74"
    };
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    // === PEDIR PERMISSÃO DE NOTIFICAÇÃO ===
    document.getElementById("permBtn").addEventListener("click", async () => {
      try {
        const perm = await Notification.requestPermission();
        if (perm === "granted") {
          const token = await messaging.getToken({
            vapidKey: "SUA_VAPID_KEY_AQUI"
          });
          console.log("Token:", token);
          alert("Permissão concedida! Token gerado.");
        } else {
          alert("Permissão negada para notificações.");
        }
      } catch (e) {
        console.error(e);
      }
    });

    // === TESTAR NOTIFICAÇÃO LOCAL ===
    document.getElementById("testBtn").addEventListener("click", () => {
      if (Notification.permission === "granted") {
        new Notification("Teste de notificação 🔔", {
          body: "Funcionou! 🚀",
          icon: "https://www.svgrepo.com/show/353655/notification-bell.svg"
        });
      } else {
        alert("Primeiro permita as notificações!");
      }
    });

    // === LOGIN ADMIN ===
    document.getElementById("loginBtn").addEventListener("click", () => {
      const nome = prompt("Nome:");
      const senha = prompt("Senha:");
      if (nome === "maicondiego" && senha === "2011") {
        document.getElementById("adminArea").style.display = "flex";
        alert("Login realizado com sucesso!");
      } else {
        alert("Nome ou senha incorretos!");
      }
    });

    // === ENVIAR NOTIFICAÇÃO VIA FIREBASE (ADMIN) ===
    document.getElementById("sendBtn").addEventListener("click", async () => {
      const texto = document.getElementById("msgText").value;
      if (!texto) return alert("Digite uma mensagem primeiro!");

      // Aqui normalmente você chamaria o servidor para mandar via FCM
      alert("Notificação enviada (simulação) com o texto: " + texto);
      // 👉 Para envio real, use um servidor com o Firebase Admin SDK para enviar aos tokens salvos.
    });

    // === RECEBER NOTIFICAÇÃO EM BACKGROUND ===
    messaging.onMessage((payload) => {
      console.log("Mensagem recebida:", payload);
      const { title, body, icon } = payload.notification;
      new Notification(title, { body, icon });
    });
  </script>
</body>
</html>
