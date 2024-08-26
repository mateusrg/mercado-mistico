async function realizarLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    const data = {
        email,
        senha
    }

    const response = await fetch('http://localhost:3000/login/verificar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if(results.success) {
        alert(results.message);
        localStorage.setItem('estaLogado', 'true');
        localStorage.setItem('nomeUsuario', results.nome);
        window.location.href = '/usuario';
    } else {
        alert(results.message);
    }
}

function olhoFechado() {

    if (document.getElementById('password').type === 'password') {

        document.getElementById("olho").src = "../../assets/olho_fechado.png";
        document.getElementById('password').type = 'text';

    } else {

        document.getElementById("olho").src = "../../assets/olho.png";
        document.getElementById('password').type = 'password';

    }
}

function verificarEstadoDeLogin() {
    const estaLogado = localStorage.getItem('estaLogado');
    
    if (estaLogado === 'true') {
        // Usuário está logado, mostrar elementos do cabeçalho logado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'none';
        document.getElementById('botoes_header_direita_logado').style.display = 'flex';
    } else {
        // Usuário está deslogado, mostrar elementos do cabeçalho deslogado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
        document.getElementById('botoes_header_direita_logado').style.display = 'none';
    }
}

verificarEstadoDeLogin();