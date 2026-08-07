import { Router } from "express";
import pool from "../database.js";
import { success } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { auth } from "../middlewares/auth.js";

const router = Router();


router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const user = req.user;

    let resumo = null;

    // Admin vê um resumo geral do sistema
    if (user.tipo === "admin") {
      const [totalUsuarios] = await pool.query(
        "SELECT COUNT(*) AS total FROM usuario"
      );
      const [totalAlunos] = await pool.query(
        "SELECT COUNT(*) AS total FROM alunos"
      );
      const [totalProfessores] = await pool.query(
        "SELECT COUNT(*) AS total FROM usuario WHERE tipo = 'professor'"
      );
      const [totalTurmas] = await pool.query(
        "SELECT COUNT(*) AS total FROM turmas"
      );

      resumo = {
        totalUsuarios: totalUsuarios[0].total,
        totalAlunos: totalAlunos[0].total,
        totalProfessores: totalProfessores[0].total,
        totalTurmas: totalTurmas[0].total,
      };
    }

    return success(
      res,
      {
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          tipo: user.tipo,
        },
        resumo,
      },
      "Dashboard carregado"
    );
  })
);

export default router;
