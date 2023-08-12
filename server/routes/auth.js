const router = require("express").Router(); // 連接 router
const User = require("../modules/user");

// middleware
// 確認已經進入 Server auth
router.use((req, res, next) => {
  console.log("Server auth routes 認證處理中");
  next();
});

// Register POST ，從前端【./register】獲取資料
router.post("/register", async (req, res) => {
  console.log("進入 Server routes auth register ");
  // 1. 得到使用者輸入資料
  const { email, username, password } = req.body;
  // 2. 進資料庫匹配email是否存在，要利用 await 等待搜尋
  const emailExist = await User.findOne({ email });
  // 3.1 假如存在，提示使用者
  if (emailExist) return res.status(400).send("Email already Registered...");
  // 3.2 假如不存在，先進行資料驗證再儲存進資料庫 => 先直接寫進資料庫
  // 4. new User object
  const newUser = new User({
    email,
    username,
    password,
  });
  // 5. new user save to DB
  try {
    console.log("準備將帳號儲存置資料庫");
    const saveUser = await newUser.save();
    // 5.1 發送成功狀態給前端
    res.status(200).send({
      status: "successfully",
      message: "User saved successfully",
      userObj: saveUser,
    });
  } catch (err) {
    console.error(err.errors);
    // 5.2 發送錯誤狀態給前端
    res.status(400).send({ status: "failure", message: err.errors });
  }
});

// Login POST ，從前端【./login】 獲取資料
router.post("/login", async (req, res) => {
  console.log("進入 Server routes auth login ");
  // 1. 得到使用者輸入資料
  const { email, password } = req.body;
  // 2. 進資料庫匹配email是否存在，要利用 await 等待搜尋
  const emailExist = await User.findOne({ email });
  // 3.1 假如不存在，提示使用者
  if (!emailExist) return res.status(400).send(`${email} 尚未註冊`);
  // 3.2 假如存在，進行密碼匹配
  console.log("帳號存在正在進行密碼匹配");
  const isMatch = await emailExist.comparePassword(password);
  isMatch
    ? res.status(200).send({
        status: "successfully",
        message: "Congratulations ! You login successfully.",
        userObj: emailExist,
      })
    : res.status(200).send({
        status: "failure",
        message: "Account or password incorrect.",
        userObj: null,
      });
});

module.exports = router;
