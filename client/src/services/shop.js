import axios from "axios";
const API_URL = "http://localhost:8000/api/shop";

class ShopService {
  //* 購買商品
  buyProduct(userId, productId) {
    return axios.post(API_URL + "/intoShopCart", {
      userId,
      productId,
    });
  }
  //* 取得該使用者目前的購物車
  getBuyProduct(userId) {
    return axios.get(API_URL + `/getMyOrder/${userId}`);
  }
}

export default new ShopService();
