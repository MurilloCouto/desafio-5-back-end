import mongoose from "../../config/mongo.js";
const { Schema } = mongoose;

const newsSchema = new Schema(
  {
    id: Number,
    titulo: String,
    num_paginas: Number,
    isbn: String,
    editora: String,
  },
  {
    timestamps: true,
  }
);

const LivrosModel = mongoose.model("Livros", newsSchema);

export default LivrosModel;
