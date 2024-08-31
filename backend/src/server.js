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

// Rotas de Navegação Livres
app.get("/", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "index.html")));
app.get("/cadastro", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastro.html")));
app.get("/catalogo", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "catalogo_de_produtos.html")));
app.get("/cupons", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cupons.html")));
app.get("/login", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "login.html")));
app.get("/p/:id", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "pagina_produto.html")));

// Rotas de Navegação Restritas - Exigem Login
app.get("/carrinho", autenticarToken, (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "carrinho_de_compras.html")));
app.get("/cartao_presente", autenticarToken, (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cartao_presente.html")));
app.get("/compra_cartao_presente", autenticarToken, (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "compra_cartao_presente.html")));
app.get("/enderecos", autenticarToken, (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "endereco.html")));
app.get("/favoritos", autenticarToken, (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "favoritos.html")));
app.get("/finalizar_compra", autenticarToken, (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "finalizar_compra.html")));
app.get("/usuario", autenticarToken, (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "usuario.html")));

// Rotas de Navegação Protegidas - Exigem Login de ADM
app.get("/cadastro_adm", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastrar_adm.html")));
app.get("/usuario_adm", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "usuario_adm.html")));


// Demais Rotas
app.get("/usuario/selecionar", (request, response) => {
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

app.post("/fazer_login", (request, response) => {
    const query = "SELECT idUsuario, nome, senha FROM Usuario WHERE email = ?;";
    const params = [email];

    connection.query(query, params, async (err, results) => {
        if (err || results.length === 0) {
            response
            .status(400)
            .json({
                success: false,
                message: "E-mail não encontrado."
            });
            return;
        }

        const usuario = results[0];
        const senhaValida = await bcrypt.compare(request.body.senha, usuario.senha);

        if(!senhaValida) {
            response
            .status(401)
            .json({
                success: false,
                message: "Senha incorreta."
            });
        }

        // Daqui pra baixo é só a criação do token de autenticação. Como ele só é criado no login, não fiz uma função separada pra isso
        const token = jwt.sign(
            {
                idUsuario: usuario.idUsuario,
                nome: usuario.nome
            },
            chaveCriptografia,
            {expiresIn: "1h"}
        );

        response
        .status(200)
        .json({
            success: true,
            message: "Usuário autenticado!",
            token: `Bearer ${token}`
        });
    });
});

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