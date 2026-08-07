import { Router } from "express";
import pool from "./database.js";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
    res.send("Rota de login funcionando!");
});

loginRouter.post("/", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    pool.query(
        "SELECT id_user FROM usuario WHERE email = ? AND senha = ?",
        [email, senha],
        (err, resultados) => {
            if (err) {
                console.error("Erro no login:", err);
                return res.status(500).json({ erro: "Erro interno no servidor" });
            }

            if (resultados.length === 0) {
                return res.status(401).json({ erro: "Credenciais inválidas" });
            }

            req.session.usuarioId = resultados[0].id_user; // marca a sessão como logada
            res.json({ mensagem: "Login realizado com sucesso" });
        }
    );
});

export default loginRouter;

// NÃO ALTERE OS COMANDOS ACIMA !!!!!!!!!!
