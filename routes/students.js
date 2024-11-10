const express = require("express");
const router = express.Router();

// Receber o db como argumento
module.exports = (db) => {
  // Verificar se o db está configurado corretamente
  if (!db) {
    throw new Error("db não foi inicializado corretamente.");
  }

  // GET /students - Retorna todos os estudantes
  router.get("/", (req, res) => {
    const students = db.get("students").value();
    res.status(200).json(students);  // Retorna 200 OK com a lista de estudantes
  });

  // GET /students/:id - Retorna um estudante específico por ID
  router.get("/:id", (req, res) => {
    const student = db.get("students").find({ id: req.params.id }).value();
    if (!student) {
      return res.status(404).send("Estudante não encontrado");
    }
    res.status(200).json(student);  // Retorna 200 OK com os dados do estudante
  });

  // POST /students - Cria um novo estudante
  router.post("/", (req, res) => {
    const { name, course, year } = req.body;
  
    if (!name || !course || !year) {
      return res.status(400).send("Campos obrigatórios: name, course, year");
    }
  
    // Busca o último ID no banco de dados e incrementa para o próximo
    const lastStudent = db.get("students").orderBy("id", "desc").first().value();
    const newId = lastStudent ? parseInt(lastStudent.id) + 1 : 1;
  
    const newStudent = {
      id: newId.toString(),  // Converte o ID para string se for necessário
      name,
      course,
      year
    };
  
    db.get("students").push(newStudent).write();
  
    res.status(201).json(newStudent);  // Retorna 201 Created com os dados do novo estudante
  });

  // PUT /students/:id - Atualiza um estudante
  router.put("/:id", (req, res) => {
    const { name, course, year } = req.body;
    const student = db.get("students").find({ id: req.params.id }).value();

    if (!student) {
      return res.status(404).send("Estudante não encontrado");
    }

    const updatedStudent = {
      ...student,
      name: name || student.name,
      course: course || student.course,
      year: year || student.year
    };

    db.get("students").find({ id: req.params.id }).assign(updatedStudent).write();

    res.status(200).json(updatedStudent);  // Retorna 200 OK com os dados do estudante atualizado
  });

  // DELETE /students/:id - Deleta um estudante
  router.delete("/:id", (req, res) => {
    const student = db.get("students").find({ id: req.params.id }).value();

    if (!student) {
      return res.status(404).send("Estudante não encontrado");
    }

    db.get("students").remove({ id: req.params.id }).write();

    res.status(204).send();  // Retorna 204 No Content após a exclusão bem-sucedida
  });

  return router;
};
