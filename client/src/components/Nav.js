import React, { useContext } from "react";
import { MyGlobalData } from "../App";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // icon
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; // icon
import AuthService from "../services/auth";

export default function Nav() {
  // useContext
  const { setIsRegister } = useContext(MyGlobalData);
  const handleLogout = () => {
    // 進到AuthService處理logout
    AuthService.logout();
    // 設為login page 並跳轉
    setIsRegister(false);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex justify-content-between w-100">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/store">
                    Store
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">
                    XXX
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                {/* 購物車圖標 */}
                <li className="nav-item">
                  {/* <Link className="nav-link text-white" to="/shop">
                    <FontAwesomeIcon icon={faCartShopping} size="lg" />
                  </Link> */}
                </li>
                {/* 檢查當前session是否有資料 */}
                {localStorage.getItem("userInfo") ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/sell">
                        上架商品
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-white"
                        onClick={handleLogout}
                        to="/login"
                      >
                        logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-white"
                        to="/login"
                        onClick={() => {
                          setIsRegister(false);
                        }}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-white"
                        to="/register"
                        onClick={() => {
                          setIsRegister(true);
                        }}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
