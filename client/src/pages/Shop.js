import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopService from "../services/shop";
import EcpayService from "../services/ecpay";

export default function Shop() {
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState([]);
  const [currentBuyPrice, setCurrentBuyPrice] = useState(0);
  useEffect(() => {
    // 畫面一掛載時從資料庫取得相對應資料
    ShopService.getBuyProduct(
      JSON.parse(localStorage.getItem("userInfo"))["userObj"]["_id"]
    )
      .then((result) => {
        // console.log(result);
        setCurrentOrder(result["data"]["currentOrder"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCheckPay = (e) => {
    // 假如被打勾就增加金額
    if (e.target.checked) {
      setCurrentBuyPrice(
        (preState) =>
          preState + e.target["dataset"]["price"] * e.target["dataset"]["qty"]
      );
    } else {
      // 假如打勾取消就減少金額
      setCurrentBuyPrice(
        (preState) =>
          preState - e.target["dataset"]["price"] * e.target["dataset"]["qty"]
      );
    }
  };

  // ECPay
  const handleECPay = () => {
    console.log("hit ECPay");

    EcpayService.getEcpay()
      .then((result) => {
        console.log(result);
        const ecpayHtml = result["data"];
        navigate("/HandleEcpay", { state: { html: ecpayHtml } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="d-flex">
        {currentOrder ? (
          currentOrder.map((item) => (
            <div
              key={item._id}
              className="m-5 border border-3 border-warning p-4"
            >
              <div className="d-flex">
                <input
                  type="checkbox"
                  id={item["product"]["_id"]}
                  data-price={item["product"]["itemPrice"]}
                  data-qty={item["buyQty"]}
                  name="shopCheckbox"
                  style={{ width: "20px", marginRight: "20px" }}
                  onClick={(e) => handleCheckPay(e)}
                />
                <div>
                  <p> 商品名稱 : {item.product.itemName}</p>
                  <p> 商品價格 : {item.product.itemPrice}</p>
                  <p> 購買數量 : {item.buyQty}</p>
                  <p> 小計 : {item.product.itemPrice * item.buyQty}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>您還沒購買商品</>
        )}
      </div>
      <div className="shop-footer">
        <div>
          <input
            type="checkbox"
            id="shopAllCheckbox"
            style={{ width: "30px" }}
          />
          <label htmlFor="shopAllCheckbox">全選</label>
        </div>
        <div>
          總金額 ${currentBuyPrice} <button onClick={handleECPay}>買單</button>
        </div>
      </div>
    </>
  );
}
