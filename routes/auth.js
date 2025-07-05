const express = require("express");
const passport = require("passport");
require("../auth/google");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Redirect to Swagger with token or return token in JSON
    res.json({ token: req.user.token, user: req.user.user });
  }
);

module.exports = router;
