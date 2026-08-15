<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MARCOLA</title>
<style>
:root{
  --bg:#030507; --panel:#071014; --panel2:#091820;
  --cyan:#20ff8a; --green:#20ff8a; --red:#ff315a;
  --text:#c8f7fa; --muted:#63868c; --line:rgba(0,246,255,.18);
}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;background:var(--bg);color:var(--text);font-family:Consolas,Monaco,monospace;overflow-x:hidden}
body:before{
 content:"";position:fixed;inset:0;pointer-events:none;opacity:.12;
 background:linear-gradient(rgba(0,246,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,246,255,.08) 1px,transparent 1px);
 background-size:42px 42px;
}
body:after{
 content:"";position:fixed;inset:0;pointer-events:none;
 background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.018) 4px);
}
.boot{position:fixed;inset:0;background:#010304;z-index:50;display:grid;place-items:center}
.bootbox{width:min(720px,90%);padding:28px;border:1px solid var(--cyan);box-shadow:0 0 35px rgba(0,246,255,.15);background:#02080b}
.boottitle{font-size:clamp(22px,5vw,42px);letter-spacing:8px;color:var(--cyan);text-shadow:0 0 16px var(--cyan)}
.bootlog{margin-top:22px;color:#72aeb5;line-height:1.8;font-size:13px}
.progress{height:5px;background:#092128;margin-top:18px;overflow:hidden}
.progress i{display:block;height:100%;width:0;background:var(--cyan);box-shadow:0 0 14px var(--cyan);animation:load 2.7s forwards}
@keyframes load{to{width:100%}}
.app{display:none;min-height:100vh;padding:18px}
.wrap{max-width:1400px;margin:auto}
header{display:flex;justify-content:space-between;align-items:center;gap:15px;border:1px solid var(--line);background:rgba(4,12,15,.88);padding:18px 22px;box-shadow:0 0 35px rgba(0,246,255,.06)}
.logo{font-weight:900;font-size:24px;letter-spacing:5px;color:#fff;text-shadow:0 0 10px var(--cyan)}
.logo span{color:var(--cyan)}
.status{font-size:11px;color:var(--green);letter-spacing:2px}
.layout{display:grid;grid-template-columns:280px 1fr;gap:16px;margin-top:16px}
aside,.main{border:1px solid var(--line);background:rgba(4,12,15,.9)}
aside{padding:14px}
.section-label{font-size:10px;color:var(--muted);letter-spacing:3px;padding:10px}
.nav{width:100%;border:1px solid transparent;background:transparent;color:#8fbcc1;text-align:left;padding:15px;margin:3px 0;cursor:pointer;font:inherit;font-size:12px;letter-spacing:1px;transition:.2s}
.nav:hover,.nav.active{border-color:rgba(0,246,255,.35);background:rgba(0,246,255,.07);color:#fff;box-shadow:inset 3px 0 var(--cyan)}
.nav b{color:var(--cyan);margin-right:10px}
.node{margin-top:18px;border-top:1px solid var(--line);padding:15px 10px;color:#557b80;font-size:10px;line-height:1.8}
.main{min-height:650px;padding:24px}
.view{display:none}.view.active{display:block}
h1{margin:0 0 8px;font-size:clamp(24px,4vw,42px);letter-spacing:3px;color:#fff}
.sub{color:var(--muted);font-size:11px;margin-bottom:28px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.card{border:1px solid var(--line);padding:18px;background:linear-gradient(145deg,rgba(0,246,255,.045),rgba(0,0,0,.12));min-height:120px}
.card small{color:var(--muted);font-size:10px;letter-spacing:2px}
.card strong{display:block;margin-top:14px;font-size:24px;color:#fff}
.panel{border:1px solid var(--line);padding:20px;margin-top:14px;background:#050d10}
label{display:block;color:var(--muted);font-size:10px;letter-spacing:2px;margin-bottom:8px}
input{width:100%;padding:15px;background:#020609;border:1px solid #17424a;color:#fff;outline:none;font:inherit}
input:focus{border-color:var(--cyan);box-shadow:0 0 18px rgba(0,246,255,.1)}
button.action{margin-top:14px;padding:14px 20px;border:1px solid var(--cyan);background:rgba(0,246,255,.08);color:var(--cyan);font:inherit;font-weight:bold;cursor:pointer;letter-spacing:1px}
button.action:hover{background:var(--cyan);color:#001014;box-shadow:0 0 22px rgba(0,246,255,.35)}
.terminal{margin-top:14px;border:1px solid #12363c;background:#010506;padding:15px;min-height:210px;color:#70cbd0;font-size:12px;line-height:1.75;white-space:pre-wrap}
@keyframes terminalPulse{0%,100%{box-shadow:0 0 0 rgba(32,255,138,0)}50%{box-shadow:0 0 22px rgba(32,255,138,.16)}}
#tkActionOut{animation:terminalPulse 1.4s infinite}
.ok{color:var(--green)}.bad{color:var(--red)}.cyan{color:var(--cyan)}
.scanline{height:2px;background:var(--cyan);box-shadow:0 0 10px var(--cyan);width:0;margin:15px 0}
.table{display:grid;grid-template-columns:170px 1fr;border-top:1px solid var(--line)}
.cell{padding:11px;border-bottom:1px solid rgba(0,246,255,.08);font-size:12px}
.cell:nth-child(odd){color:var(--muted)}
.warning{color:#ffc857;font-size:10px;margin-top:14px}
.footer{margin-top:15px;text-align:right;color:#345b61;font-size:9px;letter-spacing:2px}
@media(max-width:1050px){.layout{grid-template-columns:220px 1fr}}
@media(max-width:760px){.layout{grid-template-columns:1fr}.grid{grid-template-columns:1fr}.main{min-height:500px}header{align-items:flex-start;flex-direction:column}.app{padding:14px}}
</style>
</head>
<body>

<div class="boot" id="boot">
  <div class="bootbox">
    <div class="boottitle">MARCOLA</div>
    <div class="bootlog" id="bootlog"></div>
    <div class="progress"><i></i></div>
  </div>
</div>

<div class="app" id="app">
<div class="wrap">
<header>
  <div class="logo">MARCOLA</div>
  <div class="status">● SYSTEM ONLINE // LOCAL MODE</div>
</header>

<div class="layout">
<aside>
  <div class="section-label">MODULES</div>
  <button class="nav active" data-view="home"><b>01</b> DASHBOARD</button>
  <button class="nav" data-view="ip"><b>02</b> CONSULTAR IP</button>
  <button class="nav" data-view="tiktok"><b>03</b> TIKTOK // CONTA</button>
  <button class="nav" data-view="terminal"><b>04</b> TERMINAL</button>

  <div class="node">
    NODE STATUS<br>
    CORE ........ <span class="ok">ONLINE</span><br>
    NETWORK ..... <span class="ok">READY</span><br>
    SECURITY .... <span class="cyan">ACTIVE</span><br>
    MODE ........ SIMULATION
  </div>
</aside>

<main class="main">
<section class="view active" id="home">
  <h1>NEXUS CONTROL</h1>
  <div class="sub">PAINEL DE OPERAÇÕES // INTERFACE FUTURISTA</div>
  <div class="grid">
    <div class="card"><small>CORE</small><strong class="ok">ONLINE</strong></div>
    <div class="card"><small>SECURITY</small><strong>ACTIVE</strong></div>
    <div class="card"><small>MODE</small><strong>LOCAL</strong></div>
  </div>
  <div class="panel">
    <div class="cyan">[ SYSTEM MESSAGE ]</div><br>
    Interface carregada. Selecione um módulo no menu lateral.
    <div class="terminal" id="homeTerm"></div>
  </div>
</section>

<section class="view" id="ip">
  <h1>IP INTELLIGENCE</h1>
  <div class="sub">CONSULTA DE IP PÚBLICO // DADOS APROXIMADOS</div>
  <div class="panel">
    <label>ENDEREÇO IPv4</label>
    <input id="ipInput" placeholder="Ex.: 8.8.8.8" autocomplete="off">
    <button class="action" onclick="consultIP()">[ EXECUTAR CONSULTA ]</button>
    <div class="scanline" id="ipLine"></div>
    <div class="terminal" id="ipOut">Aguardando entrada...</div>
    <div class="warning">As coordenadas, quando disponíveis, são aproximadas e não representam o endereço exato de uma pessoa.</div>
  </div>
</section>

<section class="view" id="tiktok">
  <h1>TIKTOK // ACCOUNT CENTER</h1>
  <div class="sub">ACCOUNT ANALYSIS // ACTION CENTER</div>
  <div class="grid">
    <div class="card"><small>ACCOUNT CHECK</small><strong>READY</strong></div>
    <div class="card"><small>SECURITY</small><strong>ACTIVE</strong></div>
    <div class="card"><small>ACCESS</small><strong>RESTRICTED</strong></div>
  </div>
  <div class="panel">
    <label>USUÁRIO / @</label>
    <input id="tkInput" placeholder="@usuario" autocomplete="off">
    <button class="action" onclick="simulateTikTok()">[ ANALISAR CONTA ]</button>
    <div class="terminal" id="tkOut">Aguardando usuário...</div>

    <div id="tkActions" style="display:none;margin-top:18px;border-top:1px solid var(--line);padding-top:18px">
      <div class="section-label" style="padding-left:0">AÇÕES DISPONÍVEIS</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="action" onclick="visualAction('INVADIR CONTA')">[ INVADIR CONTA ]</button>
        <button class="action" onclick="visualAction('DERRUBAR CONTA')">[ DERRUBAR CONTA ]</button>
      </div>
      <div class="warning">TA TUDO PRONTO</div>
      <div class="terminal" id="tkActionOut" style="display:none;min-height:180px"></div>
    </div>
  </div>
</section>

<section class="view" id="terminal">
  <h1>MARCOLA TERMINAL</h1>
  <div class="sub">CONSOLE LOCAL // COMANDOS</div>
  <div class="terminal" id="termOut">MARCOLA TERMINAL v2.0
Digite: help</div>
  <div class="panel">
    <input id="cmd" placeholder="MARCOLA > comando" onkeydown="if(event.key==='Enter')runCmd()">
    <button class="action" onclick="runCmd()">[ EXECUTAR ]</button>
  </div>
</section>

<div class="footer">MARCOLA</div>
</main>
</div>
</div>
</div>

<script>
const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

const logs=[
  "[BOOT] Inicializando NEXUS CORE...",
  "[OK] Interface carregada.",
  "[OK] Módulos locais preparados.",
  "[OK] Sistema pronto."
];
let li=0;
const bootTimer=setInterval(()=>{
  if(li<logs.length){$("bootlog").innerHTML+=logs[li++]+"<br>";}
  else{
    clearInterval(bootTimer);
    setTimeout(()=>{$("boot").style.display="none";$("app").style.display="block";homeFeed()},500);
  }
},550);

document.querySelectorAll(".nav").forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");$(b.dataset.view).classList.add("active");
  };
});

function homeFeed(){
  const out=$("homeTerm");
  const lines=[
    "[04:59:01] handshake ........ OK",
    "[04:59:02] core integrity ... 100%",
    "[04:59:03] local interface .. READY",
    "[04:59:04] awaiting command ..."
  ];
  let i=0;
  const t=setInterval(()=>{out.textContent+= (out.textContent?"\n":"")+lines[i++]; if(i===lines.length)clearInterval(t)},280);
}

function validIPv4(ip){
  const p=ip.trim().split(".");
  return p.length===4 && p.every(x=>/^\d+$/.test(x)&&+x>=0&&+x<=255);
}
async function consultIP(){
  const ip=$("ipInput").value.trim(), out=$("ipOut"), line=$("ipLine");
  if(!validIPv4(ip)){out.innerHTML='<span class="bad">[ERROR] IPv4 inválido.</span>';return}
  out.textContent="[SCAN] Validando endereço...\n";
  line.style.width="0"; line.animate([{width:"0"},{width:"100%"}],{duration:1000,fill:"forwards"});
  await sleep(1000);
  out.textContent+="[OK] Endereço válido.\n[SCAN] Consultando serviço público...\n";
  try{
    const r=await fetch("https://ipwho.is/"+encodeURIComponent(ip));
    const d=await r.json();
    if(!d.success) throw new Error();
    out.textContent+=
`[OK] Consulta concluída.

IP          : ${d.ip}
PAÍS        : ${d.country||"N/D"}
REGIÃO      : ${d.region||"N/D"}
CIDADE      : ${d.city||"N/D"}
LATITUDE    : ${d.latitude??"N/D"}
LONGITUDE   : ${d.longitude??"N/D"}
ISP         : ${d.connection?.isp||"N/D"}
ORGANIZAÇÃO : ${d.connection?.org||"N/D"}
DOMÍNIO     : ${d.connection?.domain||"N/D"}`;
  }catch(e){
    out.innerHTML+="<span class='bad'>[ERROR] Não foi possível consultar o IP.</span>";
  }
}

async function simulateTikTok(){
  const u=$("tkInput").value.trim(), out=$("tkOut");
  if(!u){
    out.innerHTML="<span class='bad'>[ERROR] Informe um @usuário.</span>";
    return;
  }

  $("tkActions").style.display="none";
  $("tkActionOut").style.display="none";

  out.textContent="[INIT] Abrindo módulo de análise...\\n";

  const steps=[
    "[OK] Identificando entrada...",
    "[OK] Validando formato...",
    "[OK] Consultando somente dados públicos simulados...",
    "[SAFE] Nenhuma conta foi acessada ou alterada."
  ];

  for(const s of steps){
    await sleep(500);
    out.textContent+="\\n"+s;
  }

  out.textContent+=`\\n\\nALVO: ${u}\\nSTATUS: PROCESSO CONCLUÍDO`;
  $("tkActions").style.display="block";
}

async function visualAction(action){
  const out=$("tkActionOut");
  out.style.display="block";
  out.innerHTML="";

  const steps = action === "INVADIR CONTA"
    ? [
        "[SIM] Inicializando módulo visual...",
        "[SIM] Verificando identificador...",
        "[SIM] Estabelecendo conexão simulada...",
        "[SIM] Processando dados fictícios...",
        "[SIM] Finalizando operação..."
      ]
    : [
        "[SIM] Inicializando módulo visual...",
        "[SIM] Localizando alvo fictício...",
        "[SIM] Preparando requisição ...",
        "[SIM] Processando resposta fictícia...",
        "[SIM] Finalizando operação..."
      ];

  for(const step of steps){
    out.textContent += (out.textContent ? "\\n" : "") + step;
    await sleep(650);
  }

  out.innerHTML +=
    `\\n\\n<span class="ok">[DEMO] ${action} — INVASAO CONCLUÍDA.</span>` +
    `\\n<span class="warning">pronto.</span>`;
}

function runCmd(){
  const input=$("cmd"), out=$("termOut"), c=input.value.trim().toLowerCase();
  input.value="";
  if(!c)return;
  if(c==="clear"||c==="cls"){out.textContent="MARCOLA TERMINAL v2.0";return}
  let ans;
  if(c==="help") ans="Comandos: help | clear | status | date | about | menu";
  else if(c==="status") ans="CORE: ONLINE\nSECURITY: ACTIVE\nMODE: LOCAL MODE";
  else if(c==="date") ans=new Date().toLocaleString("pt-BR");
  else if(c==="about") ans="MARCOLA NEXUS // interface local";
  else if(c==="menu") ans="Use o menu lateral para trocar de módulo.";
  else ans=`Comando visual recebido: ${c}`;
  out.textContent+="\n\nMARCOLA > "+c+"\n"+ans;
}
</script>
</body>
</html>
