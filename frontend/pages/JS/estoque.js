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

document.body.classList.add('no-scrollbar');
verificarEstadoDeLogin();

function formatarPreco(campo) {
    let valor = campo.value.replace(/,/g, '.').replace(/[^0-9.]/g, '');

    const partes = valor.split('.');
    if (partes.length > 2) {
        valor = partes[0] + '.' + partes[1];
    }
    
    if (partes.length > 1 && partes[1].length > 2) {
        valor = partes[0] + '.' + partes[1].slice(0, 2);
    }

    campo.value = valor;
}

function botaoEditar() {
    document.getElementById('secao_editar_produto').style.display = 'flex';
}

function botaoFechar () {
    document.getElementById('secao_editar_produto').style.display = 'none';
    document.querySelectorAll('#nomeInput').forEach(input => input.value = '');
    document.querySelectorAll('#quantidadeInput').forEach(input => input.value = '');
    document.querySelectorAll('#precoInput').forEach(input => input.value = '');
    document.querySelectorAll('#editar_inputDescricao').forEach(input => input.value = '');
}