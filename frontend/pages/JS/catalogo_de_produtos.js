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

function produtoTapete () {
    const produto = {
        "nome": "tapete voador",
        "personalizacoes": {
            "capacidade de voo": "todas as direcoes",
            "distancia": "ilimitado",
            "peso suportado": "ilimitado",
            "velocidade": "ilimitado",
            "tamanho": "enorme (15 m²)"
        }
    }
    localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
    window.location.href = '/p/1';
}

function produtoFrasco () {
    const produto = {
        "nome": "frasco de ar da lua",
        "personalizacoes": {
            "gravidade normal": "irrestrito",
        }
    }
    localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
    window.location.href = '/p/2';
}

function produtoBota () {
    const produto = {
        "nome": "bota de supervelocidade",
        "personalizacoes": {
            "freio": "true",
            "velocidade": "ilimitado"
        }
    }
    localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
    window.location.href = '/p/3';
}

function produtoPocao () {
    const produto = {
        "nome": "pocao da saude",
        "personalizacoes": {
            "penalidade": "nenhuma"
        }
    }
    localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
    window.location.href = '/p/4';
}

function produtoAnel () {
    const produto = {
        "nome": "anel de teletransporte",
        "personalizacoes": {
            "especificidade": "qualquer lugar",
            "timeout": "sem timeout"
        }
    }
    localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
    window.location.href = '/p/5';
}

function produtoBorracha () {
    const produto = {
        "nome": "borracha apaga-tudo",
        "personalizacoes": {
            "capacidade de apagamento": "ilimitado",
            "capinha especial": "true"
        }
    }
    localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
    window.location.href = '/p/6';
}