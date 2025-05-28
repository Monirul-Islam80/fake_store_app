const { generateToken, verifyToken } = require("../service/jsw");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: "error", message: "Token missing" });
  }

  const verifyResult = await verifyToken(token);

  if (verifyResult.status === "OK") {
    req.user = verifyResult.userID;
    res.locals.userID = verifyResult.userID;
    return next();
  }

  res.status(401).json(verifyResult);
};

const setToken = (req, res, next) => {
  const userID = res.locals.userID;
  if (!userID) return next();
  const token = generateToken(userID);
  res.locals.result = { ...res.locals.result, token };
  next();
};

module.exports = { setToken, auth };
