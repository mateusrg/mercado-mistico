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