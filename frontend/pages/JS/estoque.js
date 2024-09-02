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

document.body.classList.add('no-scrollbar');
verificarEstadoDeLogin();

function formatarPreco(campo) {
    let valor = campo.value.replace(/,/g, '.').replace(/[^0-9.]/g, '');

    const partes = valor.split('.');
    if (partes.length > 2) {
        valor = partes[0] + '.' + partes[1];
    }
    
    if (partes.length > 1 && partes[1].length > 2) {
        valor = partes[0] + '.' + partes[1].slice(0, 2);
    }

    campo.value = valor;
}

function botaoEditar() {
    document.getElementById('secao_editar_produto').style.display = 'flex';
}

function botaoFechar () {
    document.getElementById('secao_editar_produto').style.display = 'none';
    document.querySelectorAll('#nomeInput').forEach(input => input.value = '');
    document.querySelectorAll('#quantidadeInput').forEach(input => input.value = '');
    document.querySelectorAll('#precoInput').forEach(input => input.value = '');
    document.querySelectorAll('#editar_inputDescricao').forEach(input => input.value = '');
}

async function exibirProdutos() {
    const produtos = await selecionarProdutos();
    const lista_produtos = document.getElementById('secao_principal');
    produtos.forEach(produto => {
        let novoProduto = document.createElement('section');
        novoProduto.innerHTML = `
            <img src="${produto.imagem}" alt="Produto" id="imagemProduto">
            <div class="div_info">
                <h3 id="nome">${produto.nome}</h3>
                <h3 id="quant">Quantidade: ${produto.quantidade}</h3>
                <h3 id="preco">Preço: R$ ${produto.preco}</h3>
            </div>
            <div id="div_inputDescricao">
                <label for="descricao" id="labelDescricao">Descrição:</label>
                <textarea type="text" class="inputDescricao" id="inputDescricao" name="descricao" placeholder="Descrição aqui" textContent="${produto.descricao}" readonly></textarea>
            </div>
            <div class="div_editar" onclick="botaoEditar()">
                <img src="../../assets/criar.png" alt="Editar" id="imagemEditar">
                <h2 id="textoEditar">Editar</h2>
            </div>
            <div class="div_excluir">
                <img src="../../assets/lixo.png" alt="Excluir" id="imagemExcluir">
                <h2 id="textoExcluir">Excluir</h2>
            </div>
        `;
        novoProduto.className = 'secao_produto';
        lista_produtos.appendChild(novoProduto);
    });
}

async function selecionarProdutos() {
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