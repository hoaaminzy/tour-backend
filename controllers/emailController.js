const transporter = require("../config/transporter");

const emailLogin = (req, res) => {
  const { email, displayName } = req.body;

  const mailOptions = {
    from: "hoabon1305@gmail.com",
    to: email,
    subject: "Chào mừng đến với Travel",
    text: `Xin chào ${displayName}, chào mừng bạn đến với Travel!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email:", error);
      res.status(500).send("Gửi email thất bại");
    } else {
      console.log("Email gửi thành công:", info.response);
      res.status(200).send("Email đã được gửi");
    }
  });
};
const emailContact = (req, res) => {
  const { email, displayName } = req.body;

  const mailOptions = {
    from: "hoabon1305@gmail.com",
    to: email,
    subject: "Cảm ơn bạn đã liên hệ với chúng tôi",
    text: `Xin chào ${displayName}, cảm ơn bạn đã liên hệ với chúng tôi, chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.`,
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email:", error);
      res.status(500).send("Gửi email thất bại");
    } else {
      console.log("Email gửi thành công:", info.response);
      res.status(200).send("Email đã được gửi");
    }
  });
};
module.exports = {
  emailLogin,
  emailContact,
};
