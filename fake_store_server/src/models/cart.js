const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    cart_items: { type: Array, required: true }, // cart_items stored as an array
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
