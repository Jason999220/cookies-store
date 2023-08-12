// require router
const router = require("express").Router();
// require schema
const Order = require("../modules/order");

router.use((req, res, next) => {
  console.log("Server buy routes 認證處理中");
  next();
});

router.post("/intoShopCart", async (req, res) => {
  console.log("Server intoShopCart routes 處理中");
  const { userId, productId } = req.body;
  // 先找是否已存在
  const orderExist = await Order.findOne({
    purchaser: userId,
    product: productId,
  });
  if (orderExist) {
    // 假如訂單存在 => 更新 buyQty
    Order.findOneAndUpdate(
      { purchaser: userId, product: productId },
      { buyQty: orderExist["buyQty"] + 1 },
      {
        new: true,
        renValidators: true,
      }
    )
      .then(() => {
        res.send("Order update.");
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  } else {
    try {
      // 假如訂單不存在 => new Order
      const newOrder = new Order({
        purchaser: userId,
        product: productId,
        buyQty: 1,
      });
      const savedOrder = await newOrder.save();
      res.status(200).send({
        status: "successfully",
        message: "add new cookie successfully",
        orderObj: savedOrder,
      });
    } catch (err) {
      res.status("400").send({ status: "failure", message: err.errors });
    }
  }
});

// get user current order
router.get("/getMyOrder/:userId", async (req, res) => {
  console.log("Server intoShopCart routes 處理中");
  // 從網址取得 userID
  const { userId } = req.params;
  //   進到 order Schema 查詢資料
  // console.log(userId);
  const orderInfo = await Order.find({ purchaser: userId }).populate(
    "product",
    ["itemName", "itemPrice", "itemQty"] // 從【product】關聯中只取得【itemName、itemPrice、itemQty】
  );

  //   處理
  orderInfo.map((item) => {
    // console.log(item);
  });

  return res.status(200).send({
    currentOrder: orderInfo,
  });
});

module.exports = router;

// 一般信用卡測試卡號 : 4311-9522-2222-2222 安全碼 : 222
