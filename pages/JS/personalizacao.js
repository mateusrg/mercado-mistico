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

function verificarProduto () {
    let produtoSelecionado = JSON.parse(localStorage.getItem("produtoSelecionado"));
    console.log(produtoSelecionado);

    switch (localStorage.getItem('produtoSelecionado'["nome"])) {
        case 'tapete':
            document.getElementById('secaoTapete').style.display = 'flex';
            document.getElementById('secaoFrasco').style.display = 'none';
            document.getElementById('secaoBota').style.display = 'none';
            document.getElementById('secaoPocao').style.display = 'none';
            document.getElementById('secaoAnel').style.display = 'none';
            document.getElementById('secaoBorracha').style.display = 'none';
            break;

        case 'frasco':
            document.getElementById('secaoTapete').style.display = 'none';
            document.getElementById('secaoFrasco').style.display = 'flex';
            document.getElementById('secaoBota').style.display = 'none';
            document.getElementById('secaoPocao').style.display = 'none';
            document.getElementById('secaoAnel').style.display = 'none';
            document.getElementById('secaoBorracha').style.display = 'none';
            break;

        case 'bota':
            document.getElementById('secaoTapete').style.display = 'none';
            document.getElementById('secaoFrasco').style.display = 'none';
            document.getElementById('secaoBota').style.display = 'flex';
            document.getElementById('secaoPocao').style.display = 'none';
            document.getElementById('secaoAnel').style.display = 'none';
            document.getElementById('secaoBorracha').style.display = 'none';
            break;

        case 'pocao':
            document.getElementById('secaoTapete').style.display = 'none';
            document.getElementById('secaoFrasco').style.display = 'none';
            document.getElementById('secaoBota').style.display = 'none';
            document.getElementById('secaoPocao').style.display = 'flex';
            document.getElementById('secaoAnel').style.display = 'none';
            document.getElementById('secaoBorracha').style.display = 'none';
            break;

        case 'anel':
            document.getElementById('secaoTapete').style.display = 'none';
            document.getElementById('secaoFrasco').style.display = 'none';
            document.getElementById('secaoBota').style.display = 'none';
            document.getElementById('secaoPocao').style.display = 'none';
            document.getElementById('secaoAnel').style.display = 'flex';
            document.getElementById('secaoBorracha').style.display = 'none';
            break;

        case 'borracha':
            document.getElementById('secaoTapete').style.display = 'none';
            document.getElementById('secaoFrasco').style.display = 'none';
            document.getElementById('secaoBota').style.display = 'none';
            document.getElementById('secaoPocao').style.display = 'none';
            document.getElementById('secaoAnel').style.display = 'none';
            document.getElementById('secaoBorracha').style.display = 'flex';
            break;

    }
}

function voltarPagina() {
    window.history.back();
}

function clicarMaisSemBotao(event) {
    event.preventDefault();
    const imagem = event.target; // Capturar o elemento da imagem clicada
    const textoMaisProximo = event.target.closest('.subdivAdicional').querySelector('.subdivAdicional_Texto').textContent;
    console.log(textoMaisProximo);

    
    if (imagem.src.includes('mais.png')) {
        switch (textoMaisProximo) {
            case 'Ativar e desativar a qualquer momento':
                // Armazenar o valor no localStorage com a chave 'ativarDesativar'
                localStorage.setItem('ativarDesativar', 'true');
                break;
    
            case 'Tem freio':
                // Armazenar o valor no localStorage com a chave 'temFreio'
                localStorage.setItem('temFreio', 'true');
                break;
    
            case 'Velocidade extra':
                // Armazenar o valor no localStorage com a chave 'velocidadeExtra'
                localStorage.setItem('velocidadeExtra', 'true');
                break;
    
            case 'Capinha especial (para evitar de apagar a própria mão)':
                // Armazenar o valor no localStorage com a chave 'capinhaEspecial'
                localStorage.setItem('capinhaEspecial', 'true');
                break;
        }
        imagem.src = '../../assets/menos.png';
    } else {
        switch (textoMaisProximo) {
            case 'Ativar e desativar a qualquer momento':
                // Armazenar o valor no localStorage com a chave 'ativarDesativar'
                localStorage.setItem('ativarDesativar', 'false');
                break;
    
            case 'Tem freio':
                // Armazenar o valor no localStorage com a chave 'temFreio'
                localStorage.setItem('temFreio', 'false');
                break;
    
            case 'Velocidade extra':
                // Armazenar o valor no localStorage com a chave 'velocidadeExtra'
                localStorage.setItem('velocidadeExtra', 'false');
                break;
    
            case 'Capinha especial (para evitar de apagar a própria mão)':
                // Armazenar o valor no localStorage com a chave 'capinhaEspecial'
                localStorage.setItem('capinhaEspecial', 'false');
                break;
        }
        imagem.src = '../../assets/mais.png';
    }
}

