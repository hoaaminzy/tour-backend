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

const emailBooking = (req, res) => {
  const { email, displayName, title, contact, price, selected } = req.body;

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #4CAF50;">Cảm ơn bạn đã đặt tour du lịch tại chúng tôi!</h2>
    <p>Xin chào <strong>${displayName}</strong>,</p>
    <p>Chúng tôi rất vui mừng thông báo rằng bạn đã đặt thành công tour du lịch với thông tin chi tiết như sau:</p>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Tên tour</th>
        <td style="padding: 8px; border: 1px solid #ddd;">${title}</td>
      </tr>
     
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Giá tiền</th>
        <td style="padding: 8px; border: 1px solid #ddd;">${price.toLocaleString()} VNĐ</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Hình thức thanh toán</th>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          selected === "cash"
            ? "Tiền mặt"
            : selected === "bank"
            ? "Chuyển khoản"
            : "Ví Momo"
        }</td>
      </tr>
       <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Ghi chú</th>
        <td style="padding: 8px; border: 1px solid #ddd;">${contact}</td>
      </tr>
    </table>
    <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận thêm chi tiết.</p>
    <p>Trân trọng,</p>
    <p><strong>Đội ngũ hỗ trợ của chúng tôi</strong></p>
  </div>
  `;

  const mailOptions = {
    from: "hoabon1305@gmail.com",
    to: email,
    subject: "Xác nhận đặt tour du lịch thành công",
    html: htmlContent,
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

const emailStatus = (req, res) => {
  const { email, displayName, newStatus, tour } = req.body;

  const mailOptions = {
    from: "hoabon1305@gmail.com",
    to: email,
    subject: "Đơn đặt tour của bạn đã được cập nhập !",
    text: `Xin chào ${displayName}, ${
      newStatus === "Đã hoàn thành tour"
        ? `Chúc mừng bạn đã hoàn thành ${tour}. Cảm ơn và hẹn gặp lại!.`
        : `tour ${tour} đã được ${newStatus}. Vui lòng kiểm tra lại!.`
    } `,
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
  emailBooking,
  emailStatus,
};
