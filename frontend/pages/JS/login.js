function verificarLogin () {
    const form = document.getElementById('formLogin');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;

        // Recuperar os dados do localStorage
        const usuarioCadastrado = JSON.parse(localStorage.getItem('usuario'));

        if (usuarioCadastrado) {
            // Verificar se o email e senha correspondem aos dados armazenados
            if (usuarioCadastrado.email === email && usuarioCadastrado.senha === senha) {
                alert('Login bem-sucedido!');

                localStorage.setItem('estaLogado', 'true');

                // Redirecionar para a página do usuário ou realizar outra ação desejada
                window.location.href = '/usuario';
            } else {
                alert('Email ou senha incorretos.');
            }
        } else {
            alert('Nenhum usuário cadastrado encontrado.');
        }
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

verificarEstadoDeLogin();