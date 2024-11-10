document.addEventListener("DOMContentLoaded", () => {
  const studentList = document.getElementById("studentList");
  const addStudentForm = document.getElementById("addStudentForm");
  const editStudentForm = document.getElementById("editStudentForm");
  
  const nameInput = document.getElementById("name");
  const courseInput = document.getElementById("course");
  const yearInput = document.getElementById("year");

  const editNameInput = document.getElementById("editName");
  const editCourseInput = document.getElementById("editCourse");
  const editYearInput = document.getElementById("editYear");
  const editStudentIdInput = document.getElementById("editStudentId");

  // Função para listar todos os estudantes
  function loadStudents() {
      fetch("/students")
          .then((response) => response.json())
          .then((data) => {
              studentList.innerHTML = "";
              data.forEach((student) => {
                  const li = document.createElement("li");
                  li.innerHTML = `
                      ${student.name} - ${student.course} (${student.year}) 
                      <button class="edit" onclick="editStudent('${student.id}')">Editar</button>
                      <button class="delete" onclick="deleteStudent('${student.id}')">Deletar</button>`;
                  studentList.appendChild(li);
              });
          });
  }

  // Função para adicionar um novo estudante
  addStudentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = nameInput.value;
      const course = courseInput.value;
      const year = yearInput.value;

      fetch("/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, course, year }),
      })
          .then((response) => response.json())
          .then(() => {
              loadStudents();
              addStudentForm.reset();
          });
  });

  // Função para editar um estudante
  window.editStudent = function (id) {
      fetch(`/students/${id}`)
          .then((response) => response.json())
          .then((student) => {
              editNameInput.value = student.name;
              editCourseInput.value = student.course;
              editYearInput.value = student.year;
              editStudentIdInput.value = student.id;
              editStudentForm.style.display = "block";
          });
  };

  editStudentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = editStudentIdInput.value;
      const name = editNameInput.value;
      const course = editCourseInput.value;
      const year = editYearInput.value;

      fetch(`/students/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, course, year }),
      })
          .then((response) => response.json())
          .then(() => {
              loadStudents();
              editStudentForm.reset();
              editStudentForm.style.display = "none";
          });
  });

  // Função para deletar um estudante
  window.deleteStudent = function (id) {
      if (confirm("Tem certeza que deseja excluir este estudante?")) {
          fetch(`/students/${id}`, { method: "DELETE" })
              .then(() => {
                  loadStudents();
              });
      }
  };

  // Função para buscar estudante específico por ID
  window.getStudentById = function () {
      const studentId = document.getElementById("studentId").value;

      if (!studentId) {
          alert("Por favor, insira o ID do estudante.");
          return;
      }

      fetch(`/students/${studentId}`)
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else if (response.status === 404) {
                  throw new Error("Estudante não encontrado.");
              } else {
                  throw new Error("Erro ao buscar o estudante.");
              }
          })
          .then(student => {
              document.getElementById("studentInfo").innerHTML = `
                  <h3>Informações do Estudante</h3>
                  <p><strong>ID:</strong> ${student.id}</p>
                  <p><strong>Nome:</strong> ${student.name}</p>
                  <p><strong>Curso:</strong> ${student.course}</p>
                  <p><strong>Ano:</strong> ${student.year}</p>
              `;
          })
          .catch(error => {
              document.getElementById("studentInfo").innerHTML = `<p>${error.message}</p>`;
          });
  };

  // Carregar estudantes inicialmente
  loadStudents();
});
