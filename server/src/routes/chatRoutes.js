const express = require("express");
const router = express.Router();
const {
  fetchChats,
  accessChats,
} = require("../controllers/chatControllers.js");

router.post("/", fetchChats);
router.get("/", accessChats);

module.exports = router;
