import jwt from "jsonwebtoken";
import { error } from "../utils/response.js";


export const SECRET = "app_escola_segredo_super_secreto";


export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return error(res, "Token não fornecido", 401);
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (_err) {
    return error(res, "Token inválido ou expirado", 401);
  }
};


export const authorize = (...tipos) => (req, res, next) => {
  if (!req.user || !tipos.includes(req.user.tipo)) {
    return error(res, "Acesso negado", 403);
  }
  next();
};
