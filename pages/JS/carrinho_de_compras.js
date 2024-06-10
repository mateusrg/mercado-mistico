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



// Código da página em si

// O número ao lado de cada valor de personalização é o multiplicador, ou seja, o valor total do produto será multiplicado por aquele número
const precos = {
    "tapete voador": {
        "capacidade de voo": {
            "somente para cima": 1,
            "para cima e para baixo": 1.2,
            "todas as direcoes": 1.5
        },
        "distancia": {
            "500 m": 1,
            "1 km": 1.1,
            "5 km": 1.2,
            "10 km": 1.3,
            "50 km": 1.7,
            "100 km": 2,
            "ilimitado": 2.5
        },
        "peso suportado": {
            "50 kg": 1,
            "60 kg": 1.1,
            "80 kg": 1.15,
            "100 kg": 1.3,
            "120 kg": 1.45,
            "ilimitado": 1.7
        },
        "velocidade": {
            "10 km/h": 1,
            "20 km/h": 1.2,
            "40 km/h": 1.3,
            "60 km/h": 1.5,
            "80 km/h": 1.7,
            "ilimitado": 2.2
        },
        "tamanho": {
            "minusculo (300 cm²)": 1,
            "pequeno (5000 cm²)": 1.5,
            "medio (1,5 m²)": 1.7,
            "grande (3 m²)": 1.9,
            "enorme (15 m²)": 3
        }
    },
    "frasco de ar da lua": {
        "gravidade normal": {
            "nunca": 1,
            "1 mes": 1.2,
            "25 dias": 1.3,
            "20 dias": 1.4,
            "15 dias": 1.45,
            "10 dias": 1.5,
            "5 dias": 1.55,
            "1 dia": 1.6,
            "irrestrito": 2.3
        }
    },
    "bota de supervelocidade": {
        "freio": {
            "false": 1,
            "true": 3
        },
        "velocidade": {
            "80 km/h": 1,
            "100 km/h": 2.3,
            "120 km/h": 3.1,
            "140 km/h": 3.7,
            "160 km/h": 4.4,
            "ilimitado": 5
        }
    },
    "pocao da saude": {
        "penalidade": {
            "1 ano": 1,
            "8 meses": 1.2,
            "6 meses": 2,
            "3 meses": 2.7,
            "1 mes": 3.5,
            "15 dias": 5,
            "nenhuma": 7
        }
    },
    "anel de teletransporte": {
        "especificidade": {
            "ocidente e oriente": 1,
            "continente": 1.7,
            "pais": 2.5,
            "estado": 3,
            "cidade": 3.8,
            "raio de 10 km": 5,
            "raio de 5 km": 5.6,
            "qualquer lugar": 8
        },
        "timeout": {
            "1 hora": 1,
            "45 min": 1.3,
            "30 min": 1.5,
            "20 min": 1.7,
            "15 min": 2,
            "10 min": 2.3,
            "5 min": 2.4,
            "3 min": 2.5,
            "2 min": 2.55,
            "1 min": 2.6,
            "sem timeout": 3
        }
    },
    "borracha apaga-tudo": {
        "capacidade de apagamento": {
            "10 cm³/h": 1,
            "50 cm³/h": 2.2,
            "100 cm³/h": 3.5,
            "500 cm³/h": 4.3,
            "750 cm³/h": 5.8,
            "1 m³/h": 6.5,
            "ilimitado": 9
        },
        "capinha especial": {
            "false": 1,
            "true": 1.3
        }
    }
}

// O JSON retorna um objeto com o array carrinho dentro. Como só quero o array, puxei o objeto na posição ["carrinho"]
const carrinho = JSON.parse(localStorage.getItem("carrinho"))["carrinho"];

