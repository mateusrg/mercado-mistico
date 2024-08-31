const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const chaveCriptografia = "ok-jfnxbmdukl-hzfnbd-sifkj";
const porta = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(porta, () => console.log(`Rodando na porta ${porta}!`));
const connection = require("./db_config");

app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

// Métodos GET

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "index.html"));
});

app.get("/cadastro_adm", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastrar_adm.html"));
});

app.get("/cadastro_produto", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastrar_produto.html"));
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
app.get("/usuario/selecionar_por_email", (request, response) => {
    query = "SELECT idUsuario, nome FROM Usuario WHERE email = ?;";
    params = [request.body.email];
    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso.",
                data: err
            });
        }
    });
});

app.post("/usuario/cadastrar", async (request, response) => {
    // Primeiro, verificando se o e-mail já não existe, pq não dá p cadastrar 2 usuários com o msm e-mail
    const email = request.body.email
    const data = {email};
    const res = await fetch(`http://localhost:3000/usuario/selecionar_por_email`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const results = await res.json();
    if (results.data.length > 0) {
        response
        .status(409)
        .json({
            success: false,
            message: "Este e-mail já está em uso."
        });
        return;
    }    

    query = "INSERT INTO Usuario (nome, email, senha, creditos, administrador) VALUES (?, ?, ?, ?, ?);";
    params = [
        request.body.nome,
        request.body.email,
        request.body.senha,
        0,
        0
    ];
    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Usuário cadastrado com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao cadastrar o usuário.",
                data: err
            });
        }
    });
});

app.get("/usuario/selecionar", (request, response) => {
    const idUsuario = 1 // Valor aleatório de teste
    const query = "SELECT * FROM Usuario WHERE id = ?;";
    const params = [idUsuario];
    connection.query(query, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Consulta bem sucedida!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao consultar usuários.",
                data: err
            });
        }
    });
});

// Não tem função pra editar usuário, criar aqui caso seja necessário mudar alguma informação/set específico

app.delete("/usuario/deletar/:id", (request, response) => {
    const query = "DELETE FROM Usuarios WHERE id = ?;";
    const params = [request.params.id];
    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Usuário deletado!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Houve um erro ao deletar o usuário.",
                data: err
            });
        }
    })
});

// function autenticarToken(request, response, next) {
//     const token = request.body['token'];

//     if (token == null) {
//         return response
//         .status(401)
//         .json({
//             success: false,
//             message: 'Token não encontrado'
//         });
//     }

//     jwt.verify(token, chaveCriptografia, (err, user) => {
//         if (err) {
//             return response
//             .status(403)
//             .json({
//                 success: false,
//                 message: 'Token inválido'
//             });
//         }
//         request.user = user;
//         next();
//     });
// }

function autenticarToken(request, response, next) {
    const tokenRecebido = request.body.token;
    if (!tokenRecebido) {
        response
        .status(401).
        json({
            success: false,
            message: "Token não fornecido."
        });
        return;
    }
    const token = tokenRecebido.split(" ")[1];

    jwt.verify(token, chaveCriptografia, (err, user) => {
        if (err) {
            response
            .status(403)
            .json({
                success: false,
                message: "Token inválido ou expirado. É necessário fazer login novamente."
            });
        }
        request.user = user;
        next();
    });
}