const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/auth/google", (req, res) => {
  const token = jwt.sign(
    { id: "fake-id-123" },
    process.env.JWT_SECRET || "default-secret",
    {
      expiresIn: "1h",
    }
  );
  res.json({ message: "Logged in as Test User", token });
});

module.exports = router;
