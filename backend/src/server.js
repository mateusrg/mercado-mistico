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

// Rotas de Navegação
app.get("/", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "index.html")));
app.get("/cadastro", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastro.html")));
app.get("/catalogo", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "catalogo_de_produtos.html")));
app.get("/cupons", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cupons.html")));
app.get("/login", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "login.html")));
app.get("/p/:id", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "pagina_produto.html")));
app.get("/carrinho", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "carrinho_de_compras.html")));
app.get("/cartao_presente", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cartao_presente.html")));
app.get("/compra_cartao_presente", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "compra_cartao_presente.html")));
app.get("/enderecos", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "endereco.html")));
app.get("/favoritos", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "favoritos.html")));
app.get("/finalizar_compra", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "finalizar_compra.html")));
app.get("/usuario", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "usuario.html")));
app.get("/cadastro_adm", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastrar_adm.html")));
app.get("/usuario_adm", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "usuario_adm.html")));
app.get("/cadastrar_produto", (req, response) => response.sendFile(path.join(__dirname, "..", "..", "frontend", "pages", "HTML", "cadastrar_produto.html")));

// Demais Rotas
app.post("/usuario/cadastrar", (request, response) => {
    // Verificando se o e-mail existe (diferente das outras rotas, aqui retorna "false" se o e-mail já existir)
    query = "SELECT * FROM Usuario WHERE email = ?";
    params = [request.params.email];
    connection.query(query, params, (err, results) => {
        if (results && results.length > 0) {
            response
            .status(400)
            .json({
                success: false,
                message: "E-mail já cadastrado.",
                data: err
            });
            return;
        }

        // Cadastrando o Usuário caso o e-mail não exista
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
});

app.post("/fazer_login", (request, response) => {
    const query = "SELECT idUsuario, nome, senha, email FROM Usuario WHERE email = ?;";
    const params = [request.body.email];

    connection.query(query, params, (err, results) => {
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
        const senhaValida = request.body.senha == usuario.senha;

        if(!senhaValida) {
            response
            .status(401)
            .json({
                success: false,
                message: "Senha incorreta."
            });
            return;
        }
        response
        .status(200)
        .json({
            success: true,
            message: "Usuário Logado!",
            data: usuario
        });
    });
});

app.post("/cad_produto", (request, response) => {
    const query = "INSERT INTO Produto (nome, preco, descricao, imagem, quantidade) VALUES (?, ?, ?, ?, ?);";
    const params = [
        request.body.nome,
        request.body.preco,
        request.body.descricao,
        request.body.imagem,
        request.body.quantidade
    ];

    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Produto cadastrado com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao cadastrar o produto.",
                data: err
            });
        }
    });
});

app.get("/listar_adms", (request, response) => {
    const query = "SELECT * FROM Usuario WHERE administrador = ?";
    const params = [1];
    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "ADMs consultados com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao consultar os ADMs.",
                data: err
            });
        }
    });
});

app.put("/adicionar_adm/:email", (request, response) => {
    // Verificando se o e-mail existe
    query = "SELECT * FROM Usuario WHERE email = ?";
    params = [request.params.email];
    connection.query(query, params, (err, results) => {
        if (!(results && results.length > 0)) {
            response
            .status(400)
            .json({
                success: false,
                message: "E-mail não cadastrado.",
                data: err
            });
            return;
        }

        // Adicionando o ADM
        query = "UPDATE Usuario SET administrador = 1 WHERE email = ?";
        connection.query(query, params, (err, results) => {
            if (results) {
                response
                .status(201)
                .json({
                    success: true,
                    message: "Administrador adicionado com sucesso!",
                    data: results
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao adicionar o administrador.",
                    data: err
                });
            }
        });
    });
});

app.put("/excluir_adm/:email", (request, response) => {
    const query = "UPDATE Usuario SET administrador = 0 WHERE email = ?";
    const params = [request.params.email];
    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Administrador removido com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao remover o administrador.",
                data: err
            });
        }
    });
});

app.post("/adicionar_endereco", (request, response) => {
    // Pegando o ID do usuário com base no e-mail
    query = "SELECT idUsuario FROM Usuario WHERE email = ?";
    params = [request.body.emailUsuario];
    connection.query(query, params, (err, results) => {
        if (!(results && results.length > 0)) {
            response
            .status(400)
            .json({
                success: false,
                message: "E-mail não cadastrado.",
                data: err
            });
            return;
        }
        idUsuario = results[0]["idUsuario"];

        // Efetivamente inserindo o endereço
        query = "INSERT INTO Endereco (nome, CEP, endereco, numeroResidencia, complemento, bairro, cidade, estado, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        params = [
            request.body.nome,
            request.body.CEP,
            request.body.endereco,
            request.body.numeroResidencia,
            request.body.complemento,
            request.body.bairro,
            request.body.cidade,
            request.body.estado,
            idUsuario
        ];

        connection.query(query, params, (err, results) => {
            if (results) {
                if (request.body.enderecoPadrao) {
                    idEnderecoPadrao = results.insertId;
                    query = "UPDATE Usuario SET idEnderecoPadrao = ? WHERE idUsuario = ?;";
                    params = [
                        idEnderecoPadrao,
                        idUsuario
                    ];
    
                    connection.query(query, params, (err, results) => {
                        if (results) {
                            response
                            .status(201)
                            .json({
                                success: true,
                                message: "Endereço cadastrado e endereço padrão atualizado com sucesso!",
                                data: results
                            });
                        } else {
                            response
                            .status(400)
                            .json({
                                success: false,
                                message: "Endereço cadastrado, mas erro ao atualizar o endereço padrão.",
                                data: err
                            });
                        }
                    });
                    return;
                }
                response
                .status(201)
                .json({
                    success: true,
                    message: "Endereço cadastrado com sucesso!",
                    data: results
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao cadastrar o endereço.",
                    data: err
                });
                return;
            }
        });
    });
});