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
    response.sendFile("cadastro.html");
});

app.get("/carrinho", (request, response) => {
    response.sendFile("carrinho_de_compras.html");
});

app.get("/cartao_presente", (request, response) => {
    response.sendFile("cartao_presente.html");
});

app.get("/catalogo", (request, response) => {
    response.sendFile("catalogo_de_produtos.html");
});

app.get("/compra_cartao_presente", (request, response) => {
    response.sendFile("compra_cartao_presente.html");
});

app.get("/creditos", (request, response) => {
    response.sendFile("creditos.html");
});

app.get("/cupons", (request, response) => {
    response.sendFile("cupons.html");
});

app.get("/finalizar_compra", (request, response) => {
    response.sendFile("finalizar_compra.html");
});

app.get("/login", (request, response) => {
    response.sendFile("login.html");
});

app.get("/p/:id", (request, response) => {
    response.sendFile("pagina_produto.html");
});

app.get("/personalizacao", (request, response) => {
    response.sendFile("personalizacao.html");
});

app.get("/registros", (request, response) => {
    response.sendFile("registros.html");
});

app.get("/usuario", (request, response) => {
    response.sendFile("usuario.html");
});