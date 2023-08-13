import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { MyGlobalData } from "../../App";

//! 還可在優化
function Categories() {
  const { setCategoriesData } = useContext(MyGlobalData);

  return (
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
  );
}

export default Categories;
