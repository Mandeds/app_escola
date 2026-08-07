import { Router } from "express";
import pool from "../database.js";
import { success, error } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { auth, authorize } from "../middlewares/auth.js";

const router = Router();
router.use(auth);


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
      `SELECT a.id_aluno, a.nome, a.ano, a.id_turma, t.nome AS turma_nome
       FROM alunos a
       LEFT JOIN turmas t ON a.id_turma = t.id_turma`
    );
    return success(res, rows, "Alunos listados");
  })
);


router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT a.id_aluno, a.nome, a.ano, a.id_turma, t.nome AS turma_nome
       FROM alunos a
       LEFT JOIN turmas t ON a.id_turma = t.id_turma
       WHERE a.id_aluno = ?`,
      [id]
    );

    if (rows.length === 0) return error(res, "Aluno não encontrado", 404);
    return success(res, rows[0], "Aluno encontrado");
  })
);


router.post(
  "/",
  authorize("admin", "professor"),
  asyncHandler(async (req, res) => {
    const { nome, ano, id_turma } = req.body;

    if (!nome) return error(res, "Nome é obrigatório", 400);

    const [result] = await pool.query(
      "INSERT INTO alunos (nome, ano, id_turma) VALUES (?, ?, ?)",
      [nome, ano || null, id_turma || null]
    );

    return success(res, { id_aluno: result.insertId }, "Aluno cadastrado", 201);
  })
);

router.put(
  "/:id",
  authorize("admin", "professor"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nome, ano, id_turma } = req.body;

    const [existente] = await pool.query(
      "SELECT id_aluno FROM alunos WHERE id_aluno = ?",
      [id]
    );
    if (existente.length === 0)
      return error(res, "Aluno não encontrado", 404);

    await pool.query(
      "UPDATE alunos SET nome = ?, ano = ?, id_turma = ? WHERE id_aluno = ?",
      [nome, ano || null, id_turma || null, id]
    );

    return success(res, null, "Aluno atualizado");
  })
);


router.delete(
  "/:id",
  authorize("admin"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [existente] = await pool.query(
      "SELECT id_aluno FROM alunos WHERE id_aluno = ?",
      [id]
    );
    if (existente.length === 0)
      return error(res, "Aluno não encontrado", 404);

    await pool.query("DELETE FROM alunos WHERE id_aluno = ?", [id]);

    return success(res, null, "Aluno removido");
  })
);

export default router;
