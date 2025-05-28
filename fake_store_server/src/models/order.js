const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    item_numbers: { type: Number, required: true },
    total_price: { type: Number, required: true },
    is_paid: { type: Boolean, default: false },
    is_delivered: { type: Boolean, default: false },
    order_items: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
