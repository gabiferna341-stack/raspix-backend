import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados PostgreSQL do Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 Backend rodando com sucesso!");
});

// Exemplo de rota que acessa o banco
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao acessar o banco");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
