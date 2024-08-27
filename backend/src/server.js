const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const chaveCriptografia = "ok-jfnxbmdukl-hzfnbd-sifkj"
const porta = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(porta, () => console.log(`Rodando na porta ${porta}!`));
const connection = require("./db_config");

app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

// Métodos GET

app.get("/", (request, response) => {
    response.sendFile("index.html");
});

app.get("/cadastro_adm", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastrar_adm.html"));
});

app.get("/cadastro", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastro.html"));
});

app.get("/carrinho", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "carrinho_de_compras.html"));
});

app.get("/cartao_presente", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cartao_presente.html"));
});

app.get("/catalogo", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "catalogo_de_produtos.html"));
});

app.get("/compra_cartao_presente", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "compra_cartao_presente.html"));
});

app.get("/creditos", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "creditos.html"));
});

app.get("/cupons", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cupons.html"));
});

app.get("/enderecos", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "endereco.html"));

    const idUsuario = 1; // Não sei se está certo, ver na aula
    const query = "SELECT * FROM Endereco WHERE idUsuario = ?";

    connection.query(query, [idUsuario], (err, results) => {
        if (err) {
            response
            .status(500)
            .json({
                success: false,
                message: "Erro ao buscar endereços",
                data: err
            });
        } else {
            response
            .status(200)
            .json({
                success: true,
                message: "Endereços encontrados",
                data: results
            });
        }
    });
});

app.get("/favoritos", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "favoritos.html"));
});

app.get("/finalizar_compra", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "finalizar_compra.html"));
});

app.get("/login", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "login.html"));
});

app.get("/p/:id", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "pagina_produto.html"));
});

app.get("/personalizacao", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "personalizacao.html"));
});

app.get("/registros", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "registros.html"));
});

app.get("/usuario", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "usuario.html"));
});

app.get("/usuario_adm", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "usuario_adm.html"));
});

// Métodos POST

app.post('/enderecos/adicionar', autenticarToken, (request, response) => {
    let params = [
        request.body.cep,
        request.body.endereco,
        request.body.numero,
        request.body.complemento,
        request.body.bairro,
        request.body.cidade,
        request.body.estado,
        1 // Aqui é o ID do usuário, não é esse 1
    ];

    let query = "INSERT INTO Endereco(CEP, endereco, numeroResidencia, complemento, bairro, cidade, estado, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    
    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Endereço adicionado com sucesso",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao adicionar endereço",
                data: err
            });
        }
    });
});

app.post('/cadastro/adicionar', async (request, response) => {
    const senhaCriptografada = await bcrypt.hash(request.body.senha, 10);
    let params = [
        request.body.nome,
        request.body.email,
        senhaCriptografada,
        0
    ];

    let query = "INSERT INTO Usuario(nome, email, senha, administrador) VALUES (?, ?, ?, ?);";
    
    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                data: results,
                nome: request.body.nome
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao cadastrar usuário",
                data: err
            });
        }
    });
});

app.post('/login/verificar', (request, response) => {
    const { email, senha } = request.body;

    const query = 'SELECT * FROM Usuario WHERE email = ?';
    const params = [email]
    
    connection.query(query, params, async (err, results) => {
        if (err) {
            console.error("Erro no servidor:", err);
            return response
                .status(500)
                .json({
                    success: false,
                    message: 'Erro no servidor',
                    data: err
                });
        }
        
        if (results.length === 0) {
            return response
                .status(401)
                .json({
                    success: false,
                    message: 'Email não encontrado',
                    data: err
                });
        }
        
        const user = results[0];
        const senhaValida = await bcrypt.compare(senha, user.senha);
        
        if (senhaValida) {
            const token = jwt.sign({id: user.idUsuario, nome: user.nome}, chaveCriptografia, {expiresIn: "1h"});
            return response
                .status(200)
                .json({
                    success: true,
                    message: 'Login bem-sucedido',
                    token: token, // tirei o data: results, pq não faz sentido criptografar a senha e devolvê-la pro client
                    nome: user.nome
                });
        } else {
            return response
                .status(401)
                .json({
                    success: false,
                    message: 'Senha incorreta'
                });
        }
    });
});

function autenticarToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return response
        .status(401)
        .json({
            success: false,
            message: 'Token não encontrado'
        });
    }

    jwt.verify(token, chaveCriptografia, (err, user) => {
        if (err) {
            return response
            .status(403)
            .json({
                success: false,
                message: 'Token inválido'
            });
        }
        request.user = user;
        next();
    });
}