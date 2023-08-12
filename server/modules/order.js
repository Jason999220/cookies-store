const mongoose = require("mongoose");

//  create a order Schema
const orderSchema = new mongoose.Schema({
  // 引用 User Schema
  // 給歷史訂單使用
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // 引用 Product Schema
  // 在【buy】【/getMyOrder/:userId】使用 populate
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  // 購買數量會動態增減
  buyQty: {
    type: Number,
    require: true,
  },
  // 購買當下地的時間
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
