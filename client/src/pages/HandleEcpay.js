import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

//* 接收ECPay 回傳的HTML原始碼，並利用【dangerouslySetInnerHTML】渲染
export default function HandleEcpay() {
  const location = useLocation();
  console.log(location["state"]["html"]);
  useEffect(() => {
    document.getElementById("_form_aiochk").submit();
  }, []);
  return (
    <div dangerouslySetInnerHTML={{ __html: location["state"]["html"] }} />
  );
}
