async function verificarEstadoDeLogin() {
    const nome = localStorage.getItem('nome');    
    if (nome) {
        // Usuário está logado, mostrar elementos do cabeçalho logado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'none';
        document.getElementById('botoes_header_direita_logado').style.display = 'flex';
        document.getElementById('tituloBemVindo').innerText = 'Olá, ' + nome;

        const email = localStorage.getItem("email");
        const senha = localStorage.getItem("senha");
        const response = await fetch(`/usuario/is_adm/${email}/${senha}`);
        
        const results = await response.json();
    
        if (results.success && results.data === 1) {
            window.location.href = "/usuario_adm";
        }
    } else {
        // Usuário está deslogado, mostrar elementos do cabeçalho deslogado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
        document.getElementById('botoes_header_direita_logado').style.display = 'none';
        window.location.href = '/login';
    }
}

verificarEstadoDeLogin();
// mostrarFavoritos();

function sairConta () {
    // Usuário deslogou, mostrar elementos do cabeçalho deslogado
    document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
    document.getElementById('botoes_header_direita_logado').style.display = 'none';

    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('senha');

    alert('Usuário Deslogado!');

    window.location.href = '/login';
}

function editarUsuario() {
    document.getElementById('secaoeditarUsuario').style.display = 'flex';
    document.querySelector('#nomeInput').value = `${localStorage.getItem('nome')}`;
}

function botaoFechar () {
    document.getElementById('secaoeditarUsuario').style.display = 'none';
    document.querySelector('#nomeInput').value = '';
    document.querySelector('#senhaAtual').value = '';
    document.querySelector('#senhaNova').value = '';
}

async function enviarNovoUsuario() {
    const emailUsuario = localStorage.getItem("email");
    const nome = document.getElementById("nomeInput").value;
    const senhaAtual = document.getElementById("senhaAtual").value;
    const senhaNova = document.getElementById("senhaNova").value;

    const data = {
        emailUsuario,
        nome,
        senhaAtual,
        senhaNova
    }

    const response = await fetch("/usuario/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const results = await response.json();

    alert(results.message);
    if (results.success) {
        localStorage.setItem("nome", nome);
        localStorage.setItem("senha", senhaNova);
        window.location.href = "/usuario";
    }
}

async function excluirConta() {
    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");

    const data = {
        email,
        senha
    }

    const response = await fetch(`/usuario/excluir/${email}/${senha}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    const results = await response.json();
    
    alert(results.message);
    if (results.success) {
        sairConta();
    }
}

// let favoritos = [];

// async function listarFavoritos() {
//     const emailUsuario = localStorage.getItem("email");

//     const response = await fetch(`/favorito/listar/${emailUsuario}`);
//     const results = await response.json();

//     if (results.success) {
//         const listaVazia = document.getElementById('listaVazia');
//         const produtosFavoritos = document.getElementById('produtosFavoritos');

//         console.log(favoritos)
//         favoritos = results.data;
//         console.log(favoritos)


//         if (favoritos.length === 0) {
//             listaVazia.style.display = "block";
//             produtosFavoritos.style.display = "none";
//         } else {
//             listaVazia.style.display = "none";
//             produtosFavoritos.style.display = "flex";

//             mostrarFavoritos();
//         }
//     } else {
//         alert(results.message);
//     }
// }

// async function mostrarFavoritos() {
//     const produtos = await listarFavoritos();

//     console.log(favoritos)

//     const produtoImagens = document.getElementById('produtosFavoritos').querySelectorAll('img');

//     for (let i = 0; i <= 3; i++) {
//         const produto = favoritos[currentIndex + (i - 1)];
//         if (produto) {
//             produtoImagens[i].src = produto.imagem;
//             produtoImagens[i].style.display = "block";
//         } else {
//             produtoImagens[i].style.display = "none";
//         }
//     }
// }