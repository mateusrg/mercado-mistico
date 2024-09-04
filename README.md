## 1- Instalação do Banco
1. Instale o banco de dados no conteúdo do arquivo "db.sql", na pasta "backend"
2. Verifique se o "host", o "user" e o "password" do servidor rodando seu banco batem com os no arquivo "db_config.js" e altere-o caso necessário

## 2- Rodando o Servidor
1. Abra a pasta do arquivo no terminal e digite os comandos:
• cd backend
• npm start

## 3- Testando as APIs
1. As APIs necessárias para o funcionamento do projeto são:
a. Rotas de Produto:
• /produto/cadastrar
• /produto/listar
• /produto/selecionar/:idProduto
• /produto/uppar_imagem
• /produto/editar
• /produto/excluir/:idProduto

b. Rotas de Usuário:
• /usuario/cadastrar
• /usuario/login
• /usuario/editar
• /usuario/excluir/:email/:senha
• /usuario/is_adm/:email/:senha
• /usuario/tornar_adm/:email
• /usuario/listar_adms
• /usuario/remover_adm/:email

c. Rotas de Endereço:
• /endereco/cadastrar
• /endereco/listar/:email
• /endereco/editar
• /endereco/excluir/:idEndereco

d. Rotas de Carrinho:
• /carrinho/cadastrar
• /carrinho/listar/:email
• /carrinho/editar
• /carrinho/excluir/:idItemCarrinho

e. Rotas de Favorito:
• /favorito/cadastrar
• /favorito/listar/:emailUsuario
• /favorito/excluir/:emailUsuario/:idProduto

2. Como Usar as Rotas:

a. Rota "/produto/cadastrar":
• URL: http://localhost:3000/produto/cadastrar
• Método: POST
• Corpo da Requisição: {nome, preco, descricao, caminhoImagem, quantidade}

