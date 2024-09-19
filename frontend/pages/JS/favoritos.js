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
exibirFavoritos();

async function listarFavoritos() {
    const tituloPagina = document.getElementById('tituloFavoritos');
    const emailUsuario = localStorage.getItem("email");

    const response = await fetch(`/favorito/listar/${emailUsuario}`);
    const results = await response.json();

    if (results.success) {
        tituloPagina.innerHTML = `Minha lista de desejos (${results.data.length})`;
        return results.data;
    }
    alert(results.message);
    return undefined;
}

async function exibirFavoritos() {
    const produtos = await listarFavoritos();
    
    produtos.forEach(produto => {
        document.getElementById("listaProdutos").innerHTML += `
        <section class="produto">
            <div class="divAuxImagem" onclick="paginaProduto(${produto.idProduto})"><img src="${produto.imagem}" alt="${produto.nome}" class="imagemProduto"></div>
            <div class="titulo_produto">
                <div class="subdiv_produto">
                    <a onclick="paginaProduto(${produto.idProduto})" class="nomeProduto">${produto.nome}</a>
                    ${produto.quantidade > 0 ? '<p class="emEstoque">em estoque</p>' : '<p class="semEstoque">sem estoque</p>'}
                    <h6 class="precoProduto">Preço: ${Number(produto.preco).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</h6>
                </div>
                <div class="subdiv_produto_imagens">
                    <img src="../../assets/coracao_cheio.png" alt="Favoritar" class="coracao" onclick="favoritar(this, ${produto.idProduto})">
                    <img src="../../assets/adicionar_carrinho.png" alt="Adicionar ao Carrinho" class="carrinho" onclick="adicionarCarrinho(${produto.idProduto})">
                </div>
            </div>
        </section>
        `;
    });
}

function paginaProduto(idProduto) {
    window.location.href = `/p/${idProduto}`;
}

async function favoritar(elemento, idProduto) {
    const emailUsuario = localStorage.getItem("email");
    if(elemento.src.split("/").pop() === "coracao.png") {
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
            elemento.src = "../../assets/coracao_cheio.png";
        } else {
            alert(results.message);
        }
    } else {
        const response = await fetch(`/favorito/excluir/${emailUsuario}/${idProduto}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const results = await response.json();
    
        if (results.success) {
            elemento.src = "../../assets/coracao.png";
        } else {
            alert(results.message);
        }
    }
    
}

async function adicionarCarrinho(idProduto) {
    const emailUsuario = localStorage.getItem("email");
    const quantidade = 1;

    data = {
        emailUsuario,
        idProduto,
        quantidade
    };

    const response = await fetch("/carrinho/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const results = await response.json();

    if (results.success) {
        alert(results.message);
    } else {
        alert(results.message);
    }
}