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

function marcarCheckbox() {
    let img = document.getElementById('imagemCheckbox');
    let src = img.src;

    if (src.endsWith("checkbox_marcado.png")) {
        img.src = "../../assets/checkbox_desmarcado.png";
    } else {
        img.src = "../../assets/checkbox_marcado.png";
    }
}

function botaoAdicionar() {
    document.getElementById('secao_adicionar_endereco').style.display = 'flex';
    document.getElementById('adicionarEndereco').style.backgroundColor = 'var(--azulEscuro)';
}

function botaoFechar () {
    document.getElementById('secao_adicionar_endereco').style.display = 'none';
    document.querySelectorAll('.inputEndereco').forEach(input => input.value = '');
    document.getElementById('adicionarEndereco').style.backgroundColor = 'var(--vermelhoAlaranjado)';
}

async function enviar(event) {
    event.preventDefault();

    const cep = document.getElementById("cepInput").value;
    const endereco = document.getElementById("enderecoInput").value;
    const numero = document.getElementById("numeroInput").value;
    const complemento = document.getElementById("complementoInput").value;
    const bairro = document.getElementById("bairroInput").value;
    const cidade = document.getElementById("cidadeInput").value;
    const estado = document.getElementById("estadoInput").value;

    const data = {
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado
    }

    const response = await fetch('http://localhost:3000/enderecos/adicionar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    console.log(results)
    if(results.success) {
        console.log(response);
        alert(results.message);
    } else {
        alert(results.message);
    }
}

document.getElementById("cepInput").addEventListener("blur", async function() {
    let cep = document.getElementById("cepInput").value;

    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            document.getElementById("enderecoInput").value = data.logradouro;
            document.getElementById("bairroInput").value = data.bairro;
            document.getElementById("cidadeInput").value = data.localidade;
            document.getElementById("estadoInput").value = data.uf;
        } catch (error) {
            alert("Erro ao buscar o CEP.");
        }
    } else {
        alert("CEP inválido. Deve conter 8 dígitos.");
        document.getElementById("cepInput").value = '';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/enderecos")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const secaoEnderecos = document.getElementById("secao_enderecos");

                data.data.forEach(endereco => {
                    const divCaixa = document.createElement("div");
                    divCaixa.classList.add("divCaixa");

                    divCaixa.innerHTML = `
                        <div class="subdivCaixa_cima">
                            <h4 class="textosMenores" id="nomeCompleto">${endereco.nomeCompleto}</h4>
                            <h4 class="textosMenores" id="numeroCelular">${endereco.numeroCelular}</h4>
                        </div>
                        <h4 class="textosMenores" id="endereco">${endereco.endereco}, ${endereco.numeroResidencia} - ${endereco.bairro}</h4>
                        <div class="subdivCaixa_baixo">
                            <h4 class="textosMenores" id="cep">${endereco.CEP}</h4>
                            <div id="subdivBotao">
                                <img src="../../assets/lixo.png" alt="Excluir" id="excluir">
                                <h4 onclick="mudarTexto()" class="textosMenores" id="editar">Editar</h4>
                            </div>
                        </div>
                    `;

                    secaoEnderecos.appendChild(divCaixa);
                });
            } else {
                console.error("Erro ao carregar endereços:", data.message);
            }
        })
        .catch(err => console.error("Erro na requisição:", err));
});