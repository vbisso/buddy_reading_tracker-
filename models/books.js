const mongoose = require("mongoose");
const booksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  totalPages: { type: Number, required: true },
  description: { type: String },
  publishedDate: { type: Date },
});

module.exports = mongoose.model("Book", booksSchema);
