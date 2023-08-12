// require router
const router = require("express").Router();
// require schema
const Order = require("../modules/order");
const ecpay_payment = require("../lib/ecpay_payment.js");

// 處理 ECPay
router.post("/", (req, res) => {
  let date = new Date().toLocaleString("zh", { hour12: false }); // 台灣當前時間
  const { MerchantTradeNo, TotalAmount, TradeDesc, ItemName } = req.body;
  //若要測試非必帶參數請將base_param內註解的參數依需求取消註解 //
  let base_param = {
    MerchantID: "2001132", // 特店編號
    MerchantTradeNo: MerchantTradeNo, // 必須每次都不一樣，20碼
    // MerchantTradeDate: `${date}`, //ex: 2017/02/13 15:45:30
    MerchantTradeDate: "2017/02/13 15:45:30", //ex: 2017/02/13 15:45:30
    TotalAmount: TotalAmount,
    TradeDesc: TradeDesc,
    ItemName: ItemName,
    PaymentType: "aio",
    // server 端接收付款結果
    ReturnURL:
      "https://9336-2401-e180-88a1-2f79-2531-601c-41c7-c9a3.ngrok-free.app/api/ecpay/getEcpayData",
    // ChooseSubPayment: '',
    OrderResultURL: "http://localhost:3000/profile", // client 端接收付款結果
    // NeedExtraPaidInfo: "1",
    ClientBackURL: "http://localhost:3000/profile", // 回到 client
    // ItemURL: 'http://item.test.tw',
    // Remark: '交易備註',
    // HoldTradeAMT: "1",
    // StoreID: '',
    // CustomField1: '',
    // CustomField2: '',
    // CustomField3: '',
    // CustomField4: ''
  };
  // 處理 ECPay
  router.post("/", (req, res) => {
    let date = new Date().toLocaleString("zh", { hour12: false }); // 台灣當前時間
    const { MerchantTradeNo, TotalAmount, TradeDesc, ItemName } = req.body;
    //若要測試非必帶參數請將base_param內註解的參數依需求取消註解 //
    let base_param = {
      MerchantID: "2001132", // 特店編號
      MerchantTradeNo: MerchantTradeNo, // 必須每次都不一樣，20碼
      // MerchantTradeDate: `${date}`, //ex: 2017/02/13 15:45:30
      MerchantTradeDate: "2017/02/13 15:45:30", //ex: 2017/02/13 15:45:30
      TotalAmount: TotalAmount,
      TradeDesc: TradeDesc,
      ItemName: ItemName,
      PaymentType: "aio",
      // server 端接收付款結果
      ReturnURL:
        "https://9336-2401-e180-88a1-2f79-2531-601c-41c7-c9a3.ngrok-free.app/api/ecpay/getEcpayData",
      // ChooseSubPayment: '',
      OrderResultURL: "http://localhost:3000/profile", // client 端接收付款結果
      // NeedExtraPaidInfo: "1",
      ClientBackURL: "http://localhost:3000/profile", // 回到 client
      // ItemURL: 'http://item.test.tw',
      // Remark: '交易備註',
      // HoldTradeAMT: "1",
      // StoreID: '',
      // CustomField1: '',
      // CustomField2: '',
      // CustomField3: '',
      // CustomField4: ''
    };

    const options = require("../conf/config-example"),
      create = new ecpay_payment(options),
      htm = create.payment_client.aio_check_out_credit_onetime(
        (parameters = base_param),
        (invoice = inv_params)
      );
    res.send(htm);
  });

  router.post("/getEcpayData", (req, res) => {
    console.log(req.body); // server 可以接受到回傳值
    res.send(req.body);
  });
  const options = require("../conf/config-example"),
    create = new ecpay_payment(options),
    htm = create.payment_client.aio_check_out_credit_onetime(
      (parameters = base_param),
      (invoice = inv_params)
    );
  res.send(htm);
});

router.post("/getEcpayData", (req, res) => {
  console.log(req.body); // server 可以接受到回傳值
  res.send(req.body);
});

module.exports = router;

// 一般信用卡測試卡號 : 4311-9522-2222-2222 安全碼 : 222
