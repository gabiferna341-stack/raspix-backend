const express = require("express");
const app = express();
const PORT = process.env.PORT; // 🔹 Apenas a porta do Render

app.use(express.json());

// 🔹 Rota de saúde (teste rápido)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 🔹 Rota de ping
app.get("/ping", (req, res) => {
  res.send("pong");
});

// 🔹 Rota de saldo (fake)
app.get("/saldo", (req, res) => {
  res.json({ saldo: 100 }); // saldo fixo por enquanto
});

// 🔹 Rota de jogar (fake)
app.post("/jogar", (req, res) => {
  // Lógica fake: 50% chance de ganhar
  const ganhou = Math.random() > 0.5;
  const premio = ganhou ? 10 : 0;

  res.json({
    resultado: ganhou ? "ganhou" : "perdeu",
    premio,
  });
});

// 🔹 Rota de pagamento (fake)
app.post("/pagamento", (req, res) => {
  res.json({
    status: "sucesso",
    mensagem: "Pagamento processado (fake)",
  });
});

// 🚀 Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Backend rodando na porta ${PORT}`);
});
