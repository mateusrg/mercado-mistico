function verificarEstadoDeLogin() {
    const nome = localStorage.getItem('nome');    
    if (nome) {
        // Usuário está logado, mostrar elementos do cabeçalho logado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'none';
        document.getElementById('botoes_header_direita_logado').style.display = 'flex';
    } else {
        // Usuário está deslogado, mostrar elementos do cabeçalho deslogado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
        document.getElementById('botoes_header_direita_logado').style.display = 'none';
        window.location.href = '/login';
    }
}

async function selecionarProduto() {
    const idProduto = window.location.pathname.split("/").pop();
    const response = await fetch(`/produto/selecionar/${idProduto}`);
    const results = await response.json();
    if (!results.success) {
        alert(results.message);
        return;
    }
    const produto = results.data[0];
    console.log(produto);
    document.getElementById("imagemProduto").src = "../" + produto.imagem;
    document.getElementById("imagemProduto").alt = produto.nome;
    document.getElementById("tituloProduto").innerHTML = produto.nome;
    document.getElementById("descricao").innerHTML = produto.descricao;
    document.getElementById("valorTotal").innerHTML = Number(produto.preco).toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

verificarEstadoDeLogin();
selecionarProduto();