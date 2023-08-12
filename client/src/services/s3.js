import axios from "axios";

const baseURL = "http://localhost:8000";

//* 高重複性質可以這樣寫
const axiosClient = axios.create({
  baseURL, //! 會被添加在 url 前面
  headers: {
    "Content-Type": "multipart/form-data", //*  內容形式
  },
});

export default axiosClient;
