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
    document.body.classList.add('no-scrollbar');
}

function botaoFechar () {
    document.getElementById('secao_adicionar_endereco').style.display = 'none';
    document.querySelectorAll('.inputEndereco').forEach(input => input.value = '');
    document.getElementById('adicionarEndereco').style.backgroundColor = 'var(--vermelhoAlaranjado)';
    document.body.classList.remove('no-scrollbar');
}

async function enviar(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeInput").value;
    const CEP = document.getElementById("cepInput").value;
    const endereco = document.getElementById("enderecoInput").value;
    const numeroResidencia = document.getElementById("numeroInput").value;
    const complemento = document.getElementById("complementoInput").value;
    const bairro = document.getElementById("bairroInput").value;
    const cidade = document.getElementById("cidadeInput").value;
    const estado = document.getElementById("estadoInput").value;
    const emailUsuario = localStorage.getItem("email");
    let enderecoPadrao = false;
    if (document.getElementById('imagemCheckbox').src.endsWith("checkbox_marcado.png")) {
        enderecoPadrao = true;
    }

    const data = {
        nome,
        CEP,
        endereco,
        numeroResidencia,
        complemento,
        bairro,
        cidade,
        estado,
        enderecoPadrao,
        emailUsuario
    }

    const response = await fetch('/adicionar_endereco', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    const results = await response.json();

    if(!results.success) {
        alert(results.message);
    } else {
        document.getElementById("nomeInput").value = '';
        document.getElementById("cepInput").value = '';
        document.getElementById("enderecoInput").value = '';
        document.getElementById("numeroInput").value = '';
        document.getElementById("complementoInput").value = '';
        document.getElementById("bairroInput").value = '';
        document.getElementById("cidadeInput").value = '';
        document.getElementById("estadoInput").value = '';
        document.getElementById('imagemCheckbox').src = "../../assets/checkbox_desmarcado.png";
    }
}

function formatarCEP(campo) {
    let cep = campo.value.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5);
    }
    campo.value = cep;
}

function formatarNumero(campo) {
    let numero = campo.value;
    if (numero.length > 60) {
        numero = numero.slice(0, 60);
    }
}

document.getElementById("cepInput").addEventListener("blur", async function() {
    let cep = document.getElementById("cepInput").value;

    // Remove o hífen do CEP
    cep = cep.replace(/-/g, '');

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            document.getElementById("cepInput").value = '';
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
});