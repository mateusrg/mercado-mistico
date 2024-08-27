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

function marcarCheckbox() {
    let img = document.getElementById('checkbox');
    let src = img.src;

    if (src.endsWith("checkbox_azul_marcado.png")) {
        img.src = "../../assets/checkbox_azul.png";
    } else {
        img.src = "../../assets/checkbox_azul_marcado.png";
    }
}