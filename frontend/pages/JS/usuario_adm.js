async function verificarEstadoDeLogin() {
    const nome = localStorage.getItem('nome');    
    if (nome) {
        // Usuário está logado, mostrar elementos do cabeçalho logado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'none';
        document.getElementById('botoes_header_direita_logado').style.display = 'flex';
        document.getElementById('tituloBemVindo').innerText = 'Olá, ' + nome;

        const email = localStorage.getItem("email");
        const senha = localStorage.getItem("senha");
        const response = await fetch(`/usuario/is_adm/${email}/${senha}`);
        
        const results = await response.json();
    
        if (results.success && results.data === 0) {
            window.location.href = "/usuario";
        }
    } else {
        // Usuário está deslogado, mostrar elementos do cabeçalho deslogado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
        document.getElementById('botoes_header_direita_logado').style.display = 'none';
        window.location.href = '/login';
    }
}

verificarEstadoDeLogin();

function sairConta () {
    // Usuário deslogou, mostrar elementos do cabeçalho deslogado
    document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
    document.getElementById('botoes_header_direita_logado').style.display = 'none';

    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('senha');

    alert('Usuário Deslogado!');

    window.location.href = '/login';
}

function redefinirSenha() {
    document.getElementById('secaoredefinirSenha').style.display = 'flex';
}

function botaoFechar () {
    document.getElementById('secaoredefinirSenha').style.display = 'none';
    document.querySelector('#senhaAtual').value = '';
    document.querySelector('#senhaNova').value = '';
}

async function enviarNovoUsuario() {
    const emailUsuario = localStorage.getItem("email");
    const nome = document.getElementById("nomeInput").value;
    const senhaAtual = document.getElementById("senhaAtual").value;
    const senhaNova = document.getElementById("senhaNova").value;

    const data = {
        emailUsuario,
        nome,
        senhaAtual,
        senhaNova
    }

    const response = await fetch("/usuario/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const results = await response.json();

    alert(results.message);
    if (results.success) {
        localStorage.setItem("senha", senhaNova);
        window.location.href = "/usuario_adm";
    }
}

async function excluirConta() {
    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");

    const data = {
        email,
        senha
    }

    const response = await fetch(`/usuario/excluir/${email}/${senha}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    const results = await response.json();
    
    alert(results.message);
    if (results.success) {
        sairConta();
    }
}