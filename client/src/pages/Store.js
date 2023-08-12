import React, { useContext, useEffect, useState } from "react";
import { MyGlobalData } from "../App";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductService from "../services/produce";

// styled component
const ImgThumbnail = styled.img`
  height: 300px;
  object-fit: cover;
`;
export default function Store() {
  // useContext
  const { setCategoriesData } = useContext(MyGlobalData);
  const [productArr, setProductArr] = useState([]);

  // 利用useEffect在畫面掛載時取得資料
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
    <>
      <div className="row">
        <div className="col-md-3 col-sm-10">
          <div className="card">
            <div className="card-header fs-5">Categories</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Link className="nav-link text-dark px-0" to="./">
                  ALL
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  className="nav-link text-dark px-0"
                  to="categories/macaron"
                  onClick={() => {
                    setCategoriesData("macaron");
                  }}
                >
                  Macaron
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  className="nav-link text-dark px-0"
                  to="categories/chocolate"
                  onClick={() => {
                    setCategoriesData("chocolate");
                  }}
                >
                  Chocolate
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  className="nav-link text-dark px-0"
                  to="categories/cookie"
                  onClick={() => {
                    setCategoriesData("cookie");
                  }}
                >
                  Cookie
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  className="nav-link text-dark px-0"
                  to="categories/candy"
                  onClick={() => {
                    setCategoriesData("candy");
                  }}
                >
                  Candy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" col-md-9 col-sm-12">
          <div className="row ">
            {productArr.map((product) => (
              <div
                className=" col-lg-4 col-md-6 col-sm-12  mb-4"
                key={product._id}
              >
                <div className="card">
                  <ImgThumbnail
                    src={product.itemThumbnail}
                    className="card-img-top"
                    alt="cookie"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.itemName}</h5>
                    <p className="card-text">{product.itemDesc}</p>
                  </div>
                  <Link
                    className="btn btn-outline-dark btn-sm m-1 "
                    to={product.itemCategoriesPath}
                  >
                    ViewMore
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
