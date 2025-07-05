const express = require("express");
const router = express.Router();
const readingProgressController = require("../controllers/readingProgress");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, readingProgressController.getAllReadingProgress);
router.get(
  "/:id",
  authenticate,
  readingProgressController.getReadingProgressById
);
router.post("/", authenticate, readingProgressController.addReadingProgress);
router.put(
  "/:id",
  authenticate,
  readingProgressController.updateReadingProgress
);
router.delete(
  "/:id",
  authenticate,
  readingProgressController.deleteReadingProgress
);

module.exports = router;
