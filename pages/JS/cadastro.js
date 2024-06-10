function verificarCadastro() {
    const form = document.getElementById('formCadastro');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;

        // Armazenar os dados no localStorage
        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Converter objeto para JSON e armazenar no localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));

        alert('Usuário cadastrado com sucesso!');

        localStorage.setItem('estaLogado', 'true');

        form.reset();  // Limpa o formulário após o envio

        window.location.href = 'usuario.html';
    });
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

// Chama a função verificarEstadoDeLogin quando o DOM estiver totalmente carregado
verificarEstadoDeLogin();