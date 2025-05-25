// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
