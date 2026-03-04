const express = require("express");
const cors = require("cors");
const { sequelize, TbExemplo } = require("./bd");
const app = express();

//===========================
// MIDDLEWARES
//===========================
app.use(cors());
app.use(express.json());
const PORT = 3000;

//===========================
// GET‑READ
//===========================
app.get("/exemplos", async (req, res) => {
  try {
    const dados = await TbExemplo.findAll();
    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar registros" });
  }
});

//===========================
// POST‑CREATE
//===========================
app.post("/exemplos", async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    const novoRegistro = await TbExemplo.create({ nome, descricao });
    res.status(201).json(novoRegistro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar registro" });
  }
});

//===========================
// PUT‑UPDATE
//===========================
app.put("/exemplos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const registro = await TbExemplo.findByPk(id);
    if (!registro) {
      return res.status(404).json({ erro: "Registro não encontrado" });
    }
    registro.nome = nome;
    registro.descricao = descricao;
    await registro.save();

    res.status(200).json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar registro" });
  }
});

//===========================
// DELETE‑DELETE
//===========================
app.delete("/exemplos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await TbExemplo.findByPk(id);
    if (!registro) {
      return res.status(404).json({ erro: "Registro não encontrado" });
    }
    await registro.destroy();
    res.status(200).json({ mensagem: "Registro excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao excluir registro" });
  }
});

//===========================
// INICIALIZAÇÃO DO SERVIDOR
//===========================
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});