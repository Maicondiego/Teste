<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notificação Automática</title>
<style>
body {font-family:sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; background:#f3f4f6; margin:0;}
.card {background:white; padding:28px; border-radius:12px; text-align:center; box-shadow:0 6px 20px rgba(0,0,0,0.1); width:360px;}
button {padding:10px 16px; border:none; border-radius:10px; cursor:pointer; font-weight:600;}
.primary {background:#2563eb;color:white;}
#toast {position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#111;color:white; padding:10px 14px; border-radius:8px; display:none;}
</style>
</head>
<body>
<div class="card">
<h1>Ativar notificações</h1>
<p>Clique em “Pedir permissão” e aceite para receber notificações.</p>
<button id="btnPerm" class="primary">Pedir permissão</button>
<div id="status">Status: <span id="perm">verificando...</span></div>
</div>
<div id="toast">Boaa ✨</div>

<script>
// 🔹 CONFIGURAÇÃO: true = ativa notificação automática depois de 30s
const autoNotify = true;
const notifyDelay = 30000; // 30 segundos

const btnPerm = document.getElementById('btnPerm');
const permSpan = document.getElementById('perm');
const toast = document.getElementById('toast');
let notifyTimer;

function showToast(msg,time=2200){toast.textContent=msg; toast.style.display='block'; setTimeout(()=>toast.style.display='none',time);}

function updatePermissionStatus(){
  if(!('Notification' in window)){permSpan.textContent='não suportado'; showToast('Seu navegador não suporta notificações.'); btnPerm.disabled=true; return;}
  permSpan.textContent = Notification.permission;
  btnPerm.disabled = Notification.permission==='granted';
}

// 🔹 REGISTRA SERVICE WORKER
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js')
  .then(()=>console.log('✅ SW registrado'))
  .catch(err=>console.error('❌ Erro ao registrar SW:',err));
}

updatePermissionStatus();

function showNotification(title, body, url){
  if(Notification.permission==='granted'){
    navigator.serviceWorker.ready.then(reg=>{
      reg.showNotification(title,{
        body:body,
        icon:'https://cdn-icons-png.flaticon.com/512/2488/2488921.png',
        data:{url:url},
        vibrate:[200,100,200],
        tag:'auto-notify'
      });
    });
    showToast(title);
  }else{showToast('Permissão não concedida.');}
}

function startAutoNotify(){
  if(!autoNotify) return;
  clearTimeout(notifyTimer);
  notifyTimer=setTimeout(()=>showNotification('Ai o crédito 💸','Clique aqui pra ver o link!','https://chatgpt.com/'),notifyDelay);
}

async function askPermission(){
  if(window.location.protocol!=='https:' && window.location.hostname!=='localhost'){
    showToast('⚠️ Use HTTPS ou localhost para funcionar.');
    return;
  }
  try{
    const res = await Notification.requestPermission();
    updatePermissionStatus();
    if(res==='granted'){startAutoNotify();}
  }catch{showToast('Erro ao pedir permissão.');}
}

btnPerm.addEventListener('click',askPermission);
</script>
</body>
</html>
