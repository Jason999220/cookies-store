import React, { useEffect, useState } from "react";
import ProductService from "../services/produce";
import { Col, Row } from "antd";

function Selled() {
  const [productArr, setProductArr] = useState([]);
  const [status, setStatus] = useState("");
  const { userObj } = JSON.parse(localStorage.getItem("userInfo"));

  // 利用useEffect在畫面掛載時取得資料
  useEffect(() => {
    ProductService.getSelledProduct(userObj.email)
      .then((result) => {
        if (result.data.foundStatus) {
          setProductArr(result.data.productObj);
        } else {
          setStatus(result.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      {/* 假如沒有上架的話會顯示提示語 */}
      {status && <h1>{status}</h1>}
      {/* 假如有上架的話會顯示上架商品資訊 */}
      {/* {productArr.length > 0 && (
        <div className="d-flex">
          {productArr.map((product) => (
            <div className=" m-5 border border-3 border-warning p-4">
              <h1>{product.itemName}</h1>
              <p>商品照片 : </p>
              <img src={product.itemThumbnail} alt="img" />
              <p>商品描述 : {product.itemDesc}</p>
              <p>商品金額 : {product.itemPrice}</p>
              <p>商品數量 : {product.itemQty}</p>
            </div>
          ))}
        </div>
      )} */}

      {productArr.length > 0 && (
        <Row justify="start">
          {productArr.map((product) => (
            <Col
              className="mb-5"
              xs={{
                span: 20,
                offset: 2,
              }}
              sm={{
                span: 10,
                offset: 2,
              }}
              lg={{
                span: 6,
                offset: 2,
              }}
            >
              <h1>{product.itemName}</h1>
              <p>商品照片 : </p>
              <img src={product.itemThumbnail} alt="img" />
              <p>商品描述 : {product.itemDesc}</p>
              <p>商品金額 : {product.itemPrice}</p>
              <p>商品數量 : {product.itemQty}</p>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default Selled;
