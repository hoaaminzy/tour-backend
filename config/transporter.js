const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_TRANSPORTER,
    pass: process.env.PASSWORD_TRANSPORTER,
  },
});

module.exports = transporter;
