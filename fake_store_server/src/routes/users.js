var express = require("express");
var router = express.Router();
const {
  sendResponse,
  checkUserMiddleware,
  updateUserMiddleware,
  createUserMiddleware,
} = require("../middle_ware/user");
const { setToken, auth } = require("../middle_ware/auth");

router.get("/", async function (req, res, next) {
  const result = { result: "Nothing's here, go awaya" };
  res.json(result);
});
router.post("/signup", [createUserMiddleware, setToken, sendResponse]);
router.post("/signin", [checkUserMiddleware, setToken, sendResponse]);
router.post("/update", [auth, updateUserMiddleware, sendResponse]);
module.exports = router;
