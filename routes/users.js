const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.post("/", authenticate, userController.createUser);
router.delete("/:id", authenticate, userController.deleteUser);
router.put("/:id", authenticate, userController.updateUser);

module.exports = router;
