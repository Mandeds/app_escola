import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const variaveisObrigatorias = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_DATABASE"];
const faltando = variaveisObrigatorias.filter((v) => !process.env[v]);

if (faltando.length > 0) {
    throw new Error(
        `Faltam variáveis no .env: ${faltando.join(", ")}. Confira o arquivo backend/.env`
    );
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        ca: fs.readFileSync("./ca.pem").toString()
    },
    connectionLimit: 10
});

export default pool;
