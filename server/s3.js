const {
  GetObjectCommand,
  ListObjectsV2Command,
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

//*   get all image key from s3
const getImageKeysByUser = async (folderName) => {
  // console.log("S3 getImageKeysByUser start");
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: folderName, //* headers
    // MaxKeys: 2, //* limit number,
    key: "view/122a8f16-ed22-4b7f-b801-6cef11b92d3e",
  });

  // console.log("S3 getImageKeysByUser");
  // console.log(command); //* 取得該標頭的資訊
  const { Contents = [] } = await s3.send(command); //* 預設 Contents 為空陣列
  // console.log("S3 getImageKeysByUser Contents");
  // console.log(Contents); //* 依照標頭取得 S3 內檔案的所有資訊
  // console.log("S3 getImageKeysByUser done");
  //   利用 Sort 讓資料排序，最新的排TOP
  return Contents.sort(
    (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
  ).map((image) => image.Key);
};

//* get all image URL from  getImageKeysByUser
const getUserPresignedUrls = async (folderName) => {
  // console.log("S3 getUserPresignedUrls start");
  try {
    const imageKeys = await getImageKeysByUser(folderName); //* get all S3 file name
    // console.log("getUserPresignedUrls");
    // console.log(imageKeys);
    const presignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
        });
        return getSignedUrl(s3, command, { expiresIn: 900 }); // default
      })
    );
    // console.log("S3 getUserPresignedUrls presignedUrls");
    // console.log(presignedUrls); //* 取得所有圖片網址 ，陣列形式
    // console.log("S3 getUserPresignedUrls done");
    // console.log(presignedUrls);
    return { presignedUrls };
  } catch (error) {
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
        return getSignedUrl(s3, command, { expiresIn: 900 }); // default
      })
    );
    // console.log(presignedUrls); //* 以陣列形式傳給前端
    // console.log("getSingleObjectByKey done");
    return { presignedUrls };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

module.exports = { uploadToS3, getUserPresignedUrls, getSingleImageUrl };

//* Line 31 , new PutObjectCommand
// PutObjectCommand {
//   middlewareStack: {
//     add: [Function: add],
//     addRelativeTo: [Function: addRelativeTo],
//     clone: [Function: clone],
//     use: [Function: use],
//     remove: [Function: remove],
//     removeByTag: [Function: removeByTag],
//     concat: [Function: concat],
//     applyToStack: [Function: cloneTo],
//     identify: [Function: identify],
//     resolve: [Function: resolve]
//   },
//   input: {
//     Bucket: 'react-node-s3-upload-image-test',
//     Key: '123/dfa8f3a5-7f6f-4b99-9dfc-cb5045781d0e',
//     Body: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 43 00 03 02 02 02 02 02 03 02 02 02 03 03 03 03 04 06 04 04 04 04 04 08 06 06 05 ... 169794 more bytes>,
//     ContentType: 'image/jpeg'
//   }
// }

//* Line 31 , PutObjectCommand s3.send(command)
// {
//   '$metadata': {
//     httpStatusCode: 200,
//     requestId: 'VMSW1SWR0J1YBDEP',
//     extendedRequestId: 'NZyhuf7xJgV9oIFKBXeLMdl89dNT+mBtos88p5ej+t92cE2THul5caWspnhv3RSCs2+haV+yQzQ=',
//     cfId: undefined,
//     attempts: 1,
//     totalRetryDelay: 0
//   },
//   ETag: '"e2b31cd7bd37fcc075f0766d1b950d77"',
//   ServerSideEncryption: 'AES256'
// }

//*  Line 55
// ListObjectsV2Command {
//   middlewareStack: {
//     add: [Function: add],
//     addRelativeTo: [Function: addRelativeTo],
//     clone: [Function: clone],
//     use: [Function: use],
//     remove: [Function: remove],
//     removeByTag: [Function: removeByTag],
//     concat: [Function: concat],
//     applyToStack: [Function: cloneTo],
//     identify: [Function: identify],
//     resolve: [Function: resolve]
//   },
//   input: { Bucket: 'react-node-s3-upload-image-test', Prefix: '123' }
// }

//* Line 58
// [
//   {
//     Key: '123/01867c59-3851-4291-b9f7-a1d3fe92a78c',
//     LastModified: 2023-08-05T03:32:24.000Z,
//     ETag: '"64457f0af493fc3f4738a3b86daa4f29"',
//     Size: 752676,
//     StorageClass: 'STANDARD'
//   },
//   {
//     Key: '123/2fc67c7e-f1f5-45a7-bb3b-9a728045c0dd',
//     LastModified: 2023-08-03T08:33:10.000Z,
//     ETag: '"40971b9ca9ebfc6fe76be5d13681d63c"',
//     Size: 15334,
//     StorageClass: 'STANDARD'
//   }
// ]

//* Line 74 , getImageKeysByUser(folderName)
// [
//   '123/2fc67c7e-f1f5-45a7-bb3b-9a728045c0dd',
//   '123/c8c5e15c-f041-4bcd-b78d-7f6ecb0aa7af'
// ]

//* Line 85 , presignedUrls
// [
//   'https://react-node-s3-upload-image-test.s3.us-east-1.amazonaws.com/123/49815413-e456-4926-932c-8c7c17f385f5?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA33LOETS5AI3NOIOV%2F20230805%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230805T055642Z&X-Amz-Expires=900&X-Amz-Signature=03ee9187f9b9438996c59c9b1b060295a67ddd6004dc3170164c1444c7bdc5fa&X-Amz-SignedHeaders=host&x-id=GetObject',
//   'https://react-node-s3-upload-image-test.s3.us-east-1.amazonaws.com/123/01867c59-3851-4291-b9f7-a1d3fe92a78c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA33LOETS5AI3NOIOV%2F20230805%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230805T055642Z&X-Amz-Expires=900&X-Amz-Signature=b16e16120ff6617c8c2b245e493f48f761abb113d594e76bb0c37fa6ec698d81&X-Amz-SignedHeaders=host&x-id=GetObject',
// ]
