const mongoose = require("mongoose");

// 1. create a Schema
const productSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  itemName: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 30,
  },
  itemDesc: {
    type: String,
    minLength: 0,
    maxLength: 200,
  },
  itemPrice: {
    type: Number,
    require: true,
  },
  itemThumbnail: {
    type: String,
    require: true,
  },
  itemQty: {
    type: Number,
    require: true,
  },
  itemCategoriesPath: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now, // 在 mongoose 不需要加括號，在JS需要 Date.now()
  },
});

// 4. 匯出模組
// module.exports = mongoose.model('DB的資料表',schame);
module.exports = mongoose.model("Product", productSchema);
