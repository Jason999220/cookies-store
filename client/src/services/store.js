import axios from "axios";
const API_URL = "http://localhost:8000/api/store";

class StoreService {
  // 上架商品
  addProduct(itemUser) {
    return axios.post(API_URL + "/sell", {
      itemUser,
    });
  }
  // 取得所有商品
  getAllProduct() {
    return axios.get(API_URL + "/allProducts");
  }
  // 取得類別商品
  getCategoriesProduct() {
    return axios.get(API_URL + "/categories/");
  }
  //   取得自己上架商品
  getSellProduct() {}
}

export default new StoreService();
