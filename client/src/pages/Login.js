import React, { useContext } from "react";
import { MyGlobalData } from "../App";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth";

// styled components
const LoginComponent = styled.div`
  width: 100%;
  height: 75vh;
  background: #777;
  position: relative;
`;
const ImgThumbnail = styled.img`
  position: absolute;
  width: 50%;
  height: 100%;
  object-fit: cover;
`;
const LoginThumbnail = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
`;
const LoginBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: #222;
  border: 8px;
  overflow: hidden; /* 讓超出的 animate 的 background 隱藏*/
`;
const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 10px;
`;
const OtherLogin = styled.div`
  width: 100%;
  height: 150px;
  buttons: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const LoginBtn = styled.button`
  outline: none;
  padding: 9px 25px;
  background: #000;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  &:hover {
    background: #fff;
    color: #000;
  }
`;

export default function Login() {
  const navigate = useNavigate();

  // useContext
  const {
    email,
    userName,
    password,
    isRegister,
    setIsRegister,
    setEmail,
    setUserName,
    setPassword,
    errorMessage,
    setErrorMessage,
  } = useContext(MyGlobalData);

  // handle functions
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleRegister = () => {
    console.log("進入 Client handleRegister");
    AuthService.localRegister(email, userName, password)
      .then((result) => {
        console.log("完成 Client handleRegister");
        console.log(result.data);
        setIsRegister(false);
        // 轉址
        navigate("/Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogin = () => {
    console.log("進入 Client handleLogin");
    AuthService.localLogin(email, password)
      .then((result) => {
        console.log(result);
        if (result.data.userObj === null) {
          // 若登入失敗取得錯誤訊息
          setErrorMessage(result.data.message);
        } else {
          // 若登入成功清空錯誤訊息
          setErrorMessage(null);
          // 儲存至 session
          localStorage.setItem("userInfo", JSON.stringify(result.data));
          // 轉址
          navigate("/store");
        }
      })
      .catch((err) => {
        // 若登入失敗取得錯誤訊息
        err.response.data
          ? setErrorMessage(err.response.data)
          : setErrorMessage(err.message);
      });
  };
  return (
    <LoginComponent>
      {errorMessage ? errorMessage : null}
      <div className="row position-relative h-100">
        {isRegister ? (
          <>
            {/* Register */}
            <div className="col-md-6">
              <Form method="POST">
                <div className="inputBox">
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmail}
                    required
                  />
                  <span>Email</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input type="text" onChange={handleUserName} required />
                  <span>UserName</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input type="password" onChange={handlePassword} required />
                  <span>Password</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input type="password" required />
                  <span> Confirm Password</span>
                  <i></i>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-light btn-lg fw-bold w-50 m-4"
                  onClick={handleRegister}
                >
                  Submit
                </button>
              </Form>
            </div>
            <div className="col-md-6 h-100">
              <ImgThumbnail
                src="https://images.pexels.com/photos/3779937/pexels-photo-3779937.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="card-img-top"
                alt="cookie"
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6">
              <ImgThumbnail
                src="https://t3.ftcdn.net/jpg/05/71/68/14/360_F_571681415_fHcH3Z80wM9AkmqUoogGKev5p0BF3d8Y.jpg"
                className="card-img-top"
                alt="cookie"
              />
            </div>
            {/* Login */}
            <div className="col-md-6 h-100 position-relative">
              <LoginBox>
                <Form method="POST">
                  <h2>Sign in</h2>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={email}
                      onChange={handleEmail}
                      required
                    />
                    <span>Email</span>
                    <i></i>
                  </div>
                  <div className="inputBox">
                    <input type="password" onChange={handlePassword} required />
                    <span>Password</span>
                    <i></i>
                  </div>
                  <div className="links">
                    <Link to="/forgot" className="forgot">
                      Forgot Password
                    </Link>
                    <LoginBtn onClick={handleLogin}>Login</LoginBtn>
                  </div>
                </Form>
                <div className="or"></div>
                <OtherLogin>
                  <div className="facebook other-box ">
                    <LoginThumbnail
                      src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
                      alt=""
                    />
                    Login with facebook
                  </div>
                  <div className="google other-box">
                    <LoginThumbnail
                      src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                      alt=""
                    />
                    Login with google
                  </div>
                </OtherLogin>
              </LoginBox>
            </div>
          </>
        )}
      </div>
    </LoginComponent>
  );
}
