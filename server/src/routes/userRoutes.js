const express = require("express");
const router = express.Router();
const {
  register,
  login,
  fetchAllUsers,
} = require("../controllers/userControllers.js");
const auth = require("../middlewares/authMiddleware.js");

router.post("/register", register);
router.post("/login", login);
router.get("/all", auth,fetchAllUsers);

module.exports = router;
