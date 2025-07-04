const express = require("express");
const router = express.Router();
const highlightsNotesController = require("../controllers/highlightsNotes");

router.get("/", highlightsNotesController.getAllHighlightsNotes);
router.get("/:id", highlightsNotesController.getHighlightNoteById);
router.post("/", highlightsNotesController.addHighlightNote);
router.put("/:id", highlightsNotesController.updateHighlightNote);
router.delete("/:id", highlightsNotesController.deleteHighlightNote);

module.exports = router;
