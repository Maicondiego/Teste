<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notificação com Contador</title>
<style>
body {font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; background:#f3f4f6; margin:0;}
.card {background:white; padding:28px; border-radius:12px; text-align:center; box-shadow:0 6px 20px rgba(0,0,0,0.1); width:360px;}
button {padding:10px 16px; border:none; border-radius:10px; cursor:pointer; font-weight:600; margin:5px;}
.primary {background:#2563eb;color:white;}
#toast {position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#111;color:white; padding:10px 14px; border-radius:8px; display:none;}
#contador {margin-top:10px; font-size:18px; font-weight:bold;}
</style>
</head>
<body>
<div class="card">
<h1>Notificação em 30 segundos</h1>
<button id="btnTest" class="primary">Testar Notificação</button>
<div id="contador">30 segundos carregando...</div>
</div>
<div id="toast">Boaa ✨</div>

<script>
const btnTest = document.getElementById('btnTest');
const toast = document.getElementById('toast');
const contadorDiv = document.getElementById('contador');

// CONFIGURAÇÃO: tempo em segundos
const tempoTotal = 30; 
let tempoRestante = tempoTotal;

// Mostra toast
function showToast(msg,time=2200){toast.textContent=msg; toast.style.display='block'; setTimeout(()=>toast.style.display='none',time);}

// Função de notificação
function showNotification(title, body){
  if(Notification.permission==='granted'){
    new Notification(title,{body, icon:'https://cdn-icons-png.flaticon.com/512/2488/2488921.png'});
    showToast(body);
  }else{
    showToast('Permissão não concedida.');
  }
}

// Contador regressivo
function startCountdown(){
  contadorDiv.textContent = `${tempoRestante} segundos carregando...`;
  const interval = setInterval(()=>{
    tempoRestante--;
    if(tempoRestante > 0){
      contadorDiv.textContent = `${tempoRestante} segundos carregando...`;
    } else {
      clearInterval(interval);
      contadorDiv.textContent = `0 segundos - Notificação disparada!`;
      showNotification('Hora chegou ⏰','Seu tempo acabou!');
    }
  }, 1000);
}

// Botão de teste dispara notificação instantânea
btnTest.addEventListener('click', ()=>{
  showNotification('Teste ⏰','Esta é uma notificação de teste!');
});

// Inicia contador automaticamente
if(Notification.permission==='granted'){
  startCountdown();
} else {
  showToast('Aceite a permissão de notificação antes.');
}
</script>
</body>
</html>
