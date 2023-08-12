const router = require("express").Router();

const Product = require("../modules/product");
// http://localhost:3000/api/product => 都會進來

// 新增商品 完成
router.post("/sell", async (req, res) => {
  console.log("Server product routes 處理中");
  // 1. get the product info
  const {
    email,
    itemName,
    itemDesc,
    itemPrice,
    itemQty,
    itemCategories,
    itemThumbnail,
  } = req.body;
  // console.log("itemThumbnail");
  // console.log(itemThumbnail["data"][0]);
  try {
    //  2. send the DB，new model
    const newProduct = new Product({
      email,
      itemName,
      itemDesc,
      itemPrice,
      itemQty,
      itemCategoriesPath: `/store/categories/${itemCategories}`,
      itemThumbnail: itemThumbnail["data"][0],
    });
    // console.log(newProduct);
    console.log("Server product routes 已建立模組");
    const savedProduct = await newProduct.save();
    console.log("Server product routes 已儲存模組");
    res.status(200).send({
      status: "successfully",
      message: "add new cookie successfully",
      productObj: savedProduct,
    });
  } catch (err) {
    res.status("400").send({ status: "failure", message: err.errors });
  }
});

// 查詢個人已上架的商品 完成
router.get("/selled/:email", async (req, res) => {
  // 利用網址參數得到當前使用者 email
  const { email } = req.params;
  // 進資料庫找尋 【itemUser === email】
  const productExist = await Product.find({ email });
  // 不為空陣列 => 使用者有賣東西
  if (productExist.length > 0) {
    return res.status(200).send({
      foundStatus: true,
      productObj: productExist,
      message: "Found sold products by the user",
    });
  } else {
    // 不空陣列 => 使用者沒有賣東西
    return res
      .status(200)
      .send({ foundStatus: false, message: "Products not sold by the user" });
  }
});

// 查詢已購買的商品
// 查詢份類的所有商品
router.get("/categories/:category", async (req, res) => {
  const productExist = await Product.find({
    itemCategoriesPath: `/store/categories/${req.params.category}`,
  });
  // 不為空陣列 => 使用者有賣東西
  return res.status(200).send({
    productObj: productExist,
  });
});

// 查詢全部商品 完成
router.get("/allProducts", async (req, res) => {
  const productExist = await Product.find({});
  // 不為空陣列 => 使用者有賣東西
  return res.status(200).send({
    productObj: productExist,
  });
});

module.exports = router;
