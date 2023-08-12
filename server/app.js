// import express
const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config(); // 處理隱密資訊
const AuthRoute = require("./routes/auth"); // get the user routes
const ProductRoute = require("./routes/product"); // get the user routes
const BuyRoute = require("./routes/buy");
const ECPayRoute = require("./routes/ECPay");
const Product = require("./modules/product");

// const ProductRoute = require("./routes/product");

//* AWS S3
const {
  getUserPresignedUrls,
  uploadToS3,
  getSingleImageUrl,
} = require("./s3.js");
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

//* connect to mongodb
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connect to mongodb atlas.");
  })
  .catch((err) => {
    console.error(err);
  });

app.set("view engine", "ejs");
// middleware
// 1. 負責解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin:
    //   "https://037f-2401-e180-88b0-1015-71f8-bb7a-d626-2c35.ngrok-free.app",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
); // 要連接不同port

// 2. 檢測網址是否有 【/user】
app.use("/api/user", AuthRoute);
// 3. 檢測網址是否有 【/product】
app.use("/api/product", ProductRoute);
// 4. 檢測網址是否有 【/shop】
app.use("/api/shop", BuyRoute);
// 5. 檢測網址是否有 【/ECPayRoute】
app.use("/api/ecpay", ECPayRoute);

// app.post("/images", upload.array("image"), async (req, res) => {
app.post("/images", upload.array("image"), async (req, res) => {
  console.log("s3 post images");
  const { files } = req;
  const folderName = req.headers["x-user-id"];
  //* 假如沒有檔案或沒有 folderName 回傳錯誤訊息
  if (!files || !folderName)
    return res.status(400).json({ message: "Bad request" });
  let s3Key;
  const allFiles = [];
  for (const file of files) {
    // console.log("個別檢查");
    // console.log(file);
    const { error, key } = await uploadToS3({ file, folderName });
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    s3Key = key;
    allFiles.push({ S3Key: key, originalName: file["originalname"] });
  }
  //* get image from s3
  const { error, presignedUrls } = await getSingleImageUrl(s3Key); //* 若成功得到所有圖片網址
  if (error) return res.status(400).json({ message: error.message });
  // console.log("get image presignedUrls");
  // console.log(presignedUrls); //* get image url from s3
  return res.json(presignedUrls);
});

// create root
app.get("/", (req, res) => {
  res.send("WELCOME TO SERVER");
});

// listen on port 8000
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
