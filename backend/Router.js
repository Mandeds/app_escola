import { Router } from "express";
import loginRouter from "./login.js";
import cadastroRouter from "./cadastro.js";

const router = Router();

router.use("/login", loginRouter);
router.use("/cadastro", cadastroRouter);

export default router;
