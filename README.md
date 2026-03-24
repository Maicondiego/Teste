<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">

  <!-- Responsivo -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

  <title>Jogo Fullscreen</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }

    /* Jogo ocupando TUDO */
    iframe {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      border: none;
    }
  </style>
</head>

<body>

  <!-- JOGO DIRETO (SEM FANCYBOX) -->
  <iframe src="https://public.pg-demo.com/demo/?gi=126&lang=pt"></iframe>

</body>
</html>
