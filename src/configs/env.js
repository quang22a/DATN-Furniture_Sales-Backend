require("dotenv").config();

export const envVariables = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.DB_URI || "mongodb://127.0.0.1:27017/furniture",
  jwtSecret: process.env.JWT_SECRET || "123QWE!@#",
  nodeEnv: process.env.NODE_ENV || "development",
  subject: process.env.SUBJECT || "CODE RESET PASSWORD",
  cloud_name: process.env.CLOUD_NAME || "do-an-tn",
  api_key: process.env.API_KEY_CLOUD || "484176915684615",
  api_secret: process.env.API_SECRET_CLOUD || "hpWWOxyc-cm_Egs5bqRF4UzPJf8",
  key_admin: "123QWE!@#",
  url_fe: "https://localhost:7000/",
  gmail: "poppy99.dev@gmail.com",
  pass: "namvippro23799@",
};
