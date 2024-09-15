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
    const response = await fetch("/produto/listar");
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
                    <h6 class="precoProduto">Preço: ${Number(produto.preco).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</h6>
                </div>
                <div class="subdiv_produto_imagens">
                    <img src="../../assets/coracao.png" alt="Favoritar" class="coracao" onclick="favoritar(this, ${produto.idProduto})">
                    <img src="../../assets/adicionar_carrinho.png" alt="Adicionar ao Carrinho" class="carrinho" onclick="addCarrinho(${produto.idProduto})">
                </div>
            </div>
        </section>
        `;
    });
}

async function favoritar(elemento, idProduto) {
    const emailUsuario = localStorage.getItem("email");
    
    data = {
        emailUsuario,
        idProduto
    };

    const response = await fetch("/favorito/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const results = await response.json();

    if (results.success) {
        elemento.src = "./assets/coracao_cheio.png";
    } else {
        alert(results.message);
    }
}

exibirCatalogo();