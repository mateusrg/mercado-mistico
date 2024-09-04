function verificarEstadoDeLogin() {
    const nome = localStorage.getItem('nome');    
    if (nome) {
        // Usuário está logado, mostrar elementos do cabeçalho logado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'none';
        document.getElementById('botoes_header_direita_logado').style.display = 'flex';
    } else {
        // Usuário está deslogado, mostrar elementos do cabeçalho deslogado
        document.getElementById('botoes_header_direita_deslogado').style.display = 'flex';
        document.getElementById('botoes_header_direita_logado').style.display = 'none';
        window.location.href = '/login';
    }
}

// Código da página
const produtoSelecionado = JSON.parse(localStorage.getItem('produtoSelecionado'));
console.log(produtoSelecionado["nome"]);

function calculaPreco() {
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
            }
        }
    }
    const personalizacoes = produtoSelecionado["personalizacoes"];

    let preco;
    switch (produtoSelecionado["nome"]) {
        case "tapete voador":
            preco = 1599.99;
            preco = preco * precos["tapete voador"]["capacidade de voo"][produtoSelecionado["personalizacoes"]["capacidade de voo"]];
            preco = preco * precos["tapete voador"]["distancia"][produtoSelecionado["personalizacoes"]["distancia"]];
            preco = preco * precos["tapete voador"]["peso suportado"][produtoSelecionado["personalizacoes"]["peso suportado"]];
            preco = preco * precos["tapete voador"]["velocidade"][produtoSelecionado["personalizacoes"]["velocidade"]];
            preco = preco * precos["tapete voador"]["tamanho"][produtoSelecionado["personalizacoes"]["tamanho"]];
            break;
        case "frasco de ar da lua":
            preco = 2499.99;
            preco = preco * precos["frasco de ar da lua"]["gravidade normal"][produtoSelecionado["personalizacoes"]["gravidade normal"]];
            break;
        case "bota de supervelocidade":
            preco = 1899.99;
            preco = preco * precos["bota de supervelocidade"]["freio"][produtoSelecionado["personalizacoes"]["freio"]];
            preco = preco * precos["bota de supervelocidade"]["velocidade"][produtoSelecionado["personalizacoes"]["velocidade"]];
            break;
        case "pocao da saude":
            preco = 3199.99;
            preco = preco * precos["pocao da saude"]["penalidade"][produtoSelecionado["personalizacoes"]["penalidade"]];
            break;
        case "anel de teletransporte":
            preco = 8999.99;
            preco = preco * precos["anel de teletransporte"]["especificidade"][produtoSelecionado["personalizacoes"]["especificidade"]];
            preco = preco * precos["anel de teletransporte"]["timeout"][produtoSelecionado["personalizacoes"]["timeout"]];
            break;
        case "borracha apaga-tudo":
            preco = 11999.99;
            preco = preco * precos["borracha apaga-tudo"]["capacidade de apagamento"][produtoSelecionado["personalizacoes"]["capacidade de apagamento"]];
            break;
    }
    // A linha abaixo converte o número para real e troca os centavos pra "99" pra ficar mais parecendo loja mesmo :D
    return preco.toLocaleString("pt-br", {style: "currency", currency: "BRL"}).slice(0, -2) + "99";
}

