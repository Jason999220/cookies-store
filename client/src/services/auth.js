// 將前端路由與後端路由搭配
// 利用 axios 進行前後端資料交互
import axios from "axios";
// 取得後端路由
const server_API = "http://localhost:8000/api/user";

class AuthService {
  // handle local register
  localRegister(email, userName, password) {
    console.log("進入 Client AuthService register");
    // 將資料用【post】的方式傳遞給後端的【/api/user/register】
    return axios.post(`${server_API}/register`, {
      email,
      userName,
      password,
    });
  }
  // handle local login
  localLogin(email, password) {
    console.log("進入 Client AuthService login");
    // 將資料用【post】的方式傳遞給後端的【/api/user/login】
    return axios.post(`${server_API}/login`, {
      email,
      password,
    });
  }

  // handle local logout
  logout() {
    // 移除 session
    localStorage.removeItem("userInfo");
  }
}

export default new AuthService();
