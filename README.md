<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Notificação Boaa</title>
  <style>
    body {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #f3f4f6;
      margin: 0;
    }
    .card {
      background: white;
      padding: 28px;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(2,6,23,0.08);
      width: 360px;
      text-align: center;
    }
    h1 { margin: 0 0 12px; font-size: 20px; }
    p { margin: 0 0 18px; color: #444; }
    button {
      cursor: pointer;
      padding: 10px 16px;
      border-radius: 10px;
      border: 0;
      font-weight: 600;
    }
    .primary { background: #2563eb; color: white; }
    .muted { background: #e5e7eb; color: #111; margin-left: 8px; }
    #status { margin-top: 14px; font-size: 14px; color: #066; }
    #toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #111;
      color: #fff;
      padding: 10px 14px;
      border-radius: 8px;
      display: none;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Ativar notificações</h1>
    <p>Clique em “Pedir permissão” e aceite para receber a notificação <b>Boaa</b>.</p>

    <div>
      <button id="requestBtn" class="primary">Pedir permissão</button>
      <button id="testBtn" class="muted">Testar</button>
    </div>

    <div id="status">Status: <span id="perm">verificando...</span></div>
  </div>

  <div id="toast">Boaa ✨</div>

  <script>
    // 🔹 REGISTRA O SERVICE WORKER (necessário no Android/HTTPS)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('✅ Service Worker registrado com sucesso'))
        .catch(err => console.error('❌ Erro ao registrar SW:', err));
    }

    const requestBtn = document.getElementById('requestBtn');
    const testBtn = document.getElementById('testBtn');
    const permSpan = document.getElementById('perm');
    const toast = document.getElementById('toast');

    function showToast(msg, time = 2200) {
      toast.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => toast.style.display = 'none', time);
    }

    function updatePermissionStatus() {
      if (!('Notification' in window)) {
        permSpan.textContent = 'não suportado';
        showToast('Seu navegador não suporta notificações.');
        requestBtn.disabled = true;
        testBtn.disabled = true;
        return;
      }
      permSpan.textContent = Notification.permission;
      requestBtn.disabled = Notification.permission === 'granted';
    }

    updatePermissionStatus();

    function showBoaaNotification() {
      if (!('Notification' in window)) return showToast('Sem suporte.');

      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification('Boaa ✨', {
            body: 'Você aceitou as notificações!',
            icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
            vibrate: [200, 100, 200],
            tag: 'boaa-tag'
          });
        });
        showToast('Boaa ✨');
      } else if (Notification.permission === 'denied') {
        showToast('Permissão negada. Vá nas configurações e permita.');
      } else {
        showToast('Peça permissão primeiro.');
      }
    }

    async function askPermission() {
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        showToast('⚠️ Use HTTPS ou localhost para funcionar.');
        return;
      }

      try {
        const result = await Notification.requestPermission();
        updatePermissionStatus();
        if (result === 'granted') {
          showBoaaNotification();
        } else if (result === 'denied') {
          showToast('Você negou a permissão.');
        } else {
          showToast('Permissão não escolhida.');
        }
      } catch {
        showToast('Erro ao pedir permissão.');
      }
    }

    requestBtn.addEventListener('click', askPermission);
    testBtn.addEventListener('click', showBoaaNotification);
    window.addEventListener('focus', updatePermissionStatus);
  </script>
</body>
</html>
