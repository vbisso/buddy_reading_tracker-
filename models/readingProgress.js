const mongoose = require("mongoose");

const readingProgressSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userId: { type: String, required: true }, //replace later with mongoose.Schema.Types.ObjectId once we have req.user.id for authentication
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  // bookId: { type: String, required: true },
  currentPage: { type: Number, required: true },
  percentageComplete: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ReadingProgress", readingProgressSchema);
