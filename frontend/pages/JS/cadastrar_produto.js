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

async function cadastrar(event) {
    event.preventDefault();

    const imagem = document.getElementById("imagemInput").value;
    const nome = document.getElementById("nomeInput").value;
    const preco = document.getElementById("precoInput").value;
    const quantidade = document.getElementById("quantidadeInput").value;
    const descricao = document.getElementById("descricaoInput").value;

    const data = {
        nome,
        preco,
        descricao,
        imagem,
        quantidade
    }

    const response = await fetch('/cad_produto', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const results = await response.json();

    alert(results.message);
    if (results.success) {
        window.location.href = "/cadastrar_produto"
    }
}

function mostrarImagem(event) {
    const input = event.target;
    const preview = document.getElementById('imagemPreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.style.backgroundImage = `url(${e.target.result})`;
            preview.innerHTML = ''; // Remove o texto do placeholder
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('imagemPreview').addEventListener('click', () => {
    document.getElementById('imagemInput').click();
});

// Dropdown
function abrirDropdown() {
    const dropdown = document.getElementById("itensDropdown");
    // Alterna entre block e none
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        document.body.classList.remove('no-scrollbar');
    } else {
        dropdown.style.display = "block";
        document.body.classList.add('no-scrollbar');
    }
}

function selecionarCategoria(categoria) {
    // Atualiza o texto do input com a categoria selecionada
    document.getElementById("categoriaInput").value = categoria;
    // Fecha o dropdown após a seleção
    document.getElementById("itensDropdown").classList.remove("show");
}

function abrirCategoria () {
    document.getElementById('secao_criar_categoria').style.display = 'flex';
}

function botaoFechar () {
    const dropdown = document.getElementById("itensDropdown");
    document.getElementById('secao_criar_categoria').style.display = 'none';
    dropdown.style.display = "none";
    document.body.classList.remove('no-scrollbar');
}