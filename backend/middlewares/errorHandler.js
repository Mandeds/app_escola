import { error } from "../utils/response.js";


const errorHandler = (err, req, res, _next) => {
  console.error(err);
  return error(res, err.message || "Erro interno do servidor", 500);
};

export default errorHandler;
