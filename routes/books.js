const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const bookController = require("../controllers/books");
const validate = require("../middleware/validate");

const bookValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("isbn").notEmpty().withMessage("ISBN is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("totalPages")
    .isInt({ gt: 0 })
    .withMessage("Total pages must be a positive number"),
  body("publishedDate")
    .optional()
    .isISO8601()
    .withMessage("Published date must be a valid ISO 8601 date"),
];

router.get("/", bookController.getAllBooks);
router.post("/", bookValidationRules, validate, bookController.addBook);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookValidationRules, validate, bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
