const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hoabon1305@gmail.com",
    pass: "nnyf kjcg pwxb tvav",
  },
});

module.exports = transporter;
