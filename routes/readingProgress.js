const express = require("express");
const router = express.Router();
const readingProgressController = require("../controllers/readingProgress");

router.get("/", readingProgressController.getAllReadingProgress);
router.get("/:id", readingProgressController.getReadingProgressById);
router.post("/", readingProgressController.addReadingProgress);
router.put("/:id", readingProgressController.updateReadingProgress);
router.delete("/:id", readingProgressController.deleteReadingProgress);

module.exports = router;
