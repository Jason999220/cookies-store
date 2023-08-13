import React, { useEffect, useState } from "react";
import ProductService from "../services/produce";
import Product from "../components/store/Product";
import Categories from "../components/store/Categories";

export default function Store() {
  const [productArr, setProductArr] = useState([]);

  //* 利用useEffect在畫面掛載時取得資料
  useEffect(() => {
    ProductService.getAllProduct()
      .then((result) => {
        console.log(result);
        setProductArr(result.data.productObj);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-md-3 col-sm-10">
        <Categories />
      </div>
      <div className="col-md-9 col-sm-12">
        <Product productArr={productArr} />
      </div>
    </div>
  );
}
