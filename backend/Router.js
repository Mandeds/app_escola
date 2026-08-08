import { Router } from "express";
import loginRouter from "./login.js";
import cadastroRouter from "./cadastro.js";
import tarefasRouter from "./tarefas.js";
import { exigirLogin } from "./authMiddleware.js";

const router = Router();

router.use("/login", loginRouter);
router.use("/cadastro", cadastroRouter);
router.use("/tarefas", exigirLogin, tarefasRouter);

export default router;