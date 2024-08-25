const express = require("express");
const cors = require("cors");
const path = require("path");
const porta = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(porta, () => console.log(`Rodando na porta ${porta}!`));
const connection = require("./db_config");

app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

app.get("/", (request, response) => {
    response.sendFile("index.html");
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