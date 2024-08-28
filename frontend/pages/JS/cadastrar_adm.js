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
    let img = document.getElementById('checkbox');
    let src = img.src;

    if (src.endsWith("checkbox_azul_marcado.png")) {
        img.src = "../../assets/checkbox_azul.png";
    } else {
        img.src = "../../assets/checkbox_azul_marcado.png";
    }
}

function adicionarAdm() {
    let checkbox = document.getElementById('checkbox');
    let checkboxSrc = checkbox.src.split('/').pop();

    if (checkboxSrc === "checkbox_azul_marcado.png") {
        let email = document.querySelector('.email_adicionar').value.trim();

        if (email) {
            let listaAdm = document.getElementById('lista_adm');
            let novaEntrada = document.createElement('div');
            novaEntrada.className = 'entradas';

            // Obtém o número atual de administradores
            let numeroAdm = listaAdm.getElementsByClassName('entradas').length + 1;

            novaEntrada.innerHTML = `
                <label class="label_lista" for="email">Administrador ${numeroAdm}</label>
                <div class="input">
                    <input type="email" class="email" name="email" value="${email}" placeholder="Email" readonly>
                    <div class="div_excluir">
                        <img src="../../assets/lixo.png" alt="Excluir" class="imagem_excluir" onclick="excluirAdm(this)">
                        <h4 class="texto_excluir">Excluir</h4>
                    </div>
                </div>
            `;

            listaAdm.appendChild(novaEntrada);

            // Limpa o input de email
            emailInput.value = '';
        } else {
            alert("Insira um email válido!");
        }
    } else {
        alert("Você deve aceitar os termos!");
    }
}

function excluirAdm(element) {
    let entrada = element.closest('.entradas');
    entrada.remove();
    
    // Atualiza a numeração após a exclusão
    atualizarNumeracao();
}

function atualizarNumeracao() {
    let listaAdm = document.getElementById('lista_adm');
    let entradas = listaAdm.getElementsByClassName('entradas');
    
    for (let i = 0; i < entradas.length; i++) {
        let label = entradas[i].querySelector('.label_lista');
        label.textContent = `Administrador ${i + 1}`;
    }
}