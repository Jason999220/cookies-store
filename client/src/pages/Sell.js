import React, { useContext, useState } from "react";
import { MyGlobalData } from "../App";
import { useNavigate } from "react-router-dom";

import ProductService from "../services/produce";
import axiosClient from "../services/s3";

export default function Sell() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemCategories, setItemCategories] = useState("");
  const [itemThumbnail, setitemThumbnail] = useState({});
  const { userObj } = JSON.parse(localStorage.getItem("userInfo"));
  //* useContext
  const { setErrorMessage } = useContext(MyGlobalData);

  //* 將資料存進資料庫和AWS S3
  const handleSell = async () => {
    const method = "post";
    const url = "/images";
    const form = new FormData();
    for (let i = 0; i < itemThumbnail.length; i++) {
      form.append("image", itemThumbnail[i]);
    }

    //* get the thumbnail url from s3
    const imageUrl = await axiosClient({
      url,
      method,
      data: form,
      headers: {
        "x-user-id": `disert/${itemCategories}`,
      },
    })
      .then((presignedUrls) => {
        //* console.log(presignedUrls);
        return presignedUrls;
      })
      .catch((err) => {
        console.error(err);
      });

    //** create a new product
    ProductService.addProduct(
      userObj.email,
      itemName,
      itemDesc,
      itemPrice,
      itemQty,
      itemCategories,
      imageUrl
    )
      .then(() => {
        //* 轉址
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.response.data);
        //* 若登入失敗取得錯誤訊息
        setErrorMessage(err.response.data);
      });
  };
  return (
    <div>
      商品名稱 :
      <input
        type="text"
        name="itemName"
        style={{ border: "1px solid red" }}
        onChange={(event) => {
          setItemName(event.target.value);
        }}
      />
      商品描述 :
      <input
        type="textarea"
        name="itemDesc"
        style={{ border: "1px solid red" }}
        onChange={(event) => {
          setItemDesc(event.target.value);
        }}
      />
      商品金額 :
      <input
        type="number"
        name="itemPrice"
        style={{ border: "1px solid red" }}
        onChange={(event) => {
          setItemPrice(event.target.value);
        }}
      />
      商品數量 :
      <input
        type="number"
        name="itemQty"
        style={{ border: "1px solid red" }}
        onChange={(event) => {
          setItemQty(event.target.value);
        }}
      />
      商品種類 :
      <input
        type="string"
        name="itemCategories"
        style={{ border: "1px solid red" }}
        onChange={(event) => {
          setItemCategories(event.target.value);
        }}
      />
      商品縮圖 :
      <input
        type="file"
        name="itemImage"
        onChange={(event) => {
          setitemThumbnail(event.target.files);
        }}
      />
      <button onClick={handleSell}> Add product</button>
    </div>
  );
}
