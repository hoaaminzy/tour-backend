const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;
// const authRoute = require("./routes/authRoute");
// const uploadRoute = require("./routes/uploadRoute");
const tourRoute = require("./routes/tourRoute");
const inforTourRoute = require("./routes/inforTourRoute");
const inforTourNoteRoute = require("./routes/inforTourNoteRoute");
const bookingRoute = require("./routes/bookingRoute");
const authRoute = require("./routes/authRoute");
const reviewRoute = require("./routes/reviewRoute");
const replyRoute = require("./routes/replyRoute");
const favoriteTourRoutes = require("./routes/favoriteTourRoutes");
const contactRoute = require("./routes/contactRoute");
const emailRoute = require("./routes/emailRoute");
const blogRoute = require("./routes/blogRoute");
const assignStaffRoute = require("./routes/staffAssignmentRoute");
const tourBigRoute = require("./routes/tourBigRoute");
const crypto = require("crypto");
const axios = require("axios");
const multer = require("multer");
const dbConnect = require("./config/dbConnect");
dbConnect();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bookingModel = require("./models/bookingModel");
const path = require("path");

app.use(express.json({ limit: "50mb" })); // Phân tích JSON
app.use(express.urlencoded({ limit: "50mb", extended: false })); // Phân tích URL-encoded

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

const config = {
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  orderInfo: "Thanh toán tour với MoMo",
  partnerCode: "MOMO",
  redirectUrl: "http://localhost:3000/",
  ipnUrl:
    "https://1b9b-2402-800-629c-95f3-e0cf-d597-e064-3a9f.ngrok-free.app/callback",
  requestType: "captureWallet",
  extraData: "",
  orderGroupId: "",
  autoCapture: true,
  lang: "vi",
};
app.post("/payment", async (req, res) => {
  const { totalPrice, userId, user, inforTour, bookingId } = req.body;
  let {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    orderGroupId,
    autoCapture,
    lang,
  } = config;

  // Validate the input and generate order information
  const amount = totalPrice;
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;

  extraData = Buffer.from(JSON.stringify({ userId, name: user.name })).toString(
    "base64"
  );

  // Generate the raw signature
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    const data = result.data;

    console.log("Momo API response:", data); // Log the Momo API response

    if (data.payUrl) {
      // Tìm booking theo bookingId
      const booking = await bookingModel.findOne({ bookingId });
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Cập nhật trường payment trong booking
      booking.status = "Đã thanh toán";
      booking.payment = {
        pay: data, // Lưu phản hồi từ API Momo
        userId,
        user,
        orderId,
        inforTour,
        totalPrice,
        status: "Chờ thanh toán", // Trạng thái ban đầu là chờ thanh toán
      };

      // Lưu cập nhật vào cơ sở dữ liệu
      await booking.save();

      return res.status(200).json(data);
    } else {
      console.error("Failed to generate MoMo payment URL:", data);
      return res
        .status(500)
        .json({ message: "Failed to generate MoMo payment URL", data });
    }
  } catch (error) {
    if (error.response) {
      console.error("Momo API returned an error:", error.response.data);
      return res
        .status(500)
        .json({ message: "Momo API error", error: error.response.data });
    } else if (error.request) {
      console.error("No response from Momo API:", error.request);
      return res
        .status(500)
        .json({ message: "No response from Momo API", error: error.request });
    } else {
      console.error("Unexpected error:", error.message);
      return res.status(500).json({
        message: "Unexpected error",
        error: error.message,
      });
    }
  }
});

app.post("/callback", async (req, res) => {
  const { resultCode, orderId, data } = req.body;
  console.log("KQ", resultCode, orderId, data);
  try {
    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    // Tìm booking theo orderId
    const booking = await bookingModel.findOne({
      "payment.orderId": payment[0].pay.orderId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (resultCode === 0) {
      booking.payment = {
        pay: data, // Dữ liệu trả về từ API MoMo hoặc dữ liệu bạn lưu trước đó
        userId: booking.userId,
        user: {
          name: booking.fullName,
          address: booking.address,
          numberphone: booking.phone,
          email: booking.email,
        },
        inforTour: booking.tourId,
        orderId: orderId,
        totalPrice: booking.totalPrice,
        status: "Thanh toán thành công",
      };

      await booking.save();
      console.log("Cập nhật thông tin thanh toán thành công!");
      return res.status(200).json({ message: "Thanh toán thành công" });
    } else {
      // Cập nhật trạng thái thanh toán thất bại
      booking.payment.status = "Thanh toán thất bại hoặc bị hủy";
      await booking.save();
      console.log("Thanh toán thất bại hoặc bị hủy");
      return res
        .status(400)
        .json({ message: "Thanh toán thất bại hoặc bị hủy" });
    }
  } catch (error) {
    console.error("Error processing callback:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/check-status-transaction", async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ message: "orderId is required" });
  }

  const secretKey = config.secretKey;
  const accessKey = config.accessKey;
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId: orderId,
    signature,
    lang: "vi",
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error("Error checking transaction status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/allPayments", async (req, res) => {
  try {
    const payments = await bookingModel.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
app.post("/api/retry-payment", async (req, res) => {
  const { orderId } = req.body; // Expecting orderId to retry payment

  // Find the order by orderId instead of _id
  const order = await bookingModel.findOne({ orderId }); // Adjusted here

  if (!order || order.status !== "Chờ thanh toán") {
    return res
      .status(400)
      .json({ message: "Đơn hàng không hợp lệ hoặc đã thanh toán" });
  }

  const { user, totalPrice, userId } = order;
  let {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    orderGroupId,
    autoCapture,
    lang,
  } = config;

  // Create a new orderId
  const newOrderId = partnerCode + new Date().getTime();
  const requestId = newOrderId;

  // Encode extra data
  extraData = Buffer.from(JSON.stringify({ userId, name: user.name })).toString(
    "base64"
  );

  // Generate the raw signature
  const rawSignature = `accessKey=${accessKey}&amount=${totalPrice}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount: totalPrice,
    orderId: newOrderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    const data = result.data;

    if (data.payUrl) {
      const updatedOrder = await bookingModel.findOneAndUpdate(
        { orderId: orderId }, // Adjusted here to find by orderId
        { orderId: newOrderId, pay: data }, // Save the new payment data
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Quét lại mã QR thành công", data: updatedOrder });
    } else {
      return res
        .status(500)
        .json({ message: "Không thể tạo URL thanh toán từ MoMo", data });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Có lỗi xảy ra trong quá trình thanh toán",
      error: error.message,
    });
  }
});

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoute);
app.use("/api/tour", tourRoute);
app.use("/api/tourBig", tourBigRoute);

app.use("/api/inforTour", inforTourRoute);
app.use("/api/inforTourNote", inforTourNoteRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/send-mail", bookingRoute);
app.use("/api/review", reviewRoute);
app.use("/api/review", replyRoute);
app.use("/api/favorites", favoriteTourRoutes);
app.use("/api/contacts", contactRoute);
app.use("/api/email", emailRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/assignStaff", assignStaffRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
