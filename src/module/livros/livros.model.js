import mongoose from "../../config/mongo.js";
const { Schema } = mongoose;

const newsSchema = new Schema(
  {
    id: { type: Number, required: true },
    titulo: { type: String, required: true },
    num_paginas: { type: Number, required: true },
    isbn: { type: String, required: true },
    editora: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const LivrosModel = mongoose.model("Livros", newsSchema);

export default LivrosModel;
