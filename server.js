const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com Postgres (use a DATABASE_URL do Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // necessário em conexões externas
});

// Rota de saúde (Render pode usar para health check)
app.get("/ping", async (req, res) => {
  try {
    const r = await pool.query("SELECT NOW()");
    res.json({ pong: true, time: r.rows[0].now });
  } catch (e) {
    console.error("DB error:", e);
    res.status(500).json({ pong: false, error: "DB connection failed" });
  }
});

// Porta vinda do Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Backend ouvindo na porta ${PORT}`);
});
