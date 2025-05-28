var express = require("express");
var router = express.Router();
const {
  getCartMiddleware,
  updateCartMiddleware,
} = require("../middle_ware/cart");
const { auth } = require("../middle_ware/auth");
const { sendResponse } = require("../middle_ware/user");
router.get("/", [auth, getCartMiddleware, sendResponse]);
router.put("/", [auth, updateCartMiddleware, sendResponse]);

module.exports = router;
