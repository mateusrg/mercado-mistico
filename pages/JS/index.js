const checarProduto = localStorage.setItem('produtoSelecionado', 'nulo');

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

// Se o carrinho não existir no localStorage, ele cria
try {
    localStorage.getItem("carrinho");
} catch {
    localStorage.setItem("carrinho", JSON.stringify({"carrinho": []}));
}

verificarEstadoDeLogin();