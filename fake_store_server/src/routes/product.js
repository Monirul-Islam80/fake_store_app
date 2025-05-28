var express = require("express");
var router = express.Router();
const { getFakeStoreData } = require("../data/fakeStoreData");

router.get("/", (req, res, next) => {
  const path = req.query.path ? "products/" + req.query.path : "products";
  console.log(path);

  const data = getFakeStoreData(path) || { error: "nodata", path };

  res.json(data);
});

module.exports = router;
