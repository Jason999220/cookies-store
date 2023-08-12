// import { faPen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { MyGlobalData } from "../App";
import EcpayService from "../services/ecpay";

const ProfileDiv = styled.div`
  width: 60%;
  min-height: 80vh;
  margin: 0 auto;
  border: 1px solid #000;
`;
const ProfileNav = styled.div`
  width: 60%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
`;
const ProfileRoute = styled.div`
  text-align: center;
  font-size: 2rem;
  margin-right: 1rem;
  border-radius: 5px 5px 0px 0px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
`;

const ProfileInfo = styled.div`
  padding: 0.5rem;
  text-align: left;
  font-size: 2rem;
  margin-bottom: 1rem;
`;
const ProfileInfoTitle = styled.span`
  text-align: left;
  font-size: 2rem;
`;
const ProfileInfoInput = styled.input`
  height: 3rem;
  width: 50%;
  border: 1px solid #444;
  font-size: 2rem;
  margin-right: 1rem;
`;

export default function Profile() {
  // EcpayService.getEcpayResult().then((result) => {
  //   console.log(result);
  // });
  const navigate = useNavigate();
  // get useContext data
  const {
    setUpdateEmail,
    setUpdateUserName,
    setUpdatePassword,
    updateEmail,
    updateUserName,
    updatePassword,
  } = useContext(MyGlobalData);
  const { userObj } = JSON.parse(localStorage.getItem("userInfo"));
  const handleUpdateEmail = (event) => {
    setUpdateEmail(event.target.value);
  };
  const handleUpdateUserName = (event) => {
    setUpdateUserName(event.target.value);
  };
  const handleUpdatePassword = (event) => {
    setUpdatePassword(event.target.value);
  };
  const handleUpdateEmailBtn = () => {
    console.log(updateEmail);
  };
  const handleUpdateUserNameBtn = () => {
    console.log(updateUserName);
  };
  const handleUpdatePasswordBtn = () => {
    console.log(updatePassword);
  };

  return (
    <>
      <ProfileNav>
        <ProfileRoute>Profile</ProfileRoute>
        <ProfileRoute
          onClick={() => {
            navigate("/selled");
          }}
        >
          已上架
        </ProfileRoute>
        <ProfileRoute
          onClick={() => {
            navigate("/buyed");
          }}
        >
          已購買
        </ProfileRoute>
      </ProfileNav>
      <ProfileDiv>
        <img
          alt="head"
          src="https://media.istockphoto.com/id/1142192548/vector/man-avatar-profile-male-face-silhouette-or-icon-isolated-on-white-background-vector.jpg?s=1024x1024&w=is&k=20&c=ISYAkNv_k8SCN_pHkYWqlWdGSbirhx_yCigo7QC8NAw="
          width={"100px"}
          height={"100px"}
        />
        <ProfileInfo>
          <ProfileInfoTitle>Email : </ProfileInfoTitle>
          <ProfileInfoInput
            defaultValue={userObj.email}
            onChange={handleUpdateEmail}
          ></ProfileInfoInput>
          {/* <FontAwesomeIcon
            icon={faPen}
            size="lg"
            onClick={handleUpdateEmailBtn}
          /> */}
        </ProfileInfo>
        <ProfileInfo>
          <ProfileInfoTitle>UserName : </ProfileInfoTitle>
          <ProfileInfoInput
            defaultValue={userObj.username}
            onChange={handleUpdateUserName}
          ></ProfileInfoInput>
          {/* <FontAwesomeIcon
            icon={faPen}
            size="lg"
            onClick={handleUpdateUserNameBtn}
          /> */}
        </ProfileInfo>
        <ProfileInfo>
          <ProfileInfoTitle>Password : </ProfileInfoTitle>
          <ProfileInfoInput
            onChange={handleUpdatePassword}
            defaultValue={"*****"}
          ></ProfileInfoInput>
          {/* <FontAwesomeIcon
            icon={faPen}
            size="lg"
            onClick={handleUpdatePasswordBtn}
          /> */}
        </ProfileInfo>
      </ProfileDiv>
    </>
  );
}
