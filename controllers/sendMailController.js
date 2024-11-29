// // create user
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'hoa_2051220041@dau.edu.vn',
//     pass: 'bon13052002', // Mật khẩu ứng dụng hoặc OAuth2
//   },
// });
// const sendEmail = async (req, res) => {
//   const { email, displayName } = req.body;

//   // Tạo nội dung email
//   const mailOptions = {
//     from: "hoa_2051220041@dau.edu.vn",
//     to: email,
//     subject: "Chào mừng đến với ứng dụng của chúng tôi",
//     text: `Xin chào ${displayName}, cảm ơn bạn đã đăng nhập!`,
//   };

//   // Gửi email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Lỗi khi gửi email:", error);
//       res.status(500).send("Gửi email thất bại");
//     } else {
//       console.log("Email gửi thành công:", info.response);
//       res.status(200).send("Email đã được gửi");
//     }
//   });
// };

// module.exports = {
//   sendEmail,
// };
