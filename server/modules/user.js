const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// 1. create a Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 100,
  },
  username: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 31,
  },
  // 測試用
  password: {
    type: String,
    require: true,
    minLength: 4,
    maxLength: 15,
  },
  confirmpassword: {
    type: String,
    require: true,
    minLength: 4,
    maxLength: 15,
  },
  // 必須用 hash password
  hashPassword: {
    type: String,
    require: true,
    minLength: 4,
    maxLength: 1024, // password 經過 hash，導致密碼變長
  },
  date: {
    type: Date,
    default: Date.now, // 在 mongoose 不需要加括號，在JS需要 Date.now()
  },
});

// 2. 用於註冊或修改密碼
// 假如是新使用者或修改密碼才會進來這處理
userSchema.pre("save", async function (next) {
  try {
    console.log("已進入user module 進行 hashPassword 預處理");
    // is user is new or password changed
    if (this.isNew || this.isModified("password")) {
      // use bcrypt
      const salt = await bcrypt.genSalt(10); // 產生 salt，Promiss 需要用 await
      const hashPassword = await bcrypt.hash(this.password, salt); // 產生 hash password，Promiss 需要用 await
      // change this hash password
      this.hashPassword = hashPassword;
    }
    next();
  } catch (err) {
    console.log("pre 捕捉到錯誤");
    console.error(err);
  }
});
//
// 3. 用於登入，password compare ，傳入的參數為使用者【當前輸入的密碼】
userSchema.methods.comparePassword = async function (password) {
  console.log("已進入user module 進行 password compare ");
  // 利用使用者【當前輸入的密碼】與【先前已雜湊過的密碼】進行匹配
  // bcrypt.compare(當前輸入的密碼, 先前已雜湊過的密碼, callback);
  try {
    return await bcrypt.compare(password, this.hashPassword);
  } catch (err) {
    console.error(err);
  }
};

// 4. 匯出模組
// module.exports = mongoose.model('DB的資料表',schame);
module.exports = mongoose.model("User", userSchema);
