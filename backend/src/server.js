const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const porta = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(porta, () => console.log(`Rodando na porta ${porta}!`));
const connection = require("./db_config");

app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

// Configuração do Multer para poder salvar as imagens dos produtos uppados pelos adms
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "..", "frontend", "assets", "produtos")) // Pasta onde as imagens dos produtos serão salvas
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome do arquivo (é mantido o original)
    }
});

const upload = multer({ storage: storage });


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

// Rota de upload de imagem
app.post("/uppar_imagem", upload.single("imagem"), (request, response) => {
    response
    .status(201)
    .json({
        success: true,
        message: "Imagem uppada com sucesso!",
        filePath: path.join(__dirname, "..", "..", "frontend", "assets", "produtos", request.file.filename)
    });
});

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
        request.body.caminhoImagem,
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
                    console.error("Entrando no bloco de UPDATE");
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

app.get("/pegar_enderecos/:email", (request, response) => {
    // Pegando o ID do usuário com base no e-mail
    query = "SELECT idUsuario FROM Usuario WHERE email = ?";
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
        idUsuario = results[0]["idUsuario"];

        // Pegando o ID do endereço padrão do usuário
        let query = "SELECT idEnderecoPadrao FROM Usuario WHERE idUsuario = ?";
        let params = [idUsuario];

        connection.query(query, params, (err, results) => {
            if (err) {
                return response.status(400).json({
                    success: false,
                    message: "Erro ao buscar o idEnderecoPadrao.",
                    data: err
                });
            }

            if (results.length === 0) {
                return response.status(404).json({
                    success: false,
                    message: "Usuário não encontrado.",
                });
            }

            const idEnderecoPadrao = results[0].idEnderecoPadrao;

            // Pegando os endereços do usuário
            query = "SELECT * FROM Endereco WHERE idUsuario = ?";
            connection.query(query, params, (err, enderecos) => {
                if (err) {
                    return response.status(400).json({
                        success: false,
                        message: "Erro ao buscar os endereços do usuário.",
                        data: err
                    });
                }

                // Adiciona uma propriedade em todos os endereços se eles são ou não padrão. no caso, só um vai receber "true"
                const enderecosComIndicacao = enderecos.map(endereco => ({
                    ...endereco,
                    isPadrao: endereco.id === idEnderecoPadrao
                }));

                response.status(200).json({
                    success: true,
                    message: "Endereços do usuário encontrados!",
                    data: enderecosComIndicacao
                });
            });
        });
    });
});

app.delete("/deletar_endereco/:idEndereco", (request, response) => {
    query = "DELETE FROM Endereco WHERE idEndereco = ?";
    params = [request.params.idEndereco];

    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Endereço removido com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao remover o endereço.",
                data: err
            });
        }
    });
});

app.get("/listar_produtos", (request, response) => {
    query = "SELECT * FROM Produto";
    connection.query(query, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Produtos selecionados com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao selecionar os produtos.",
                data: err
            });
        }
    });
});

app.get("/selecionar_produto/:idProduto", (request, response) => {
    query = "SELECT * FROM Produto WHERE idProduto = ?";
    params = [request.params.idProduto];

    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Produto selecionado com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao selecionar o produto.",
                data: err
            });
        }
    });
});

app.post("/add_produto_carrinho", (request, response) => {
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

        // Adicionando produto ao carrinho
        query = "INSERT INTO ItemCarrinho (idUsuario, idProduto, quantidade) VALUES (?, ?, ?)";
        params = [
            idUsuario,
            request.body.idProduto,
            request.body.quantidade
        ];

        connection.query(query, params, (err, results) => {
            if (results) {
                response
                .status(201)
                .json({
                    success: true,
                    message: "Produto adicionado ao carrinho com sucesso!",
                    data: results
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao adicionar o produto ao carrinho.",
                    data: err
                });
            }
        });
    });
});

app.get("/listar_produtos_carrinho/:email", (request, response) => {
    // Pegando o ID do usuário com base no e-mail
    query = "SELECT idUsuario FROM Usuario WHERE email = ?";
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
        idUsuario = results[0]["idUsuario"];

        // Listando os produtos no carrinho com base no ID do usuário
        query = "SELECT * FROM ItemCarrinho WHERE idUsuario = ?";
        params  = [idUsuario];
        connection.query(query, params, (err, results) => {
            if (results) {
                response
                .status(201)
                .json({
                    success: true,
                    message: "Itens do carrinho selecionados com sucesso!",
                    data: results
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao selecionar os itens do carrinho.",
                    data: err
                });
            }
        });
    });
});

app.put("/editar_quant_carrinho", (request, response) => {
    query = "UPDATE ItemCarrinho SET quantidade = ? WHERE idItemCarrinho = ?";
    params = [
        request.body.quantidade,
        request.body.idItemCarrinho
    ];

    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Quantidade do item no carrinho atualizada com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao atualizar a quantidade do item no carrinho.",
                data: err
            });
        }
    });
});

app.delete("/excluir_produto_carrinho/:idItemCarrinho", (request, response) => {
    query = "DELETE FROM ItemCarrinho WHERE idItemCarrinho = ?";
    params = [request.params.idItemCarrinho];

    connection.query(query, params, (err, results) => {
        if (results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Produto excluído do carrinho com sucesso!",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Erro ao excluir o produto do carrinho.",
                data: err
            });
        }
    });
});

