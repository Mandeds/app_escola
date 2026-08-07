import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../database.js";
import { success, error } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyPassword } from "../utils/hash.js";
import { SECRET } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, senha } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return error(res, "Usuário não encontrado", 401);
    }

    const usuario = rows[0];
    const [salt, hash] = usuario.senha.split(":");

    if (!verifyPassword(senha, salt, hash)) {
      return error(res, "Senha incorreta", 401);
    }

// Gera o token JWT
    const token = jwt.sign(
      {
        id: usuario.id_user,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      SECRET,
      { expiresIn: "7d" }
    );

    return success(
      res,
      {
        token,
        user: {
          id: usuario.id_user,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo,
        },
      },
      "Login realizado com sucesso"
    );
  })
);

export default router;
