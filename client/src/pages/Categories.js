import React, { useContext, useEffect, useState } from "react";
import { MyGlobalData } from "../App";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductService from "../services/produce";
import ShopService from "../services/shop";

// styled component
const ImgThumbnail = styled.img`
  height: 300px;
  object-fit: cover;
`;

export default function Categories() {
  // useContext
  const { categoriesData, setCategoriesData } = useContext(MyGlobalData);
  const [newData, setNewData] = useState([]);
  // 要改成利用網址動態取得進入的網站
  // const currentPathname = window.location.pathname;
  // let categoriesData = currentPathname.split("/");
  // categoriesData = categoriesData[3];
  useEffect(() => {
    ProductService.getCategoriesProduct(categoriesData)
      .then((result) => {
        // console.log(result.data.productObj); // [{}]
        setNewData(result.data.productObj);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [categoriesData]);

  // 將該產品ID與購買者ID傳入，建立資料表
  const handleBuy = (item_id) => {
    ShopService.buyProduct(
      JSON.parse(localStorage.getItem("userInfo"))["userObj"]["_id"],
      item_id
    )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-md-3 col-sm-10">
          <div className="card">
            <div className="card-header fs-5">Categories</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Link className="nav-link text-dark px-0" to="/store">
                  ALL
                </Link>
              </li>
              <li className="list-group-item">
                <Link
                  className="nav-link text-dark px-0"
                  to="/store/categories/macaron"
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
                  to="/store/categories/chocolate"
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
                  to="/store/categories/cookie"
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
                  to="/store/categories/candy"
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
          <div className="row">
            {newData.length === 0 ? (
              <h2 className="text-danger">The categories not date</h2>
            ) : (
              newData.map((item) => (
                <div
                  className=" col-lg-4 col-md-6 col-sm-12  mb-4"
                  key={item._id}
                >
                  <div className="card">
                    <ImgThumbnail
                      src={item.itemThumbnail}
                      className="card-img-top"
                      alt="cookie"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.itemName}</h5>
                      <p className="card-text">{item.itemDesc}</p>
                      <p className="card-text">Price : {item.itemPrice}</p>
                    </div>
                    <Link
                      className="btn btn-outline-dark btn-sm m-1 "
                      onClick={() => {
                        handleBuy(item._id);
                      }}
                    >
                      {/* View more */}
                      Buy
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
