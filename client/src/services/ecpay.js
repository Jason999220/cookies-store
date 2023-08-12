import axios from "axios";
// const API_URL = "http://localhost:8000/api/ecpay";
const API_URL =
  "https://9336-2401-e180-88a1-2f79-2531-601c-41c7-c9a3.ngrok-free.app/api/ecpay";
class EcpayService {
  // 取得該使用者目前的購物車
  getEcpay() {
    let num = Math.floor(Math.random() * 1000);
    console.log("getEcpay");
    return axios.post(API_URL, {
      MerchantTradeNo: "AbCd" + num, // 為了讓每次訂單編號都是唯一值
      TotalAmount: "1000", // 大於 0
      TradeDesc: "測試交易描述", // 必填
      ItemName: "測試商品等", // 必填
    });
  }

  getEcpayResult() {
    console.log("getEcpayResult");
    return axios.post("http://localhost:3000/profile");
  }
}

export default new EcpayService();
