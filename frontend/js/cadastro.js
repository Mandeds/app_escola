document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");
  const mensagem = document.getElementById("mensagem");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
      idade: document.getElementById("idade").value,
    };

    mensagem.textContent = "Cadastrando...";

    try {
      const resposta = await fetch("http://localhost:3001/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (resultado.success) {
        mensagem.style.color = "#27ae60";
        mensagem.textContent = resultado.message;
        window.location.href = "login.html";
      } else {
        mensagem.style.color = "#c0392b";
        mensagem.textContent = resultado.message;
      }
    } catch (err) {
      mensagem.textContent = err.message || "Erro ao conectar ao servidor";
    }
  });
});
