import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
    res.send("Rota de login funcionando!");
});

loginRouter.post("/", (req, res) => {

    const { email, senha } = req.body;

    console.log(email);
    console.log(senha);

    req.session.usuarioId = email; // marca a sessão como logada

    res.json({
        mensagem: "Login recebido"
    });

});

export default loginRouter;

// NÃO ALTERE OS COMANDOS ACIMA !!!!!!!!!!