• Exemplo de Corpo da Requisição:
{
  "nome": "Adam",
  "preco": 12.37,
  "descricao": "Uma descrição muito bacana!",
  "caminhoImagem": "./assets/produtos/1725324471392-684511869.png",
  "quantidade": 1
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Produto cadastrado com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 1,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

b. Rota "/produto/listar":
• URL: http://localhost:3000/produto/listar
• Método: GET

• Exemplo de Resposta:
{
  "success": true,
  "message": "Produtos selecionados com sucesso!",
  "data": [
    {
      "idProduto": 1,
      "nome": "Adam",
      "preco": "12.37",
      "descricao": "Uma descrição muito bacana!",
      "imagem": "./assets/produtos/1725324471392-684511869.png",
      "quantidade": 1
    }
  ]
}

c. Rota "/produto/selecionar/:idProduto":
• URL: http://localhost:3000/produto/selecionar
• Método: GET
• Parâmetros da URL: idProduto
• Exemplo de URL: http://localhost:3000/produto/selecionar/1

• Exemplo de Resposta:
{
  "success": true,
  "message": "Produto selecionado com sucesso!",
  "data": [
    {
      "idProduto": 1,
      "nome": "Adam",
      "preco": "12.37",
      "descricao": "Uma descrição muito bacana!",
      "imagem": "./assets/produtos/1725324471392-684511869.png",
      "quantidade": 1
    }
  ]
}

d. Rota "/produto/uppar_imagem":
• URL: http://localhost:3000/produto/uppar_imagem
• Método: POST
• Corpo da Requisição: objeto FormData() do JS com o campo "imagem"
• Não haverá exemplo de requisição, pois é necessário enviar um objeto FormData() pelo JavaScript, o que não sabemos como fazer diretamente no ThunderClient, PostMan ou semelhantes.

e. Rota "/produto/editar":
• URL: http://localhost:3000/produto/editar
• Método: PUT
• Corpo da Requisição: {nome, preco, descricao, quantidade, idProduto}

• Exemplo de Corpo da Requisição:
{
  "nome": "Smith",
  "preco": 1000,
  "descricao": "Outra descrição!!!!!!!!!!!!!",
  "imagem": "./assets/produtos/1725324494849-157673660.webp",
  "quantidade": 15
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Produto alterado com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 0,
    "insertId": 0,
    "info": "Rows matched: 0  Changed: 0  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

f. Rota "/produto/excluir/:idProduto":
• URL: http://localhost:3000/produto/excluir
• Método: DELETE
• Parâmetros da URL: idProduto
• Exemplo de URL: http://localhost:3000/produto/excluir/1

{
  "success": true,
  "message": "Produto excluído com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

g. Rota "/usuario/cadastrar":
• URL: http://localhost:3000/usuario/cadastrar
• Método: POST
• Corpo da Requisição: {nome, email, senha}

• Exemplo de Corpo da Requisição:
{
  "nome": "Guigo",
  "email": "guigo@gmail.com",
  "senha": "euamopython123"
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Usuário cadastrado com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 1,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

h. Rota "/usuario/login":
• URL: http://localhost:3000/usuario/login
• Método: POST
• Corpo da Requisição: {email, senha}

• Exemplo de Corpo da Requisição:
{
  "email": "guigo@gmail.com",
  "senha": "euamopython123"
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Usuário Logado!",
  "data": {
    "idUsuario": 1,
    "nome": "Guigo",
    "senha": "euamopython123",
    "email": "guigo@gmail.com"
  }
}

i. Rota "/usuario/editar":
• URL: http://localhost:3000/usuario/editar
• Método: PUT
• Corpo da Requisição: {emailUsuario, nome, senhaAtual, senhaNova}

• Exemplo de Corpo da Requisição:
{
  "emailUsuario": "guigo@gmail.com",
  "nome": "Guilherme",
  "senhaAtual": "euamopython123",
  "senhaNova": "voudarPDpromateus"
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Informações do usuário alteradas com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
  }
}

j. Rota "/usuario/excluir/:email/:senha":
• URL: http://localhost:3000/usuario/excluir
• Método: DELETE
• Parâmetros da URL: email, senha
• Exemplo de URL: http://localhost:3000/usuario/excluir/guigo@gmail.com/voudarPDpromateus

• Exemplo de Resposta:
{
  "success": true,
  "message": "Conta excluída com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

k. Rota "/usuario/is_adm/:email/:senha":
• PS: se estiver seguindo os comandos em ordem, não existem mais usuários para verificar se são ou não administradores, pois todos foram excluídos. por isso, é necessário criar um novo usuário para testar a rota.
• URL: http://localhost:3000/usuario/is_adm
• Método: GET
• Parâmetros da URL: email, senha
• Exemplo de URL: http://localhost:3000/usuario/is_adm/guigo@gmail.com/euamopython123

• Exemplo de Resposta:
{
  "success": true,
  "message": "Verificação de adm feita com sucesso!",
  "data": 0
}

l. Rota "/usuario/tornar_adm/:email":
• URL: http://localhost:3000/usuario/tornar_adm
• Método: PUT
• Parâmetros da URL: email
• Exemplo de URL: http://localhost:3000/usuario/tornar_adm/guigo@gmail.com

• Exemplo de Resposta:
{
  "success": true,
  "message": "Administrador adicionado com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
  }
}

m. Rota "/usuario/listar_adms":
• URL: http://localhost:3000/usuario/listar_adms
• Método: GET

• Exemplo de Resposta:
{
  "success": true,
  "message": "ADMs consultados com sucesso!",
  "data": [
    {
      "idUsuario": 2,
      "nome": "Guigo",
      "email": "guigo@gmail.com",
      "senha": "euamopython123",
      "creditos": 0,
      "administrador": {
        "type": "Buffer",
        "data": [
          1
        ]
      },
      "idEnderecoPadrao": null
    }
  ]
}

n. Rota "/usuario/remover_adm/:email":
• URL: http://localhost:3000/usuario/remover_adm
• Método: PUT
• Parâmetros da URL: email
• Exemplo de URL: http://localhost:3000/usuario/remover_adm/guigo@gmail.com

• Exemplo de Resposta:
{
  "success": true,
  "message": "Administrador removido com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
  }
}

o. Rota "/endereco/cadastrar":
• URL: http://localhost:3000/endereco/cadastrar
• Método: POST
• Corpo da Requisição: {emailUsuario, nome, CEP, endereco, numeroResidencia, complemento, bairro, cidade, estado}

• Exemplo de Corpo da Requisição:
{
  "emailUsuario": "guigo@gmail.com",
  "nome": "Casa do Guigo",
  "CEP": "93022-414",
  "endereco": "Avenida Unisinos",
  "numeroResidencia": 123,
  "complemento": "sala 103",
  "bairro": "São João Batista",
  "cidade": "São Leopoldo",
  "estado": "RS"
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Endereço cadastrado com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 1,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

p. Rota "/endereco/listar/:email":
• URL: http://localhost:3000/endereco/listar
• Método: GET
• Parâmetros da URL: email
• Exemplo de URL: http://localhost:3000/endereco/listar/guigo@gmail.com

• Exemplo de Resposta:
{
  "success": true,
  "message": "Endereços do usuário encontrados!",
  "data": [
    {
      "idEndereco": 1,
      "nome": "Casa do Guigo",
      "CEP": "93022-414",
      "endereco": "Avenida Unisinos",
      "numeroResidencia": "123",
      "complemento": "sala 103",
      "bairro": "São João Batista",
      "cidade": "São Leopoldo",
      "estado": "RS",
      "idUsuario": 2,
      "isPadrao": false
    }
  ]
}

q. Rota "/endereco/editar":
• URL: http://localhost:3000/endereco/editar
• Método: PUT
• Corpo da Requisição: {nome, CEP, endereco, numeroResidencia, complemento, bairro, cidade, estado, idEndereco}

• Exemplo de Corpo da Requisição:
{
  "nome": "Escola",
  "CEP": "93022-414",
  "endereco": "Avenida Unisinos",
  "numeroResidencia": 123,
  "complemento": "sala 103",
  "bairro": "São João Batista",
  "cidade": "São Leopoldo",
  "estado": "RS",
  "idEndereco": 1
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Endereço editado com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 1
  }
}

r. Rota "/endereco/excluir/:idEndereco":
• URL: http://localhost:3000/endereco/excluir
• Método: DELETE
• Parâmetros da URL: idEndereco
• Exemplo de URL: http://localhost:3000/endereco/excluir/1

• Exemplo de Resposta:
{
  "success": true,
  "message": "Endereço removido com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

s. Rota "/carrinho/cadastrar":
• PS: Novamente, não há produtos para cadastrar no carrinho e, portanto, é necessário cadastrar um primeiro para poder usar essa rota.
• URL: http://localhost:3000/carrinho/cadastrar
• Método: POST
• Corpo da Requisição: {emailUsuario, idProduto, quantidade}

• Exemplo de Corpo da Requisição:
{
  "emailUsuario": "guigo@gmail.com",
  "idProduto": 2,
  "quantidade": 1
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Produto adicionado ao carrinho com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 3,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

t. Rota "/carrinho/listar/:email":
• URL: http://localhost:3000/carrinho/listar
• Método: GET
• Parâmetros da URL: email
• Exemplo de URL: http://localhost:3000/carrinho/listar/guigo@gmail.com

• Exemplo de Resposta:
{
  "success": true,
  "message": "Itens do carrinho selecionados com sucesso!",
  "data": [
    {
      "idItemCarrinho": 3,
      "idUsuario": 2,
      "idProduto": 2,
      "quantidade": 1
    }
  ]
}

u. Rota "/carrinho/editar":
• URL: http://localhost:3000/carrinho/editar
• Método: PUT
• Corpo da Requisição: {quantidade, idItemCarrinho}

• Exemplo de Corpo da Requisição:
{
  "quantidade": 5,
  "idItemCarrinho": 1
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Quantidade do item no carrinho atualizada com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 0,
    "insertId": 0,
    "info": "Rows matched: 0  Changed: 0  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

v. Rota "/carrinho/excluir/:idItemCarrinho":
• URL: http://localhost:3000/carrinho/excluir
• Método: DELETE
• Parâmetros da URL: idItemCarrinho
• Exemplo de URL: http://localhost:3000/carrinho/excluir/1

• Exemplo de Resposta:
{
  "success": true,
  "message": "Produto excluído do carrinho com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 0,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

w. Rota "/favorito/cadastrar":
• URL: http://localhost:3000/favorito/cadastrar
• Método: POST
• Corpo da Requisição: {emailUsuario, idProduto}

• Exemplo de Corpo da Requisição:
{
  "emailUsuario": "guigo@gmail.com",
  "idProduto": 2
}

• Exemplo de Resposta:
{
  "success": true,
  "message": "Produto adicionado à lista de favoritos do usuário com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}

x. Rota "/favorito/listar/:emailUsuario":
• URL: http://localhost:3000/favorito/listar
• Método: GET
• Parâmetros da URL: emailUsuario
• Exemplo de URL: http://localhost:3000/favorito/listar/guigo@gmail.com

• Exemplo de Resposta:
{
  "success": true,
  "message": "Lista de favoritos do usuário selecionada com sucesso!",
  "data": [
    {
      "idUsuario": 2,
      "idProduto": 2
    }
  ]
}

y. Rota "/favorito/excluir/:emailUsuario/:idProduto":
• URL: http://localhost:3000/favorito/excluir
• Método: DELETE
• Parâmetros da URL: emailUsuario, idProduto
• Exemplo de URL: http://localhost:3000/favorito/excluir/guigo@gmail.com/2

• Exemplo de Resposta:
{
  "success": true,
  "message": "Produto excluído da lista de favoritos do usuário com sucesso!",
  "data": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}