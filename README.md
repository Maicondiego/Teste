<!-- chat-firebase-completo.html atualizado com seu firebaseConfig -->
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Chat Online (Firebase) — Completo</title>
  <style>
    :root{--bg:#0f1724;--card:#0b1220;--accent:#06b6d4;--muted:#94a3b8;--bubble:#0b1220}
    *{box-sizing:border-box;font-family:Inter,Segoe UI,Roboto,Arial}
    body{margin:0;padding:0;min-height:100vh;background:linear-gradient(180deg,#071022 0%,#052033 100%);color:#e6eef6;display:flex;align-items:center;justify-content:center}
    .app{width:100%;max-width:900px;margin:24px;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);border-radius:12px;box-shadow:0 8px 30px rgba(2,6,23,0.6);overflow:hidden;display:grid;grid-template-columns:1fr 360px}
    .left{padding:20px;display:flex;flex-direction:column;gap:12px}
    header{display:flex;align-items:center;justify-content:space-between}
    h1{font-size:20px;margin:0}
    .controls{display:flex;gap:8px;align-items:center}
    button{background:var(--accent);border:none;padding:8px 12px;border-radius:8px;color:#012;cursor:pointer;font-weight:600}
    button.secondary{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--muted);font-weight:600}
    .messages{flex:1;overflow:auto;padding:12px;border-radius:8px;background:linear-gradient(180deg,rgba(255,255,255,0.01),transparent)}
    .msg{margin-bottom:10px;display:flex;gap:8px}
    .bubble{padding:8px 12px;border-radius:10px;background:#081022;max-width:70%;line-height:1.3}
    .me{margin-left:auto}
    .meta{font-size:12px;color:var(--muted);margin-bottom:6px}
    .composer{display:flex;gap:8px;margin-top:10px}
    input[type=text]{flex:1;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:inherit}
    .right{background:var(--card);padding:16px;display:flex;flex-direction:column;gap:12px}
    .user-card{display:flex;align-items:center;gap:12px}
    .avatar{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--accent),#7dd3fc);display:flex;align-items:center;justify-content:center;color:#012;font-weight:700}
    .right h2{margin:0;font-size:16px}
    small{color:var(--muted)}
    .info{font-size:13px}
    .list-users{display:flex;flex-direction:column;gap:8px;max-height:260px;overflow:auto}
    .user-item{padding:8px;border-radius:8px;background:rgba(255,255,255,0.01);display:flex;justify-content:space-between;align-items:center}
    .hint{font-size:13px;color:var(--muted)}
    footer{padding:12px;text-align:center;color:var(--muted);font-size:13px}
    @media(max-width:880px){.app{grid-template-columns:1fr}.right{order:2}}
  </style>
</head>
<body>
  <div class="app" role="application">
    <div class="left">
      <header>
        <h1>Chat ao vivo — Firebase</h1>
        <div class="controls">
          <button id="btn-clear">Limpar (dev)</button>
          <button class="secondary" id="btn-logout">Trocar usuário</button>
        </div>
      </header>

      <div class="messages" id="messages" aria-live="polite"></div>

      <div class="composer">
        <input id="inputMsg" type="text" placeholder="Escreva algo..." autocomplete="off" />
        <button id="btnSend">Enviar</button>
      </div>

      <footer>
        <span class="hint">Mensagens atualizam em tempo real. Substitua o firebaseConfig e rode em um servidor (GitHub Pages / Firebase Hosting).</span>
      </footer>
    </div>

    <aside class="right">
      <div class="user-card">
        <div class="avatar" id="avatar">U</div>
        <div>
          <h2 id="displayName">Usuário</h2>
          <div class="info"><small id="userSince">—</small></div>
        </div>
      </div>

      <div>
        <h3>Usuários online</h3>
        <div class="list-users" id="userList">—</div>
      </div>

      <div>
        <h3>Configurações</h3>
        <p class="hint">Modo dev. Em produção configure regras do Firestore e autenticação.</p>
      </div>
    </aside>
  </div>

  <!-- Firebase compat SDKs -->
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>
  <script>
    const firebaseConfig = {
      apiKey: "AIzaSyByeN4eNqB2K7rnrOT_fQjl9g2ydR-5RUE",
      authDomain: "chat-4ed9b.firebaseapp.com",
      projectId: "chat-4ed9b",
      storageBucket: "chat-4ed9b.firebasestorage.app",
      messagingSenderId: "213313754463",
      appId: "1:213313754463:web:bdd2b7fb7e63b1407712ea"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    const messagesEl = document.getElementById('messages');
    const inputMsg = document.getElementById('inputMsg');
    const btnSend = document.getElementById('btnSend');
    const displayNameEl = document.getElementById('displayName');
    const avatarEl = document.getElementById('avatar');
    const userListEl = document.getElementById('userList');
    const btnClear = document.getElementById('btn-clear');
    const btnLogout = document.getElementById('btn-logout');

    let USER = localStorage.getItem('chat_user');
    if (!USER) {
      askUsername();
    } else {
      USER = JSON.parse(USER);
      setUserUI(USER);
      announcePresence(USER);
    }

    function askUsername(){
      let name = '';
      while(!name){
        name = prompt('Digite seu nome (apenas para exibição):', 'Usuário');
        if (name === null) return; 
        name = (name || '').trim();
      }
      const initial = name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase();
      USER = {name, initial, id: 'u_'+Math.random().toString(36).slice(2,9), since: Date.now()};
      localStorage.setItem('chat_user', JSON.stringify(USER));
      setUserUI(USER);
      announcePresence(USER);
    }

    function setUserUI(user){
      displayNameEl.textContent = user.name;
      avatarEl.textContent = user.initial || 'U';
      document.getElementById('userSince').textContent = 'Entrou em: ' + new Date(user.since).toLocaleString();
    }

    btnSend.addEventListener('click', sendMessage);
    inputMsg.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });

    function sendMessage(){
      const text = inputMsg.value.trim();
      if (!text) return;
      inputMsg.value = '';
      db.collection('messages').add({
        name: USER.name,
        uid: USER.id,
        text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(err => console.error('Erro ao enviar:', err));
    }

    db.collection('messages').orderBy('createdAt').limitToLast(200).onSnapshot(snapshot => {
      messagesEl.innerHTML = '';
      const items = [];
      snapshot.forEach(doc => {
        const d = doc.data();
        items.push({id: doc.id, ...d});
      });
      items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'msg ' + (item.uid === USER.id ? 'me' : '');
        const meta = document.createElement('div');
        meta.className = 'meta';
        const ts = item.createdAt && item.createdAt.toDate ? item.createdAt.toDate() : null;
        meta.textContent = (item.name || 'Anon') + (ts ? ' • ' + ts.toLocaleTimeString() : '');
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = item.text || '';
        div.appendChild(meta);
        div.appendChild(bubble);
        messagesEl.appendChild(div);
      });
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, err => console.error(err));

    function announcePresence(user){
      const ref = db.collection('presence').doc(user.id);
      ref.set({name: user.name, uid: user.id, lastSeen: firebase.firestore.FieldValue.serverTimestamp()}).catch(console.error);
    }

    setInterval(()=>{ if (USER) announcePresence(USER); }, 15000);

    db.collection('presence').onSnapshot(snapshot => {
      const now = Date.now();
      userListEl.innerHTML = '';
      snapshot.forEach(doc => {
        const p = doc.data();
        const li = document.createElement('div');
        li.className = 'user-item';
        const name = document.createElement('div');
        name.textContent = p.name || 'Anon';
        const seen = document.createElement('div');
        seen.style.fontSize = '12px';
        seen.style.color = 'var(--muted)';
        if (p.lastSeen && p.lastSeen.toDate){
          const diff = Date.now() - p.lastSeen.toDate().getTime();
          seen.textContent = diff < 60000 ? 'online' : Math.round(diff/1000) + 's';
        } else seen.textContent = '—';
        li.appendChild(name);
        li.appendChild(seen);
        userListEl.appendChild(li);
      });
    }, console.error);

    btnClear.addEventListener('click', async ()=>{
      if (!confirm('Tem certeza que quer apagar todas as mensagens (apenas dev)?')) return;
      const snap = await db.collection('messages').get();
      const batch = db.batch();
      snap.forEach(d=>batch.delete(d.ref));
      batch.commit().then(()=>alert('Mensagens apagadas')).catch(err=>alert('Erro: '+err));
    });

    btnLogout.addEventListener('click', ()=>{
      localStorage.removeItem('chat_user');
      location.reload();
    });

    if (USER) announcePresence(USER);

  </script>
</body>
</html>
