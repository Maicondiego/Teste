<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manter Tela Ligada + Imagem</title>
  <style>
    body {
      background: #000;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    .message {
      position: absolute;
      top: 20px;
      left: 20px;
      color: #fff;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div class="message">Tela será mantida ligada enquanto esta página estiver aberta.</div>
  <img src="https://gartic.com.br/imgs/mural/mo/monark_bolado/capeta.png" alt="Imagem fornecida">
  
  <script>
    async function keepScreenOn() {
      if ('wakeLock' in navigator) {
        try {
          const lock = await navigator.wakeLock.request('screen');
          console.log('Tela mantida ligada!');
          // Se a página mudar de visibilidade, reativar
          document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState === 'visible') {
              await navigator.wakeLock.request('screen');
              console.log('Reativado wake lock após voltar à visibilidade');
            }
          });
        } catch (err) {
          console.error('Erro ao tentar manter tela ligada:', err);
        }
      } else {
        console.warn('Navegador não suporta Wake Lock API');
      }
    }
    
    // Chamar ao carregar
    keepScreenOn();
  </script>
</body>
</html>
