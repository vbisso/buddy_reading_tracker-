const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const readingProgressController = require("../controllers/readingProgress");

const validateReadingProgress = [
  body("bookId").notEmpty().withMessage("bookId is required"),
  body("currentPage")
    .isInt({ min: 0 })
    .withMessage("currentPage must be a non-negative integer"),
  validate,
];

router.get("/", authenticate, readingProgressController.getAllReadingProgress);
router.get(
  "/:id",
  authenticate,
  readingProgressController.getReadingProgressById
);
router.post(
  "/",
  authenticate,
  validateReadingProgress,
  readingProgressController.addReadingProgress
);
router.put(
  "/:id",
  authenticate,
  validateReadingProgress,
  readingProgressController.updateReadingProgress
);
router.delete(
  "/:id",
  authenticate,
  readingProgressController.deleteReadingProgress
);

module.exports = router;
