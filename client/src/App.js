import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Sell from "./pages/Sell";
import Selled from "./pages/Selled";
import Buyed from "./pages/Buyed";
import HandleEcpay from "./pages/HandleEcpay";

export const MyGlobalData = React.createContext({});

function App() {
  const [categoriesData, setCategoriesData] = useState(""); // 從Store取得，傳給Categories and App
  const [isRegister, setIsRegister] = useState(true); // 由nav判斷是否點擊Login/Register ，傳給Login更改特效
  const [email, setEmail] = useState(""); // 取得Login Register 的資料
  const [userName, setUserName] = useState(""); // 取得Login Register 的資料
  const [password, setPassword] = useState(""); // 取得Login Register 的資料
  const [errorMessage, setErrorMessage] = useState(""); // 取得錯誤訊息
  const [updateEmail, setUpdateEmail] = useState(""); // 取得profile更新的資料
  const [updateUserName, setUpdateUserName] = useState(""); // 取得profile更新的資料
  const [updatePassword, setUpdatePassword] = useState(""); // 取得profile更新的資料

  return (
    <>
      <MyGlobalData.Provider
        value={{
          categoriesData,
          setCategoriesData,
          isRegister,
          setIsRegister,
          email,
          userName,
          password,
          setEmail,
          setUserName,
          setPassword,
          errorMessage,
          setErrorMessage,
          setUpdateEmail,
          setUpdateUserName,
          setUpdatePassword,
          updateEmail,
          updateUserName,
          updatePassword,
        }}
      >
        <Nav />
        <div className="container-md m-5 ">
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route
              path={`/store/categories/${categoriesData}`}
              // path={`/store/categories/candy`}
              element={<Categories />}
            />
            {/* 購物車 */}
            <Route path={"/shop"} element={<Shop />} />
            <Route path={"/store"} element={<Store />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Login />} />
            <Route path={"/profile"} element={<Profile />} />
            {/* 上架畫面 */}
            <Route path={"/sell"} element={<Sell />} />
            {/* 查看我已上架的畫面 */}
            <Route path={"/selled"} element={<Selled />} />
            {/* 查看我已購買的畫面 */}
            <Route path={"/buyed"} element={<Buyed />} />
            {/*  */}
            {/* <Route path={"/selled"} element={<Sell />} /> */}
            {/* 解析綠界回傳的原始碼 */}
            <Route path={"/HandleEcpay"} element={<HandleEcpay />} />
          </Routes>
        </div>
      </MyGlobalData.Provider>
    </>
  );
}

export default App;
