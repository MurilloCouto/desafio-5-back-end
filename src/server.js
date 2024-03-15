import express from "express";
import cors from "cors";
import LivrosModel from "./module/livros/livros.model.js";

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 3000;

app.get("/livros", async (_, res) => {
  const livros = await LivrosModel.find({});
  return res.status(200).json(livros);
});

app.post("/livros/cadastro", async (req, res) => {
  const { id, titulo, num_paginas, isbn, editora } = req.body;

  try {
    const novoLivro = await LivrosModel.create({
      id: id,
      titulo: titulo,
      num_paginas: num_paginas,
      isbn: isbn,
      editora: editora,
    });

    const livroCriado = await LivrosModel.findOne({ _id: novoLivro._id });

    return res.status(201).json({
      mensagem: "Livro cadastrado com sucesso!",
      livro: livroCriado,
    });
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar livro." });
  }
});

app.get("/livros/edicao/:id", async (req, res) => {
  try {
    const livroId = req.params.id;
    const livro = await LivrosModel.findOne({ id: livroId });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    return res.status(200).json(livro);
  } catch (error) {
    console.error("Erro durante a busca do livro:", error);
    return res.status(500).json({ mensagem: "Erro durante a busca do livro." });
  }
});

app.put("/livros/edicao/:id", async (req, res) => {
  try {
    const livroId = req.params.id;

    const updatedLivro = await LivrosModel.findOneAndUpdate(
      { id: livroId },
      req.body,
      { new: true }
    );

    if (!updatedLivro) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    return res
      .status(200)
      .json({ mensagem: "Livro atualizado com sucesso!", livro: updatedLivro });
  } catch (error) {
    console.error("Erro durante a edição do livro:", error);
    return res
      .status(500)
      .json({ mensagem: "Erro durante a edição do livro." });
  }
});

app.delete("/livros/:id", async (req, res) => {
  try {
    const livroId = req.params.id;

    const deletedLivro = await LivrosModel.findOneAndDelete({
      id: livroId,
    });

    if (!deletedLivro) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    return res.status(200).json({ mensagem: "Livro removido com sucesso!" });
  } catch (error) {
    console.error("Erro durante a remoção do livro:", error);
    return res
      .status(500)
      .json({ mensagem: "Erro durante a remoção do livro." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
