function verificarEstadoDeLogin() {
    const estaLogado = localStorage.getItem('estaLogado');

    console.log(estaLogado)
    
    if (estaLogado === 'true') {
        // Usuário está logado, mostrar elementos do cabeçalho logado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'none';
        document.getElementById('botoes_header_direita_logado').style.display = 'flex';

        const nomeUsuario = localStorage.getItem('nomeUsuario');

        document.getElementById('tituloBemVindo').innerText = 'Olá, ' + nomeUsuario;
    } else {
        // Usuário está deslogado, mostrar elementos do cabeçalho deslogado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
        document.getElementById('botoes_header_direita_logado').style.display = 'none';
    }
}

verificarEstadoDeLogin();

function sairConta () {
    // Usuário deslogou, mostrar elementos do cabeçalho deslogado
    document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
    document.getElementById('botoes_header_direita_logado').style.display = 'none';

    localStorage.removeItem('estaLogado');

    alert('Usuário Deslogado!');

    window.location.href = '/login';
}