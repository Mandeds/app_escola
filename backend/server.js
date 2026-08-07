import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import router from "./router.js";
import { exigirLogin } from "./authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

app.use(session({
    secret: "se_tentar_hackear_aqui_vai_ter_1000anos_de_azar!!",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } 
}));

// serve a pasta do frontend
app.use(express.static(path.join(__dirname, "../frontend/src")));

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/src/pages/login/login.html"));
});

app.get("/painel", exigirLogin, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/src/pages/painel/painel.html"));
});

app.use(router);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});