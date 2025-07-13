const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const highlightsNotesController = require("../controllers/highlightsNotes");

const validateHighlightNote = [
  body("bookId").notEmpty().withMessage("bookId is required"),
  body("content").notEmpty().withMessage("Note cannot be empty"),
  validate,
];

router.get("/", authenticate, highlightsNotesController.getAllHighlightsNotes);
router.get(
  "/:id",
  authenticate,
  highlightsNotesController.getHighlightNoteById
);
router.post(
  "/",
  authenticate,
  validateHighlightNote,
  highlightsNotesController.addHighlightNote
);
router.put(
  "/:id",
  authenticate,
  validateHighlightNote,
  highlightsNotesController.updateHighlightNote
);
router.delete(
  "/:id",
  authenticate,
  highlightsNotesController.deleteHighlightNote
);

module.exports = router;
