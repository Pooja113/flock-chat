const express = require("express");
const router = express.Router();
const {
  fetchChats,
  createChats,
} = require("../controllers/chatControllers.js");
const auth = require("../middlewares/authMiddleware.js");

router.route("/:id").get(auth, fetchChats);
router.route("/").post(auth, createChats);

module.exports = router;
