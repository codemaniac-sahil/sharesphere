const express = require("express");
const createUser = require("../controller/auth/signup.js");
const login = require("../controller/auth/login.js");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
module.exports = router;
