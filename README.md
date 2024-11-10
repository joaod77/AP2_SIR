# API de Gestão de Estudantes

Esta é uma API RESTful para a gestão de estudantes, suportando operações CRUD (Create, Read, Update, Delete) e persistência de dados utilizando a biblioteca `lowdb`. A aplicação foi desenvolvida em Node.js com Express.

## Autoria
- **Desenvolvedor**: João Delgado
- **Deploy**: [https://gestao-estudantes.onrender.com]

## Descrição
A API gerencia dados de estudantes, incluindo informações como nome, curso e ano de matrícula. Ela permite criar, ler, atualizar e excluir estudantes. Os dados são armazenados em formato JSON usando `lowdb`.

## Rotas Implementadas
- **GET /students**: Retorna todos os estudantes cadastrados.
- **GET /students/{id}**: Retorna um estudante específico pelo `id`.
- **POST /students**: Cria um novo estudante.
- **PUT /students/{id}**: Atualiza os dados de um estudante específico.
- **DELETE /students/{id}**: Remove um estudante específico.
- **GET /**: Página de demonstração da API.
- **GET /about**: Página com informações sobre os autores do projeto.
- **GET /doc**: Página com a documentação técnica.

## Como Rodar o Projeto Localmente
1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Instale as dependências com o comando `npm install`.
4. Inicie o servidor com `npm start`. O servidor estará disponível em `http://localhost:3000`.

## Testes
Utilize ferramentas como **Postman** ou **cURL** para testar as rotas da API.

## Tecnologias Utilizadas
- **Node.js**
- **Express**
- **lowdb**
- **Postman/cURL** para testes.

## Notas
- O arquivo de dados (`db.json`) é armazenado localmente e será apagado em cada reinício ou redeploy no Render.com.