function verificarProduto () {
    let linhas;
    const precoProduto = calculaPreco();
    document.getElementById('valorTotal').innerText = precoProduto;
    document.getElementById('textoValorNivel').innerText = `Por ${precoProduto}`;

    switch (produtoSelecionado["nome"]) {
        case 'tapete voador':
            document.getElementById('imagemProduto').src = '../../assets/produtos/tapete.png';
            document.getElementById('tituloProduto').innerText = 'Tapete Voador';
            document.getElementById('slogan').innerText = 'Voe para qualquer lugar a qualquer hora, com todo o conforto que você merece!';
            document.getElementById('escolhaControle').innerText = 'Escolha o nível de controle do tapete que você deseja';

            linhas = ["li1", "li2", "li3", "li4", "li5", "li6"];
            linhas.forEach(linha => document.getElementById(linha).style.visibility = 'visible');

            switch (produtoSelecionado["personalizacoes"]["capacidade de voo"]) {
                case "somente para cima":
                    document.getElementById('li2').innerText = "Voa somente para cima";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "para cima e para baixo":
                    document.getElementById('li2').innerText = "Voa somente para cima e para baixo";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "todas as direcoes":
                    document.getElementById('li2').innerText = "Voa livremente para qualquer direção!";
                    break;
            }

            switch (produtoSelecionado["personalizacoes"]["distancia"]) {
                case "500 m":
                    document.getElementById('li3').innerText = "Só voa até 500 metros por viagem";
                    document.getElementById('li3').style.color = "red";
                    break
                case "1 km":
                    document.getElementById('li3').innerText = "Só voa até 1 quilômetro por viagem";
                    document.getElementById('li3').style.color = "red";
                    break;
                case "5 km":
                    document.getElementById('li3').innerText = "Só voa até 5 quilômetros por viagem";
                    document.getElementById('li3').style.color = "red";
                    break;
                case "10 km":
                    document.getElementById('li3').innerText = "Voa até 10 quilômetros por viagem";
                    document.getElementById('li3').style.color = "palevioletred";
                    break;
                case "50 km":
                    document.getElementById('li3').innerText = "Voa até 50 quilômetros por viagem";
                    document.getElementById('li3').style.color = "palevioletred";
                    break;
                case "100 km":
                    document.getElementById('li3').innerText = "Voa até 100 quilômetros por viagem";
                    document.getElementById('li3').style.color = "palevioletred";
                    break;
                case "ilimitado":
                    document.getElementById('li3').innerText = "Voa o quão longe você quiser!";
                    break;
            }

            switch (produtoSelecionado["personalizacoes"]["peso suportado"]) {
                case "50 kg":
                    document.getElementById('li4').innerText = "Só suporta 50 kg";
                    document.getElementById('li4').style.color = "red";
                    break;
                case "60 kg":
                    document.getElementById('li4').innerText = "Só suporta 60 kg";
                    document.getElementById('li4').style.color = "red";
                    break;
                case "80 kg":
                    document.getElementById('li4').innerText = "Suporta 80 kg";
                    document.getElementById('li4').style.color = "palevioletred";
                    break;
                case "100 kg":
                    document.getElementById('li4').innerText = "Suporta 100 kg";
                    document.getElementById('li4').style.color = "palevioletred";
                    break;
                case "120 kg":
                    document.getElementById('li4').innerText = "Suporta 120 kg";
                    document.getElementById('li4').style.color = "palevioletred";
                    break;
                case "ilimitado":
                    document.getElementById('li4').innerText = "Suporta quanto peso você precisar!";
                    break;
            }

            switch (produtoSelecionado["personalizacoes"]["velocidade"]) {
                case "10 km/h":
                    document.getElementById('li5').innerText = "Voa bem devagar, a 10 km/h";
                    document.getElementById('li5').style.color = "red";
                    break;
                case "20 km/h":
                    document.getElementById('li5').innerText = "Voa devagar, a 20 km/h";
                    document.getElementById('li5').style.color = "red";
                    break;
                case "40 km/h":
                    document.getElementById('li5').innerText = "Voa relativamente bem, a 40 km/h";
                    document.getElementById('li5').style.color = "palevioletred";
                    break;
                case "60 km/h":
                    document.getElementById('li5').innerText = "Voa rápido, a 60 km/h";
                    document.getElementById('li5').style.color = "palevioletred";
                    break;
                case "80 km/h":
                    document.getElementById('li5').innerText = "Voa bem rápido, a 80 km/h";
                    document.getElementById('li5').style.color = "palevioletred";
                    break;
                case "ilimitado":
                    document.getElementById('li5').innerText = "Voa o quão rápido a sua adrenalina permitir!";
                    break;
            }

            switch (produtoSelecionado["personalizacoes"]["tamanho"]) {
                case "minusculo (300 cm²)":
                    document.getElementById('li6').innerText = "É minúsculo, só tem 300 cm²; não serve nem meia folha A4";
                    document.getElementById('li6').style.color = "red";
                    break;
                case "pequeno (5000 cm²)":
                    document.getElementById('li6').innerText = "É pequeno, só tem 5000 cm²; serve seu pet";
                    document.getElementById('li6').style.color = "red";
                    break;
                case "medio (1,5 m²)":
                    document.getElementById('li6').innerText = "É médio, tem 1,5 m²; certamente serve você";
                    document.getElementById('li6').style.color = "palevioletred";
                    break;
                case "grande (3 m²)":
                    document.getElementById('li6').innerText = "É grande, tem 3 m²; serve você, seus pais e ainda sobra espaço";
                    document.getElementById('li6').style.color = "palevioletred";
                    break;
                case "enorme (15 m²)":
                    document.getElementById('li6').innerText = "É enorme, tem 15 m²; sério, pra quê?";
                    break;
            }
            document.getElementById('li1').innerText = 'Tem segurança contra objetos externos';
            break;

        case 'frasco de ar da lua':
            document.getElementById('imagemProduto').src = '../../assets/produtos/frasco.png';
            document.getElementById('tituloProduto').innerText = 'Frasco de ar da lua';
            document.getElementById('slogan').innerText = 'Você já se perguntou como seria se morasse na Lua, como andaria? Agora você pode saber! como o nosso produto a gravidade ao seu redor te levará para a Lua!';
            document.getElementById('escolhaControle').innerText = 'Escolha o nível de controle do frasco de ar da lua que você deseja';

            linhas = ["li1", "li2"];
            linhas.forEach(linha => document.getElementById(linha).style.visibility = 'visible');

            switch (produtoSelecionado["personalizacoes"]["gravidade normal"]) {
                case "nunca":
                    document.getElementById('li2').innerText = "Tome uma vez e esqueça a gravidade normal. Você vai flutuar como na lua para sempre.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "1 mes":
                    document.getElementById('li2').innerText = "Tome, mas tente não fraquejar demais. Você vai flutuar como na lua por 1 mês.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "25 dias":
                    document.getElementById('li2').innerText = "Tome, mas tente não fraquejar demais. Você vai flutuar como na lua por 25 dias.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "20 dias":
                    document.getElementById('li2').innerText = "Tome, mas tente não fraquejar demais. Você vai flutuar como na lua por 20 dias.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "15 dias":
                    document.getElementById('li2').innerText = "Tome, mas com responsabilidade. Você vai flutuar como na lua por 15 dias.";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "10 dias":
                    document.getElementById('li2').innerText = "Tome, mas com responsabilidade. Você vai flutuar como na lua por 10 dias.";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "5 dias":
                    document.getElementById('li2').innerText = "Tome num feriado ou numa semana pouco movimentada. Você vai flutuar como na lua por 5 dias.";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "1 dia":
                    document.getElementById('li2').innerText = "Tome quando quiser um dia mais leve. Você vai flutuar como na lua o dia todo!";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "irrestrito":
                    document.getElementById('li2').innerText = "Tome à vontade! Pode voltar pra gravidade normal e voltar a flutuar quando te der na telha!";
                    break;
            }

            document.getElementById('li1').innerText = 'O ar dentro do frasco nunca acaba';
            break;

        case 'bota de supervelocidade':
            document.getElementById('imagemProduto').src = '../../assets/produtos/bota.png';
            document.getElementById('tituloProduto').innerText = 'Bota de supervelocidade';
            document.getElementById('slogan').innerText = 'Corra as maiores distâncias!';
            document.getElementById('escolhaControle').innerText = 'Escolha o nível de controle da bota de supervelocidade que você deseja';

            linhas = ["li1", "li2"];
            linhas.forEach(linha => document.getElementById(linha).style.visibility = 'visible');

            switch (produtoSelecionado["personalizacoes"]["freio"]) {
                case "false":
                    document.getElementById('li1').innerText = "Pode correr o quanto quiser. Só não pode parar.";
                    document.getElementById('li1').style.color = "red";
                    break;
                case "true":
                    document.getElementById('li1').innerText = "Freie a qualquer momento! Você é livre! E o preço também...";
                    break;
            }

            switch (produtoSelecionado["personalizacoes"]["velocidade"]) {
                case "80 km/h":
                    document.getElementById('li2').innerText = "Corra apenas a 80 km/h enquanto vê os carros ao seu redor te passando como se você fosse nada...";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "100 km/h":
                    document.getElementById('li2').innerText = "Corra apenas a 100 km/h e se lembre de como você poderia estar indo mais rápido caso tivesse investido um pouquinho mais...";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "120 km/h":
                    document.getElementById('li2').innerText = "Corra a 120 km/h. Mas se você pode correr a 120 km/h, por que não a 140? Vai lá, só mais uns reaisinhos...";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "140 km/h":
                    document.getElementById('li2').innerText = "Corra a 140 km/h. Sinta o gostinho da liberdade. Da velocidade. Mas imagina só se você fosse a 160...";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "160 km/h":
                    document.getElementById('li2').innerText = "Corra a 160 km/h. Velocidades nunca antes sentidas. O mundo é todo seu. Você quase pode correr tão rápido quanto consegue. Quase. Quase...";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "ilimitado":
                    document.getElementById('li2').innerText = "A verdadeira definição de velocidade! O céu é o limite!!! Mentira, nem ele é mais!!!! Nada te para!!!!! Você não tem limites!!!!!!!!!! Meus deus quanta exclamação!!!!!!!!!!!!!!";
                    break;
            }
            break;

        case 'pocao da saude':
            document.getElementById('imagemProduto').src = '../../assets/produtos/pocao.png';
            document.getElementById('tituloProduto').innerText = 'Poção da saúde';
            document.getElementById('slogan').innerText = 'Cansado de ficar doente? Temos a solução! Com a nossa poção, você será saudável até o fim de sua vida!';
            document.getElementById('escolhaControle').innerText = 'Escolha o nível de controle da poção da saúde que você deseja';

            linhas = ["li1", "li2", "li3"];
            linhas.forEach(linha => document.getElementById(linha).style.visibility = 'visible');

            switch (produtoSelecionado["personalizacoes"]["penalidade"]) {
                case "1 ano":
                    document.getElementById('li3').innerText = "Tome e fique curado. Mas, a cada vez que tomar, vai perder um ano inteiro de vida.";
                    document.getElementById('li3').style.color = "red";
                    break;
                case "8 meses":
                    document.getElementById('li3').innerText = "Tome e fique curado. Mas, a cada vez que tomar, vai perder 8 meses de vida. Que desnecessário. Você não liga pra sua saúde? Invista um pouco mais nela.";
                    document.getElementById('li3').style.color = "red";
                    break;
                case "6 meses":
                    document.getElementById('li3').innerText = "Tome e fique curado. Mas, a cada vez que tomar, vai perder meio ano de vida. Pense em tudo que você poderia fazer nesse tempo. Aproveitar com a sua família, as pessoas que você ama. Vai jogar isso fora por alguns reais a mais?";
                    document.getElementById('li3').style.color = "red";
                    break;
                case "3 meses":
                    document.getElementById('li3').innerText = "Tome e fique curado. Mas, a cada vez que tomar, vai perder 3 meses de vida. Mas pra quê perder tudo isso quando você pode perder bem menos por só um pouquinho a mais de dinheiro?";
                    document.getElementById('li3').style.color = "palevioletred";
                    break;
                case "1 mes":
                    document.getElementById('li3').innerText = "Tome e fique curado. Mas, a cada vez que tomar, vai perder 1 mês de vida. Definitivamente não é ruim. Mas poderia ser metade disso...";
                    document.getElementById('li3').style.color = "palevioletred";
                    break;
                case "15 dias":
                    document.getElementById('li3').innerText = "Tome e fique curado. Mas, a cada vez que tomar, vai perder 15 dias de vida. Mas sério, de quinzena em quinzena você chega em 10 anos. Você claramente tem dinheiro, dê um pouco mais e tenha sua vida inteira.";
                    document.getElementById('li3').style.color = "palevioletred";
                    break;
                case "nenhuma":
                    document.getElementById('li3').innerText = "Tome e fique totalmente curado, sem perder 1 segundo de vida sequer por isso! Sua saúde sempre no pico!";
                    break;
            }

            document.getElementById('li1').innerText = 'Cura qualquer doença';
            document.getElementById('li2').innerText = 'Poção infinita - pode ser tomada quantas vezes quiser!';
            break;

        case 'anel de teletransporte':
            document.getElementById('imagemProduto').src = '../../assets/produtos/anel.png';
            document.getElementById('tituloProduto').innerText = 'Anel de teletransporte';
            document.getElementById('slogan').innerText = 'Você já desejou estar em outro lugar, mas não queria pegar um avião ou um carro? Com esse anel, você nunca mais terá esse problema. Poderá chegar imediatamente a qualquer lugar do mundo!';
            document.getElementById('escolhaControle').innerText = 'Escolha o nível de controle que você quer ter do seu anel';

            linhas = ["li1", "li2"];
            linhas.forEach(linha => document.getElementById(linha).style.visibility = 'visible');
            linhas = ["li3", "li4", "li5", "li6"];
            linhas.forEach(linha => document.getElementById(linha).style.display = 'none');
            
            switch (produtoSelecionado["personalizacoes"]["especificidade"]) {
                case "ocidente e oriente":
                    document.getElementById('li1').innerText = "Pode se teletransportar. Mas vai cair num lugar totalmente aleatório. Pelo menos você escolhe se é no ocidente ou no oriente.";
                    document.getElementById('li1').style.color = "red";
                    break;
                case "continente":
                    document.getElementById('li1').innerText = "Pode se teletransportar. Mas vai cair num lugar bem aleatório, no continente que você quiser.";
                    document.getElementById('li1').style.color = "red";
                    break;
                case "pais":
                    document.getElementById('li1').innerText = "Pode se teletransportar para qualquer país do mundo. Mas torça pra não cair no meio de algo tenso...";
                    document.getElementById('li1').style.color = "red";
                    break;
                case "estado":
                    document.getElementById('li1').innerText = "Pode se teletransportar pra qualquer estado, de qualquer país do mundo. Mas torça pra não cair num lago cheio de piranhas.";
                    document.getElementById('li1').style.color = "palevioletred";
                    break;
                case "cidade":
                    document.getElementById('li1').innerText = "Pode se teletransportar para qualquer cidade, de qualquer estado, de qualquer país do mundo. Espero que não seja na frente de um carro.";
                    document.getElementById('li1').style.color = "palevioletred";
                    break;
                case "raio de 10 km":
                    document.getElementById('li1').innerText = "Pode se teletransportar para qualquer lugar no mundo. Mas o raio de precisão é de 10 km.";
                    document.getElementById('li1').style.color = "palevioletred";
                    break;
                case "raio de 5 km":
                    document.getElementById('li1').innerText = "Pode se teletransportar para qualquer lugar no mundo. Mas o raio de precisão é de 5 km. Ainda são tipo 50 quadras. Se você já pode pagar tudo isso num anel, com certeza pode fazer só mais um upgradezinho...";
                    document.getElementById('li1').style.color = "palevioletred";
                    break;
                case "qualquer lugar":
                    document.getElementById('li1').innerText = "Teletransporte-se livremente para onde quiser! Com todo o detalhamento e exatidão do mundo, no ponto mais preciso que consiga imaginar!";
                    break;
            }

            switch (produtoSelecionado["personalizacoes"]["timeout"]) {
                case "1 hora":
                    document.getElementById('li2').innerText = "Você só vai poder se teletransportar de novo depois de 1 hora inteira. É bastante tempo. Se cair numa enrascada, vai ser bem difícil sair.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "45 min":
                    document.getElementById('li2').innerText = "Você só vai poder se teletransportar de novo depois de 45 minutos. É menos que uma hora, mas ainda é tempo demais.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "30 min":
                    document.getElementById('li2').innerText = "Você só vai poder se teletransportar de novo depois de meia hora. Olha, pra diminuir esse tempo em 33,33%, não tem quase diferneça nenhuma de preço. Vai por mim, vale a pena.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "20 min":
                    document.getElementById('li2').innerText = "Você só vai poder se teletransportar de novo depois de 20 minutos. É um tempo considerável. Imagina se você se enganar? Quero ver esperar isso tudo.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "15 min":
                    document.getElementById('li2').innerText = "Você só vai poder se teletransportar de novo depois de 15 minutos. Normalmente era pra eu tentar te fazer pagar mais caro, mas, sinceramente, a partir daqui, o benefício não justifica o preço. A não ser que você seja muito rico ou só esteja clicando nesses botões por entretenimento e não vá comprar nada de verdade, claro.";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "10 min":
                    document.getElementById('li2').innerText = "Você vai poder se teletransportar de novo depois de 10 minutos. É bem pouco tempo, mas poderia ser menos.";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "5 min":
                    document.getElementById('li2').innerText = "Você vai poder se teletransportar de novo depois de 5 minutos. Dá pra tomar um cafezinho nesse meio tempo. Ou comer um croaissant, dependendo de pra onde você foi.";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "3 min":
                    document.getElementById('li2').innerText = "Você só vai poder se teletransportar de novo depois de 3 minutos. Mas é aquela história, olha o preço que você já tá pagando. Certamente você pode pagar mais.";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "2 min":
                    document.getElementById('li2').innerText = "Você só vai poder se teletransportar de novo depois de 2 minutos. Poderia ser 1.";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "1 min":
                    document.getElementById('li2').innerText = "Você só vai poder se teletransportar de novo depois de 1 minuto. Mas, por alguns reais a mais, você não vai ter mais nenhum inconveniente.";
                    document.getElementById('li2').style.color = "palevioletred";
                    break;
                case "sem timeout":
                    document.getElementById('li2').innerText = "Teletransporte-se a qualquer milissegundo que quiser. Num piscar de olhos, você está do outro lado do mundo!";
                    break;
            }
            break;

        case 'borracha apaga-tudo':
            document.getElementById('imagemProduto').src = '../../assets/produtos/borracha.png';
            document.getElementById('tituloProduto').innerText = 'Borracha apaga-tudo';
            document.getElementById('slogan').innerText = 'Se livre de tudo que não quiser mais, apague tudo que não queira ver, com a facilidade e praticidade de uma borracha escolar!';
            document.getElementById('escolhaControle').innerText = 'Escolha o nível de controle da borracha que você deseja';

            linhas = ["li1", "li2"];
            linhas.forEach(linha => document.getElementById(linha).style.visibility = 'visible');

            switch (produtoSelecionado["personalizacoes"]["capacidade de apagamento"]) {
                case "10 cm³/h":
                    document.getElementById('li1').innerText = "Apague até 10 cm³ em uma hora. Pode apagar um dadinho pelo menos.";
                    document.getElementById('li1').style.color = "red";
                    break;
                case "50 cm³/h":
                    document.getElementById('li1').innerText = "Apague até 50 cm³ em uma hora. Pode apagar um frasquinho de remédio.";
                    document.getElementById('li1').style.color = "red";
                    break;
                case "100 cm³/h":
                    document.getElementById('li1').innerText = "Apague até 100 cm³ em uma hora. Pode apagar uma xícara cheia de café.";
                    document.getElementById('li1').style.color = "red";
                    break;
                case "500 cm³/h":
                    document.getElementById('li1').innerText = "Apague até 500 cm³ em uma hora. Pode apagar uma garrafa de água mineral.";
                    document.getElementById('li1').style.color = "palevioletred";
                    break;
                case "750 cm³/h":
                    document.getElementById('li1').innerText = "Apague até 750 cm³ em uma hora. Pode apagar uma garrafa de vinho cheia.";
                    document.getElementById('li1').style.color = "palevioletred";
                    break;
                case "1 m³/h":
                    document.getElementById('li1').innerText = "Apague até 1 m³ em uma hora. Isso dá literalmente 1.000.000 cm³. Quem fez esses preços? Quem botou essa opção logo depois do 750 cm³? Enfim, o gerente ficou louco. Vale super a pena.";
                    document.getElementById('li1').style.color = "palevioletred";
                    break;
                case "ilimitado":
                    document.getElementById('li1').innerText = "Apague tudo o que quiser, o quanto quiser!";
                    break;
            }

            switch (produtoSelecionado["personalizacoes"]["capinha especial"]) {
                case "false":
                    document.getElementById('li2').innerText = "Pode apagar qualquer coisa. Mas toma cuidado na fricção, pra não apagar a sua própria mão. Ah, se você tivesse uma capinha protetora...";
                    document.getElementById('li2').style.color = "red";
                    break;
                case "true":
                    document.getElementById('li2').innerText = "Apague qualquer coisa sem medo. Equipado com uma capinha mágica que te dá toda a segurança para eliminar tudo o que (in)desejar!";
                    break;
            }
            break;
    }
}

function adicionarAoCarrinho() {
    const produtoSelecionado = JSON.parse(localStorage.getItem("produtoSelecionado"));
    let produtoParaAdicionar = {
        "nome do produto": "",
        "personalizacoes": {}
    }
    produtoParaAdicionar["nome do produto"] = produtoSelecionado["nome"];
    produtoParaAdicionar["personalizacoes"] = produtoSelecionado["personalizacoes"];
    const carrinhoDeCompras = JSON.parse(localStorage.getItem("carrinho"));
    carrinhoDeCompras["carrinho"].push(produtoParaAdicionar);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoDeCompras));
    alert("Produto adicionado!");
}

function mudarParaPersonalizacoes() {
    localStorage.setItem("paginaOrigem", "pagina_produto");
    window.location.href = "./personalização.html";
}

function deixaPrimeiraMaiuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


verificarEstadoDeLogin();
verificarProduto();