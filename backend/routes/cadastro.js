import { Router } from "express";
import pool from "../database.js";
import { success, error } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { required, isEmail, isLength } from "../utils/validators.js";
import { hashPassword } from "../utils/hash.js";

const router = Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { nome, email, senha, idade } = req.body;

    // Validações
    const campoNome = required(nome, "Nome");
    if (campoNome) return error(res, campoNome, 400);

    const campoEmail = required(email, "Email");
    if (campoEmail) return error(res, campoEmail, 400);
    if (!isEmail(email)) return error(res, "Email inválido", 400);

    const campoSenha = required(senha, "Senha");
    if (campoSenha) return error(res, campoSenha, 400);
    if (!isLength(senha, 6, 100))
      return error(res, "Senha deve ter no mínimo 6 caracteres", 400);


    const [existente] = await pool.query(
      "SELECT id_user FROM usuario WHERE email = ?",
      [email]
    );
    if (existente.length > 0) return error(res, "Email já cadastrado", 409);


    const { salt, hash } = hashPassword(senha);

    const [result] = await pool.query(
      "INSERT INTO usuario (nome, email, senha, idade, tipo) VALUES (?, ?, ?, ?, 'aluno')",
      [nome, email, `${salt}:${hash}`, idade]
    );

    return success(
      res,
      { id: result.insertId },
      "Cadastro realizado com sucesso",
      201
    );
  })
);

export default router;
