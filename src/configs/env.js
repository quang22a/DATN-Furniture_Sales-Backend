require("dotenv").config();

export const envVariables = {
  port: process.env.PORT || 8000,
  mongoURI:
    process.env.DB_URI ||
    "mongodb+srv://admin:quang123@cluster0.1boie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  jwtSecret: process.env.JWT_SECRET || "123QWE!@#",
  nodeEnv: process.env.NODE_ENV || "development",
  subject: process.env.SUBJECT || "CODE RESET PASSWORD",
  cloud_name: process.env.CLOUD_NAME || "do-an-tn",
  api_key: process.env.API_KEY_CLOUD || "484176915684615",
  api_secret: process.env.API_SECRET_CLOUD || "hpWWOxyc-cm_Egs5bqRF4UzPJf8",
  key_admin: "123QWE!@#",
  url_fe: "https://localhost:7000/",
  gmail: "quangtran331199@gmail.com",
  pass: "Quangteo123",
};
