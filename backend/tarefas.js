import { Router } from "express";
import pool from "./database.js";

const tarefasRouter = Router();

tarefasRouter.get("/", (req, res) => {
    const { mes, ano } = req.query;

    if (!mes || !ano) {
        return res.status(400).json({ erro: "Informe mês e ano" });
    }

    pool.query(
        "SELECT id, DATE_FORMAT(data, '%Y-%m-%d') AS data, titulo, tipo FROM tarefas WHERE MONTH(data) = ? AND YEAR(data) = ?",
        [mes, ano],
        (err, resultados) => {
            if (err) {
                console.error("Erro ao buscar tarefas:", err);
                return res.status(500).json({ erro: "Erro ao buscar tarefas" });
            }
            res.json(resultados);
        }
    );
});

tarefasRouter.post("/", (req, res) => {
    const { data, titulo, tipo } = req.body;

    if (!data || !titulo || !tipo) {
        return res.status(400).json({ erro: "data, titulo e tipo são obrigatórios" });
    }

    pool.query(
        "INSERT INTO tarefas (data, titulo, tipo) VALUES (?, ?, ?)",
        [data, titulo, tipo],
        (err, resultado) => {
            if (err) {
                console.error("Erro ao criar tarefa:", err);
                return res.status(500).json({ erro: "Erro ao criar tarefa" });
            }
            res.status(201).json({ id: resultado.insertId, data, titulo, tipo });
        }
    );
});

tarefasRouter.delete("/:id", (req, res) => {
    pool.query(
        "DELETE FROM tarefas WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) {
                console.error("Erro ao remover tarefa:", err);
                return res.status(500).json({ erro: "Erro ao remover tarefa" });
            }
            res.json({ mensagem: "Tarefa removida" });
        }
    );
});

export default tarefasRouter;