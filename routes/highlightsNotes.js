const express = require("express");
const router = express.Router();
const highlightsNotesController = require("../controllers/highlightsNotes");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, highlightsNotesController.getAllHighlightsNotes);
router.get(
  "/:id",
  authenticate,
  highlightsNotesController.getHighlightNoteById
);
router.post("/", authenticate, highlightsNotesController.addHighlightNote);
router.put("/:id", authenticate, highlightsNotesController.updateHighlightNote);
router.delete(
  "/:id",
  authenticate,
  highlightsNotesController.deleteHighlightNote
);

module.exports = router;
