const Cart = require("../models/cart");

const updateCart = async ({ uid, items }) => {
  try {
    const result = await Cart.findOneAndUpdate(
      { uid: uid },
      { cart_items: items }
    );
    return { status: "OK", result };
  } catch (e) {
    console.error(`Error in updateCart: ${e}`);
    return { status: "error", message: "update cart error" };
  }
};

const getCart = async ({ uid }) => {
  try {
    const cart = await Cart.findOne({ uid: uid });
    return { status: "OK", items: cart?.cart_items || [] };
  } catch (e) {
    console.error(`Error in getCart: ${e}`);
    return { status: "error", message: "Failed to get cart items!" };
  }
};

module.exports = { getCart, updateCart };
