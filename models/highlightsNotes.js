const mongoose = require("mongoose");
const highlightNotesSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userId: { type: String, required: true }, //replace later with mongoose.Schema.Types.ObjectId once we have req.user.id for authentication
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },

  pageNumber: { type: Number, required: true },
  noteType: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HighlightNotes", highlightNotesSchema);
