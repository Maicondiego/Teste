# Teste
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Pedir permissão de notificação — Boaa</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;display:flex;min-height:100vh;align-items:center;justify-content:center;background:#f3f4f6;margin:0}
    .card{background:white;padding:28px;border-radius:12px;box-shadow:0 6px 20px rgba(2,6,23,0.08);width:360px;text-align:center}
    h1{margin:0 0 12px;font-size:20px}
    p{margin:0 0 18px;color:#444}
    button{cursor:pointer;padding:10px 16px;border-radius:10px;border:0;font-weight:600}
    .primary{background:#2563eb;color:white}
    .muted{background:#e5e7eb;color:#111;margin-left:8px}
    #status{margin-top:14px;font-size:14px;color:#066}
    #toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:10px 14px;border-radius:8px;display:none}
  </style>
</head>
<body>
  <div class="card">
    <h1>Ativar notificações</h1>
    <p>Para receber uma notificação com a mensagem <strong>"boaa"</strong>, clique em "Pedir permissão" e aceite quando o navegador pedir.</p>

    <div>
      <button id="requestBtn" class="primary">Pedir permissão</button>
      <button id="testBtn" class="muted">Testar notificação</button>
    </div>

    <div id="status">Status: <span id="perm">verificando...</span></div>
  </div>

  <div id="toast">Boaa ✨</div>

  <script>
    // Elementos
    const requestBtn = document.getElementById('requestBtn');
    const testBtn = document.getElementById('testBtn');
    const permSpan = document.getElementById('perm');
    const toast = document.getElementById('toast');

    // Atualiza status inicial
    function updatePermissionStatus(){
      if (!('Notification' in window)){
        permSpan.textContent = 'Notificações não suportadas neste navegador.';
        requestBtn.disabled = true;
        testBtn.disabled = true;
        return;
      }
      permSpan.textContent = Notification.permission; // 'default', 'granted', 'denied'
      // se já tiver permissão concedida, desabilita o botão de pedir
      requestBtn.disabled = (Notification.permission === 'granted');
    }

    updatePermissionStatus();

    // Mostra um toast simples na página
    function showInPageToast(text, ms = 2200){
      toast.textContent = text;
      toast.style.display = 'block';
      setTimeout(()=>{ toast.style.display = 'none'; }, ms);
    }

    // Função que cria a notificação com a mensagem "boaa"
    function showBoaaNotification(){
      // Verifica suporte
      if (!('Notification' in window)) return showInPageToast('Navegador não suporta notificações.');

      // Se permissão concedida, cria a notificação
      if (Notification.permission === 'granted'){
        try{
          const n = new Notification('boaa');
          // Quando o usuário clicar na notificação, foca a janela
          n.onclick = () => { window.focus(); n.close(); };
        } catch(e){
          // Alguns navegadores pedem service worker em HTTPS; no fallback, só mostra o toast
          showInPageToast('Não foi possível mostrar notificação do sistema.');
        }
        // Também exibimos um toast visual na página
        showInPageToast('Boaa');
      } else if (Notification.permission === 'denied'){
        showInPageToast('Permissão negada. Abra as configurações do navegador para habilitar.');
      } else {
        // permission === 'default'
        showInPageToast('Peça permissão primeiro.');
      }
    }

    // Ao clicar em pedir permissão
    requestBtn.addEventListener('click', async () => {
      if (!('Notification' in window)) return;
      try{
        const result = await Notification.requestPermission(); // 'granted' | 'denied' | 'default'
        updatePermissionStatus();
        if (result === 'granted'){
          // Assim que o usuário ACEITAR, mostramos a notificação "boaa"
          showBoaaNotification();
        } else if (result === 'denied'){
          showInPageToast('Você negou a permissão.');
        } else {
          showInPageToast('Você fechou a caixa de permissão sem responder.');
        }
      } catch(err){
        showInPageToast('Erro ao pedir permissão.');
      }
    });

    // Botão de teste: tenta mostrar a notificação (se já tiver permissão)
    testBtn.addEventListener('click', () => {
      showBoaaNotification();
    });

    // Dica: atualiza status se o usuário mudou a permissão fora da página
    // (não existe um evento oficial para isso, então refazemos a checagem quando a página ganha foco)
    window.addEventListener('focus', updatePermissionStatus);

    // Nota: para que as notificações do sistema funcionem normalmente o site precisa estar sob HTTPS
    // ou em localhost durante desenvolvimento.
  </script>
</body>
</html>

