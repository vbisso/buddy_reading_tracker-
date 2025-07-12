const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");
const userController = require("../controllers/users");

const validateUser = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  validate,
];

router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.post("/", authenticate, validateUser, userController.createUser);
router.put("/:id", authenticate, validateUser, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;
