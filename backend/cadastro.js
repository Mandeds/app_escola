import { Router } from "express";
import pool from "./database.js";

const cadastroRouter = Router();

cadastroRouter.post("/", (req, res) => {
    const { nome, email, senha, idade } = req.body;

    if (!nome || !email || !senha || !idade) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    pool.query(
        "INSERT INTO usuario (nome, email, senha, idade) VALUES (?,?,?,?)",
        [nome, email, senha, idade],
        (err, resultado) => {
            if (err) {
                console.error("Erro ao cadastrar:", err);
                return res.status(500).json({ erro: "Erro ao cadastrar" });
            }
            res.status(201).json({
                success: true,
                id_user: resultado.insertId
            });
        }
    );
});

export default cadastroRouter;
