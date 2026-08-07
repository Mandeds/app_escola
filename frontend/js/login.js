document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  const mensagem = document.getElementById("mensagem");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
    };

    mensagem.textContent = "Entrando...";

    try {
      const resposta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (resultado.success) {
        localStorage.setItem("token", resultado.data.token);
        mensagem.style.color = "#27ae60";
        mensagem.textContent = resultado.message;
        window.location.href = "painel.html";
      } else {
        mensagem.style.color = "#c0392b";
        mensagem.textContent = resultado.message;
      }
    } catch (err) {
      mensagem.textContent = err.message || "Erro ao conectar ao servidor";
    }
  });
});