/**
 * Chamado quando o usuário clica no botão de "Qtd.", para abrir o dropdown e ele
 * poder alterar o valor
 */
function mudarQuantidade(idProduto) {
    // Esse "p" é de produto, porque o ID não pode ser só o número
    const secaoProduto = document.getElementById("p" + idProduto);

    // Seleciona o dropdown, a lista em si, a "ul"
    const listaDropdown = secaoProduto.querySelector(".dropdown");

    // Tira o "escondido" e coloca o "visível", fazendo a lista aparecer
    listaDropdown.classList.remove("escondido");
    listaDropdown.classList.add("visivel");

    // Adiciona um div temporária invisível que fecha o dropdown caso a pessoa clique fora dele
    const divTemporaria = document.createElement("div");
    divTemporaria.id = "tempFechaDropdown";
    document.body.appendChild(divTemporaria);

    // Configurando para ela fechar o dropdown e sumir quando for clicada
    const tempFechaDropdown = document.querySelector("#tempFechaDropdown");
    tempFechaDropdown.addEventListener("click", () => {
        // Verifica se todos os dropdowns estão abertos e os fecha
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            if (dropdown.classList.contains("visivel")) {
                listaDropdown.classList.remove("visivel");
                listaDropdown.classList.add("escondido");
            }
        });
    
        // Apaga a div pra conseguir clicar nos botões de novo
        tempFechaDropdown.remove();
    });
}

/** Altera o valor selecionado no dropdown */
function selecionaValorDropdown(valor, idProduto) {
    const secoesProdutos = document.querySelectorAll(".secaoProduto");
    let botaoQuantidade;

    const imagem = event.target; // Capturar o elemento da imagem clicada
    const secaoProduto = imagem.closest('.secaoProduto'); // Encontrar a seção do produto mais próxima
    const subdivAdicionalTexto = secaoProduto.querySelector('.subdivAdicional_Texto'); // Encontrar o texto associado

    // Pega o botão que foi clicado
    secoesProdutos.forEach(secaoProduto => {
        if (secaoProduto.id === `p${idProduto}`) {
            botaoQuantidade = secaoProduto.querySelector(".botaoQuantidade");
        }
    });

    // Coloca o novo valor no botão, mantendo a seta
    botaoQuantidade.innerHTML = `${valor}<img src="../../assets/seta.svg" alt="Seta" id="seta">`;

    // Fecha todos os dropdowns abertos (por garantia)
    const listaDropdown = document.querySelectorAll(".dropdown");
    listaDropdown.forEach(dropdown => {
        if (dropdown.classList.contains("visivel")) {
            dropdown.classList.remove("visivel");
            dropdown.classList.add("escondido");
        }
    });

    // Verifica se o texto da subdivisão adicional contém o prefixo
    if (subdivAdicionalTexto.innerText.includes(":")) {
        // Extrai o prefixo atual (ex: "Direção do voo:")
        const prefixo = subdivAdicionalTexto.innerText.split(":")[0].trim() + ":";

        // Substitui a parte após os ":" no texto da subdivisão adicional
        subdivAdicionalTexto.innerText = `${prefixo} ${valor}`;
    } else {
        // Se não houver prefixo, apenas define o texto da subdivisão adicional como o valor selecionado
        subdivAdicionalTexto.innerText = valor;
    }
}

function salvarPersonalizacoes() {
    const personalizacoes = {};
    const personalizacaoElems = document.querySelectorAll('.subdivAdicional_Texto');

    personalizacaoElems.forEach(elem => {
        const texto = elem.innerText.split(": ");
        if (texto.length === 2) {
            const chave = texto[0].trim().toLowerCase();
            const valor = texto[1].trim();
            personalizacoes[chave] = valor;
        }
    });

    // Salvar as personalizações no localStorage
    localStorage.setItem('personalizacoes', JSON.stringify(personalizacoes));

    // Redirecionar para a página do produto
    window.location.href = 'pagina_produto.html';
}

// Chama a função verificarEstadoDeLogin quando o DOM estiver totalmente carregado
verificarEstadoDeLogin();

verificarProduto();