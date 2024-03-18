import express from "express";
import cors from "cors";
import LivrosModel from "./module/livros/livros.model.js";

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 3000;

app.get("/livros", async (req, res) => {
  const livros = await LivrosModel.find({});
  return res.status(200).json(livros);
});

app.post("/livros/cadastro", async (req, res) => {
  const response = await LivrosModel.create({
    id: req.body.id,
    titulo: req.body.titulo,
    num_paginas: req.body.num_paginas,
    isbn: req.body.isbn,
    editora: req.body.editora,
  });
  return res.status(200).json({
    data: response,
  });
});

app.get("/livros/edicao/:id", async (req, res) => {
  const livro = await LivrosModel.findOne({ id: req.params.id });
  return res.status(200).json(livro);
});

app.put("/livros/edicao/:id", async (req, res) => {
  await LivrosModel.updateOne({ id: req.params.id }, req.body);
  const livroAtualizado = await LivrosModel.findOne({ id: req.params.id });
  return res.status(200).json(livroAtualizado);
});

app.delete("/livros/:id", async (req, res) => {
  const livro = await LivrosModel.deleteOne({ id: req.params.id });
  return res.status(200).json(livro);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
