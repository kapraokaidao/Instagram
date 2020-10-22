export default () => ({
  mode: process.env.MODE,
  port: parseInt(process.env.PORT, 10) || 3000,
  dynamoDB: {
    region: process.env.REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  s3: {
    region: process.env.REGION,
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
