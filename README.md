<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notificação Agendada</title>
<style>
body {font-family:sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; background:#f3f4f6; margin:0;}
.card {background:white; padding:28px; border-radius:12px; text-align:center; box-shadow:0 6px 20px rgba(0,0,0,0.1); width:360px;}
button {padding:10px 16px; border:none; border-radius:10px; cursor:pointer; font-weight:600; margin:5px;}
.primary {background:#2563eb;color:white;}
#toast {position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#111;color:white; padding:10px 14px; border-radius:8px; display:none;}
</style>
</head>
<body>
<div class="card">
<h1>Notificação Agendada</h1>
<button id="btnPerm" class="primary">Pedir permissão</button>
<div id="status">Status: <span id="perm">verificando...</span></div>
<div id="info">Mensagem agendada para: <span id="scheduled"></span></div>
</div>
<div id="toast">Boaa ✨</div>

<script>
const btnPerm = document.getElementById('btnPerm');
const permSpan = document.getElementById('perm');
const toast = document.getElementById('toast');
const scheduledSpan = document.getElementById('scheduled');

// Função pra toast
function showToast(msg,time=2200){toast.textContent=msg; toast.style.display='block'; setTimeout(()=>toast.style.display='none',time);}

// Status da permissão
function updatePermissionStatus(){
  if(!('Notification' in window)){permSpan.textContent='não suportado'; showToast('Seu navegador não suporta notificações.'); btnPerm.disabled=true; return;}
  permSpan.textContent = Notification.permission;
  btnPerm.disabled = Notification.permission==='granted';
}

// Função para disparar a notificação
function showNotification(title, body){
  if(Notification.permission==='granted'){
    new Notification(title,{body, icon:'https://cdn-icons-png.flaticon.com/512/2488/2488921.png'});
    showToast(body);
  }else{
    showToast('Permissão não concedida.');
  }
}

// 🔹 AQUI VOCÊ PROGRAMA A DATA/HORA
// Formato: new Date(ano, mês-1, dia, hora, minuto, segundo)
const scheduledDate = new Date(2025, 9, 31, 1, 24, 0); // Exemplo: 31/10/2025 01:50:00
scheduledSpan.textContent = scheduledDate.toLocaleString();

// Calcula diferença entre agora e a data agendada
function scheduleNotification(){
  const now = new Date();
  const diff = scheduledDate - now;

  if(diff <= 0){
    showNotification('Hora chegou ⏰','Data/Hora programada: ' + scheduledDate.toLocaleString());
    return;
  }

  showToast('Notificação agendada para ' + scheduledDate.toLocaleString(),4000);

  setTimeout(()=>{
    showNotification('Hora chegou ⏰','Data/Hora programada: ' + scheduledDate.toLocaleString());
  }, diff);
}

// Pedir permissão
btnPerm.addEventListener('click', async ()=>{
  const res = await Notification.requestPermission();
  updatePermissionStatus();
  if(res==='granted'){
    scheduleNotification(); // agenda automaticamente após permissão
  }
});

updatePermissionStatus();
</script>
</body>
</html>
