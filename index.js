const express = require("express");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const PORT = process.env.PORT || 3000;

// Caminho do arquivo db.json
const dbFileName = "db.json";
const adapter = new FileSync(dbFileName);
const db = low(adapter);

// Inicializar o banco de dados com a estrutura "students"
db.defaults({ students: [] }).write();

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota para "about"
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Rota para "doc"
app.get("/doc", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "doc.html"));
});

// Importar rotas para os alunos
const studentsRouter = require("./routes/students");
app.use("/students", studentsRouter(db));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
