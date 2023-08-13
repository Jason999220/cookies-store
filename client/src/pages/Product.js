import React from "react";
import { useParams, useLocation } from "react-router-dom";

function Product(props) {
  const { itemID } = useParams();
  const location = useLocation();
  const { state } = location;
  console.log(state["name"]);
  return (
    <div>
      <h1>Name：{state["itemName"]}</h1>
      <h1>price：{state["itemPrice"]}</h1>
      <h1>Descript：{state["itemDesc"]}</h1>
      <h1>Qurity：{state["itemQty"]}</h1>
      <h1>{state["email"]}</h1>
      <img src={state["thumbnail"]} alt="img" />
    </div>
  );
}

export default Product;
