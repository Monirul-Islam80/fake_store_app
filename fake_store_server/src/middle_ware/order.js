const {
  createOrder,
  getOrdersByUser,
  updateOrder,
} = require("../controllers/orderController");

const createOrderMiddleware = async (req, res, next) => {
  const userID = res.locals.userID;
  const { items } = req.body;

  const result = await createOrder({ userID, items });
  res.locals.result = result;
  next();
};

const getOrderByUserMiddleware = async (req, res, next) => {
  const userID = res.locals.userID;
  const result = await getOrdersByUser({ userID });
  res.locals.result = result;
  next();
};

const updateOrderMiddleware = async (req, res, next) => {
  console.log("====================================");
  console.log("dfkjdkjfk");
  console.log("====================================");
  const { orderID, isPaid, isDelivered } = req.body;
  const result = await updateOrder({ orderID, isPaid, isDelivered });
  res.locals.result = result;
  next();
};

module.exports = {
  createOrderMiddleware,
  getOrderByUserMiddleware,
  updateOrderMiddleware,
};
