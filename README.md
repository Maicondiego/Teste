# Teste
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Envio de Mensagem</title>
</head>
<body>
    <h1>Envio de Mensagem</h1>
    <form id="messageForm">
        <label for="message">Mensagem:</label>
        <input type="text" id="message" name="message">
        <button type="submit">Enviar</button>
    </form>

    <script>
        document.getElementById('messageForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const message = document.getElementById('message').value;
            localStorage.setItem('message', message);
            alert('Mensagem enviada!');
        });
    </script>
</body>
</html>

