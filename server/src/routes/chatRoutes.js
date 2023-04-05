const express = require("express");
const router = express.Router();
const {
  fetchChats,
  accessChats,
} = require("../controllers/chatControllers.js");
const auth = require("../middlewares/authMiddleware.js");

router.route("/").get(auth, fetchChats);
router.route("/").post(auth, accessChats);

module.exports = router;
