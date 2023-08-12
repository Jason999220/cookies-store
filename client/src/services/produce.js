import axios from "axios";
const API_URL = "http://localhost:8000/api/product";

class ProductService {
  // 上架商品
  addProduct(
    email,
    itemName,
    itemDesc,
    itemPrice,
    itemQty,
    itemCategories,
    itemThumbnail
  ) {
    return axios.post(API_URL + "/sell", {
      email,
      itemName,
      itemDesc,
      itemPrice,
      itemQty,
      itemCategories,
      itemThumbnail,
    });
  }
  // 取得所有商品 => 顯示在 【http://localhost:3000/store】
  getAllProduct() {
    return axios.get(API_URL + "/allProducts");
  }
  // 取得類別商品 => 顯示在 【http://localhost:3000/store/categories/:類別】
  getCategoriesProduct(category) {
    return axios.get(API_URL + "/categories/" + category);
  }
  //   取得自己上架商品
  getSelledProduct(email) {
    return axios.get(API_URL + "/selled/" + email);
  }
}

export default new ProductService();
