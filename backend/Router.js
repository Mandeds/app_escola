import mysql from "mysql2"
import { Router } from "express";
import loginRouter from "./login_route.js";

const router = Router();

router.use("/login", loginRouter);

export default router;

// NÃO ALTERE OS COMANDOS ACIMA !!!!!!!!!!
