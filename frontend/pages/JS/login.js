async function realizarLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    const data = {
        email,
        senha
    }

    const response = await fetch('http://localhost:3000/login/verificar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if(results.success) {
        alert(results.message);
        localStorage.setItem('estaLogado', 'true');
        localStorage.setItem('nomeUsuario', results.nome);
        window.location.href = '/usuario';
    } else {
        alert(results.message);
    }
}

function olhoFechado() {

    if (document.getElementById('password').type === 'password') {

        document.getElementById("olho").src = "../../assets/olho_fechado.png";
        document.getElementById('password').type = 'text';

    } else {

        document.getElementById("olho").src = "../../assets/olho.png";
        document.getElementById('password').type = 'password';

    }
}

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

// Dropdown
function abrirDropdown() {
    document.getElementById("itensDropdown").classList.toggle("show");
    document.getElementById("botaoQuantidade").style.borderBottomRightRadius = "0";
    document.getElementById("botaoQuantidade").style.borderBottomLeftRadius = "0";
}

function selecionarQuantidade(quantidade) {
    // Atualiza o texto do botão com a quantidade selecionada
    document.getElementById("botaoQuantidade").innerHTML = `Quantidade: ${quantidade} <img src="../../assets/seta.svg" alt="Seta" id="seta">`;
    // Fecha o dropdown após a seleção
    document.getElementById("itensDropdown").classList.remove("show");

    document.getElementById("botaoQuantidade").style.borderBottomRightRadius = "1.5vh";
    document.getElementById("botaoQuantidade").style.borderBottomLeftRadius = "1.5vh";
}

// Fechar o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.botao-quantidade')) {
        let dropdowns = document.getElementsByClassName("itens-dropdown");
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');

                document.getElementById("botaoQuantidade").style.borderBottomRightRadius = "1.5vh";
                document.getElementById("botaoQuantidade").style.borderBottomLeftRadius = "1.5vh";
            }
        }
    }
}