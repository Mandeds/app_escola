import express from "express";
import cors from "cors";
import loginRouter from "./routes/login.js";
import cadastroRouter from "./routes/cadastro.js";
import alunosRouter from "./routes/alunos.js";
import dashboardRouter from "./routes/dashboard.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.use("/login", loginRouter);
app.use("/cadastro", cadastroRouter);
app.use("/alunos", alunosRouter);
app.use("/dashboard", dashboardRouter);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
