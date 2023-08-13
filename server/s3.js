const {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuid } = require("uuid");
// create a s3 information
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  signatureVersion: "v4",
});

// 將圖片存入S3
const uploadToS3 = async ({ file, folderName }) => {
  console.log("server s3 upload start");
  const key = `${folderName}/${uuid()}`; //* 回傳給DB
  //* new 一個物件儲存至S3
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key, //* 'view/7696f545-6152-4c67-8940-6a0e32168238'
    Body: file.buffer,
    ContentType: file.mimetype, //* 'image/jpeg'
  });
  try {
    const response = await s3.send(command);
    console.log("s3 response done");
    return { key };
  } catch (error) {
    // console.log("error");
    console.error(error);
    return { error };
  }
};

//* get one image URL from s3
const getSingleImageUrl = async (key) => {
  console.log("S3 getSingleObjectByKey start");
  let arr = [`${key}`];
  try {
    const presignedUrls = await Promise.all(
      arr.map((key) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
        });
        // console.log(command);
        return getSignedUrl(s3, command); // default
      })
    );
    // console.log(presignedUrls); //* 以陣列形式傳給前端
    return { presignedUrls };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

module.exports = { uploadToS3, getSingleImageUrl };