let idProduto = 0;
carrinho.forEach(produtoNoCarrinho => {
    let produto = {
        "nome":  "",
        "imagem": "",
        "preco": "",
        "personalizacoes": {}
    }

    produto["personalizacoes"] = produtoNoCarrinho["personalizacoes"];
    let preco;
    switch (produtoNoCarrinho["nome do produto"]) {
        case "tapete voador":
            produto["nome"] = "Tapete voador";
            produto["imagem"] = "../../assets/produtos/tapete.png";
            preco = 1599.99;
            preco = preco * precos["tapete voador"]["capacidade de voo"][produto["personalizacoes"]["capacidade de voo"]];
            preco = preco * precos["tapete voador"]["distancia"][produto["personalizacoes"]["distancia"]];
            preco = preco * precos["tapete voador"]["peso suportado"][produto["personalizacoes"]["peso suportado"]];
            preco = preco * precos["tapete voador"]["velocidade"][produto["personalizacoes"]["velocidade"]];
            preco = preco * precos["tapete voador"]["tamanho"][produto["personalizacoes"]["tamanho"]];
            break;
        case "frasco de ar da lua":
            produto["nome"] = "Frasco de ar da lua";
            produto["imagem"] = "../../assets/produtos/frasco.png";
            preco = 2499.99;
            preco = preco * precos["frasco de ar da lua"]["gravidade normal"][produto["personalizacoes"]["gravidade normal"]];
            break;
        case "bota de supervelocidade":
            produto["nome"] = "Bota de supervelocidade";
            produto["imagem"] = "../../assets/produtos/bota.png";
            preco = 1899.99;
            preco = preco * precos["bota de supervelocidade"]["freio"][produto["personalizacoes"]["freio"]];
            preco = preco * precos["bota de supervelocidade"]["velocidade"][produto["personalizacoes"]["velocidade"]];
            break;
        case "pocao da saude":
            produto["nome"] = "Poção da saúde";
            produto["imagem"] = "../../assets/produtos/pocao.png";
            preco = 3199.99;
            preco = preco * precos["pocao da saude"]["penalidade"][produto["personalizacoes"]["penalidade"]];
            break;
        case "anel de teletransporte":
            produto["nome"] = "Anel de teletransporte";
            produto["imagem"] = "../../assets/produtos/anel.png";
            preco = 8999.99;
            preco = preco * precos["anel de teletransporte"]["especificidade"][produto["personalizacoes"]["especificidade"]];
            preco = preco * precos["anel de teletransporte"]["timeout"][produto["personalizacoes"]["timeout"]];
            break;
        case "borracha apaga-tudo":
            produto["nome"] = "Borracha apaga-tudo";
            produto["imagem"] = "../../assets/produtos/borracha.png";
            preco = 11999.99;
            preco = preco * precos["borracha apaga-tudo"]["capacidade de apagamento"][produto["personalizacoes"]["capacidade de apagamento"]];
            break;
    }
    // A linha abaixo converte o número para real e troca os centavos pra "99" pra ficar mais parecendo loja mesmo :D
    produto["preco"] = preco.toLocaleString("pt-br", {style: "currency", currency: "BRL"}).slice(0, -2) + "99";

    // As linhas abaixo só colocam o produto na página. Não tô fazendo com "display: none", tô realmente criando o elemento no JS e uppando ele.
    const elementoProduto = document.createElement("section");
    elementoProduto.className = "secaoProduto";
    elementoProduto.id = `p${idProduto}`;
    elementoProduto.innerHTML = `
    <div class="checkbox escondido" onclick="marcaOuDesmarca('p${idProduto}')"></div>
    <img src="../../assets/checkbox_marcado.png" alt="Checkbox marcado" class="checkboxMarcado" onclick="marcaOuDesmarca('p${idProduto}')">
    <img src="${produto["imagem"]}" alt="${produto["nome"]}" class="imagemProduto">
    <div class="direitaImagem">
        <p class="nomeProduto">${produto["nome"]}</p>
        <h5 class="emEstoque">em estoque</h5>
        <p class="preco">${produto["preco"]}</p>
    </div>
    <div class="interacoesProduto">
        <button class="botaoPersonalizar">Personalizações</button>
        <div class="excluirE">
            <img src="../../assets/lixo.png" alt="Excluir" class="excluir" onclick="excluir('p${idProduto}')">
        </div>
    </div>
    `;
    const listaProdutos = document.querySelector("#listaProdutos");
    listaProdutos.appendChild(elementoProduto);
    idProduto++;
});
atualizaContadorItens();

