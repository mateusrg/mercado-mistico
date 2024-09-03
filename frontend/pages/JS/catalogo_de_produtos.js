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

verificarEstadoDeLogin();

async function listarProdutos() {
    const response = await fetch("/listar_produtos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const results = await response.json();

    if (results.success) {
        return results.data;
    }
    alert(results.message);
    return undefined;
}

async function exibirCatalogo() {
    const produtos = await listarProdutos();
    
    produtos.forEach(produto => {
        document.getElementById("principal").innerHTML += `
        <section class="produto">
            <a onclick="paginaProduto(${produto.idProduto})">
                <img src="${produto.imagem}" alt="${produto.nome}" class="imagemProduto">
            </a>
            <div class="titulo_produto">
                <div class="subdiv_produto">
                    <a onclick="paginaProduto(${produto.idProduto})" class="nomeProduto">${produto.nome}</a>
                    ${produto.quantidade > 0 ? '<p class="emEstoque">em estoque</p>' : '<p class="semEstoque">sem estoque</p>'}
                    <h6 class="precoProduto">Preço: ${produto.preco.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</h6>
                </div>
                <div class="subdiv_produto_imagens">
                    <img src="../../assets/coracao.png" alt="Favoritar" class="coracao">
                    <img src="../../assets/adicionar_carrinho.png" alt="Adicionar ao Carrinho" class="carrinho">
                </div>
            </div>
        </section>
        `;
    });
}

exibirCatalogo();