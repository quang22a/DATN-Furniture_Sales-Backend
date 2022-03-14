import { envVariables } from "../configs";
const { subject, gmail, pass, url_fe } = envVariables;
const ALPHABET = "0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ";
import { passwordResetTemplate } from "../resources";
import nodemailer from "nodemailer";
//using sendgrid

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: gmail,
    pass: pass,
  },
});

// using nodemailer
export const sendEmail = async (code, email) => {
  await transporter.sendMail({
    from: gmail,
    to: email,
    subject,
    html: passwordResetTemplate(code),
  });
};
// generate code 6 char
export const generate = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return code;
};