function marcaOuDesmarca(idProduto) {
    const secao = document.getElementById(idProduto);
    secao.querySelector(".checkbox").classList.toggle("escondido");
    secao.querySelector(".checkboxMarcado").classList.toggle("escondido");
    const estaMarcado = secao.querySelector(".checkbox").classList.contains("escondido");
    if (!estaMarcado) {
        document.querySelector("#selecionarTodosMarcado").classList.add("escondido");
        document.querySelector("#selecionarTodos").classList.remove("escondido");
        esmaeceSecao(secao, true);
        atualizaContadorItens();
        return
    }
    esmaeceSecao(secao, false);
    atualizaContadorItens();
}

function marcaTodos() {
    document.querySelector("#selecionarTodosMarcado").classList.toggle("escondido");
    document.querySelector("#selecionarTodos").classList.toggle("escondido");
    const estaMarcado = document.querySelector("#selecionarTodos").classList.contains("escondido");
    if (estaMarcado) {
        const secoes = document.querySelectorAll(".secaoProduto");
        secoes.forEach(sec => {
            esmaeceSecao(sec, false);
            sec.querySelector(".checkbox").classList.add("escondido");
            sec.querySelector(".checkboxMarcado").classList.remove("escondido");
        });
    }
    atualizaContadorItens();
}

function esmaeceSecao(secao, deveEsmaecer) {
    const classes = [".checkbox", ".checkboxMarcado", ".imagemProduto", ".direitaImagem"];
    if (deveEsmaecer) {
        classes.forEach(classe => secao.querySelector(classe).classList.add("secaoDesmarcada"));
        return
    }
    classes.forEach(classe => secao.querySelector(classe).classList.remove("secaoDesmarcada"));
}

function excluir(idProduto) {
    const secao = document.getElementById(idProduto);
    secao.remove();
    id = Number(idProduto.slice(1));

    const secoes = document.querySelectorAll(".secaoProduto");
    secoes.forEach(sec => {
        const idSecao = Number(sec.id.slice(1));
        if (idSecao > id) {
            // Quando eu excluo um produto, no carrinho os índices são atualizados, mas os IDs no HTML não mudam.
            // Então preciso subtrair os do HTML para ficarem iguais aos do carrinho também.
            sec.id = `p${idSecao - 1}`;
            sec.querySelector(".checkbox").setAttribute("onclick", `marcaOuDesmarca('p${idSecao - 1}')`);
            sec.querySelector(".checkboxMarcado").setAttribute("onclick", `marcaOuDesmarca('p${idSecao - 1}')`);
            sec.querySelector(".excluir").setAttribute("onclick", `excluir('p${idSecao - 1}')`);
        }
    });
    const carrinhoAtualizado = JSON.parse(localStorage.getItem("carrinho"))["carrinho"];
    carrinhoAtualizado.splice(id, 1);
    localStorage.setItem("carrinho", JSON.stringify({carrinho: carrinhoAtualizado}));
    atualizaContadorItens();
}

function atualizaContadorItens() {
    let quantidadeMarcados = 0;
    const checkboxesMarcados = document.querySelectorAll(".checkboxMarcado");
    checkboxesMarcados.forEach(checkbox => {
        if (!checkbox.classList.contains("escondido") && checkbox.id != "selecionarTodosMarcado") {
            quantidadeMarcados++;
        }
    })
    document.querySelector("#todosItens").innerHTML = `Todos os itens (${quantidadeMarcados})`;
}

document.querySelector("#botaoFinalizarCompra").addEventListener("click", () => {
    const secoes = document.querySelectorAll(".secaoProduto");
    let idsSecoesSelecionadas = [];
    let precoTotal = 0;
    secoes.forEach(sec => {
        if (!sec.querySelector(".checkboxMarcado").classList.contains("escondido")) {
            idsSecoesSelecionadas.push(Number(sec.id.slice(1)));
            precoTotal += Number(sec.querySelector(".preco").textContent.replace(/\D/g, '')) / 100;
        }
    });
    if (idsSecoesSelecionadas.length > 0) {
        localStorage.setItem("indiceProdutosSelecionados", JSON.stringify(idsSecoesSelecionadas));
        localStorage.setItem("precoTotal", JSON.stringify(precoTotal));
        window.location.href = './finalizar_compra.html';
    }
});