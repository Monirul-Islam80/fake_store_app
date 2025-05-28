const Order = require("../models/order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return { status: "OK", orders };
  } catch (e) {
    console.error(`Error in getAllOrders: ${e}`);
    return { status: "error", message: "Failed to get all orders!" };
  }
};

const getOrdersByUser = async ({ userID }) => {
  try {
    const orders = await Order.find({ uid: userID });
    return { status: "OK", orders };
  } catch (e) {
    console.error(`Error in getOrdersByUser: ${e}`);
    return { status: "error", message: "Failed to get orders by user!" };
  }
};

const createOrder = async ({ userID, items }) => {
  try {
    const [itemNumber, totalPrice] = items.reduce(
      ([cnt, sum], itm) => [
        cnt + itm.quantity,
        sum + Math.round(itm.quantity * itm.price * 100),
      ],
      [0, 0]
    );

    const newOrder = new Order({
      uid: userID,
      item_numbers: itemNumber,
      total_price: totalPrice,
      order_items: items,
      is_paid: false,
      is_delivered: false,
    });

    await newOrder.save();
    return { status: "OK", id: newOrder._id };
  } catch (e) {
    console.error(`Error in createOrder: ${e}`);
    return { status: "error", message: "Failed to insert orders!" };
  }
};

const updateOrder = async ({ orderID, isPaid, isDelivered }) => {
  try {
    const result = await Order.findByIdAndUpdate(
      orderID,
      {
        is_paid: isPaid,
        is_delivered: isDelivered,
      },
      { new: true }
    );

    return { status: "OK", result };
  } catch (e) {
    console.error(`Error in updateOrder: ${e}`);
    return { status: "error", message: "update order error" };
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUser,
  createOrder,
  updateOrder,
};
