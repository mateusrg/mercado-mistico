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

function exibirProdutosCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')).carrinho || [];
    const listaImagens = document.getElementById('listaImagens');
    listaImagens.innerHTML = '';

    // Adiciona as 4 primeiras imagens
    const indiceProdutosSelecionados = JSON.parse(localStorage.getItem("indiceProdutosSelecionados"));
    let contador = 1;
    indiceProdutosSelecionados.forEach(i => {
        if (contador <= 4) {
            const nomeProduto = carrinho[i]['nome do produto'];
            const img = document.createElement('img');
            img.src = getImagemProduto(nomeProduto);
            img.alt = nomeProduto;
            img.classList.add("imagem"); // Adicionando a classe "imagem"
            listaImagens.appendChild(img);
            contador++;
        }
    });

    // Exibe o ícone "mais" se houver mais de 4 produtos no carrinho
    if (indiceProdutosSelecionados.length > 4) {
        document.getElementById('iconMais').style.display = 'inline';
    } else {
        document.getElementById('iconMais').style.display = 'none';
    }
}

function getImagemProduto(nomeProduto) {
    switch (nomeProduto) {
        case "tapete voador":
            return "../../assets/produtos/tapete.png";
        case "frasco de ar da lua":
            return "../../assets/produtos/frasco.png";
        case "bota de supervelocidade":
            return "../../assets/produtos/bota.png";
        case "pocao da saude":
            return "../../assets/produtos/pocao.png";
        case "anel de teletransporte":
            return "../../assets/produtos/anel.png";
        case "borracha apaga-tudo":
            return "../../assets/produtos/borracha.png";
        default:
            return "../../assets/produtos/default.png";
    }
}

let valorInputNumeroCelular = '';
let valorInputEndereco = '';
let valorInputCep = '';

let textoOriginalNumeroCelular = '';
let textoOriginalEndereco = '';
let textoOriginalCep = '';

function mudarTexto() {
    if (document.getElementById("editar").innerText === "Salvar") {
        document.getElementById("editar").innerText = "Editar";

        // Capturar os novos valores dos campos de entrada
        valorInputNumeroCelular = document.getElementById("numeroCelular").value;
        valorInputEndereco = document.getElementById("endereco").value;
        valorInputCep = document.getElementById("cep").value;

        // Substituir os campos de entrada pelos elementos h4 com os novos valores
        const novoH4NumeroCelular = document.createElement("h4");
        novoH4NumeroCelular.className = "textosMenores";
        novoH4NumeroCelular.id = "numeroCelular";
        novoH4NumeroCelular.innerText = valorInputNumeroCelular || textoOriginalNumeroCelular;
        document.getElementById("numeroCelular").replaceWith(novoH4NumeroCelular);

        const novoH4Endereco = document.createElement("h4");
        novoH4Endereco.className = "textosMenores";
        novoH4Endereco.id = "endereco";
        novoH4Endereco.innerText = valorInputEndereco || textoOriginalEndereco;
        document.getElementById("endereco").replaceWith(novoH4Endereco);

        const novoH4Cep = document.createElement("h4");
        novoH4Cep.className = "textosMenores";
        novoH4Cep.id = "cep";
        novoH4Cep.innerText = valorInputCep || textoOriginalCep;
        document.getElementById("cep").replaceWith(novoH4Cep);

    } else {
        document.getElementById("editar").innerText = "Salvar";

        textoOriginalNumeroCelular = document.getElementById("numeroCelular").innerText;
        textoOriginalEndereco = document.getElementById("endereco").innerText;
        textoOriginalCep = document.getElementById("cep").innerText;

        const novoInputNumeroCelular = document.createElement("input");
        novoInputNumeroCelular.className = "textosMenores inputEditar"; // Adicionando a classe inputEditar
        novoInputNumeroCelular.id = "numeroCelular";
        novoInputNumeroCelular.placeholder = textoOriginalNumeroCelular || valorInputNumeroCelular;
        novoInputNumeroCelular.type = "number"; // Definindo o tipo como "number" para aceitar apenas números
        document.getElementById("numeroCelular").replaceWith(novoInputNumeroCelular);

        const novoInputEndereco = document.createElement("input");
        novoInputEndereco.className = "textosMenores inputEditar"; // Adicionando a classe inputEditar
        novoInputEndereco.id = "endereco";
        novoInputEndereco.placeholder = textoOriginalEndereco || valorInputEndereco;
        document.getElementById("endereco").replaceWith(novoInputEndereco);

        const novoInputCep = document.createElement("input");
        novoInputCep.className = "textosMenores inputEditar"; // Adicionando a classe inputEditar
        novoInputCep.id = "cep";
        novoInputCep.placeholder = textoOriginalCep || valorInputCep;
        novoInputCep.type = "number"; // Definindo o tipo como "number" para aceitar apenas números
        document.getElementById("cep").replaceWith(novoInputCep);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    verificarEstadoDeLogin();
    exibirProdutosCarrinho();
});

let precoTotal = Number(localStorage.getItem("precoTotal")).toLocaleString("pt-br", {style: "currency", currency: "BRL"});
console.log(precoTotal);
document.querySelector("#preco_total").innerText = precoTotal;

function finalizarCompra() {
    const itensCarrinhos = JSON.parse(localStorage.getItem("carrinho"))["carrinho"];
    const idsParaExcluir = JSON.parse(localStorage.getItem("indiceProdutosSelecionados"));
    console.log(idsParaExcluir)
    const itensNaoSelecionados = itensCarrinhos.filter(produto => !idsParaExcluir.includes(itensCarrinhos.indexOf(produto)));
    console.log(itensNaoSelecionados);
    localStorage.setItem("carrinho", JSON.stringify({carrinho: itensNaoSelecionados}));
    window.location.href = "/usuario";
}