app.post("/add_favorito", (request, response) => {
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
        
        // Adicionando item aos favoritos
        query = "INSERT INTO ListaFavoritos (idUsuario, idProduto) VALUES (?, ?)";
        params = [
            idUsuario,
            request.body.idProduto
        ];

        connection.query(query, params, (err, results) => {
            if (results) {
                response
                .status(201)
                .json({
                    success: true,
                    message: "Produto adicionado à lista de favoritos do usuário com sucesso!",
                    data: results
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao adicionar o produto à lista de favoritos do usuário.",
                    data: err
                });
            }
        });
    });
});

app.get("listar_favoritos/:emailUsuario", (request, response) => {
    // Pegando o ID do usuário com base no e-mail
    query = "SELECT idUsuario FROM Usuario WHERE email = ?";
    params = [request.params.emailUsuario];
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

        // Listando os produtos na Lista de Favoritos do usuário com base no seu ID
        query = "SELECT * FROM ListaFavoritos WHERE idUsuario = ?";
        params = [idUsuario];

        connection.query(query, params, (err, results) => {
            if (results) {
                response
                .status(201)
                .json({
                    success: true,
                    message: "Lista de favoritos do usuário selecionada com sucesso!",
                    data: results
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao selecionar a lista de favoritos do usuário.",
                    data: err
                });
            }
        });
    });
});

app.delete("excluir_favorito/:emailUsuario/:idProduto", (request, response) => {
    // Pegando o ID do usuário com base no e-mail
    query = "SELECT idUsuario FROM Usuario WHERE email = ?";
    params = [request.params.emailUsuario];
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

        // Deletando o produto da lista de favoritos
        query = "DELETE FROM ListaFavoritos WHERE idUsuario = ? AND idProduto = ?";
        params = [
            idUsuario,
            request.params.idProduto
        ];

        connection.query(query, params, (err, results) => {
            if (results) {
                response
                .status(201)
                .json({
                    success: true,
                    message: "Produto excluído da lista de favoritos do usuário com sucesso!",
                    data: results
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao excluir produto da lista de favoritos do usuário.",
                    data: err
                });
            }
        });
    });
});

app.put("/redefinir_senha_usuario", (request, response) => {
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

        // Verificando se a senha está correta
        query = "SELECT senha FROM Usuario WHERE idUsuario = ?";
        params = [idUsuario];
        connection.query(query, params, (err, results) => {
            if (results && results[0]["senha"] === request.body.senhaAtual) {
                query = "UPDATE Usuario SET senha = ? WHERE idUsuario = ?";
                params = [
                    request.body.senhaNova,
                    idUsuario
                ];

                connection.query(query, params, (err, results) => {
                    if (results) {
                        response
                        .status(201)
                        .json({
                            success: true,
                            message: "Senha alterada com sucesso!",
                            data: results
                        });
                    } else {
                        response
                        .status(400)
                        .json({
                            success: false,
                            message: "Erro ao alterar a senha do usuário.",
                            data: err
                        });
                    }
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Senha atual incorreta.",
                    data: err
                });
            }
        });
    });
});

app.delete("/excluir_conta_usuario/:email/:senha", (request, response) => {
    // Pegando o ID do usuário com base no e-mail
    query = "SELECT idUsuario FROM Usuario WHERE email = ?";
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
        idUsuario = results[0]["idUsuario"];

        // Verificando se a senha está correta
        query = "SELECT senha FROM Usuario WHERE idUsuario = ?";
        params = [idUsuario];
        connection.query(query, params, (err, results) => {
            if (results && results[0]["senha"] === request.params.senha) {
                query = "DELETE FROM Usuario WHERE idUsuario = ?";
                params = [idUsuario];

                connection.query(query, params, (err, results) => {
                    if (results) {
                        response
                        .status(201)
                        .json({
                            success: true,
                            message: "Conta excluída com sucesso!",
                            data: results
                        });
                    } else {
                        response
                        .status(400)
                        .json({
                            success: false,
                            message: "Erro ao excluir a conta.",
                            data: err
                        });
                    }
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Senha incorreta.",
                    data: err
                });
            }
        });
    });
});

app.get("/is_usuario_adm/:email/:senha", (request, response) => {
    // Pegando o ID do usuário com base no e-mail
    query = "SELECT idUsuario FROM Usuario WHERE email = ?";
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
        idUsuario = results[0]["idUsuario"];

        // Verificando se a senha está correta
        query = "SELECT senha FROM Usuario WHERE idUsuario = ?";
        params = [idUsuario];
        connection.query(query, params, (err, results) => {
            if (results && results[0]["senha"] === request.params.senha) {
                query = "SELECT administrador FROM Usuario WHERE idUsuario = ?";
                params = [idUsuario];

                connection.query(query, params, (err, results) => {
                    if (results) {
                        response
                        .status(201)
                        .json({
                            success: true,
                            message: "Verificação de adm feita com sucesso!",
                            data: results[0]["administrador"].readUInt8(0)
                        });
                    } else {
                        response
                        .status(400)
                        .json({
                            success: false,
                            message: "Erro ao fazer verificação de adm.",
                            data: err
                        });
                    }
                });
            } else {
                response
                .status(400)
                .json({
                    success: false,
                    message: "Senha incorreta.",
                    data: err
                });
            }
        });
    });
});