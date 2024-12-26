const crypto = require("crypto");
const querystring = require("querystring");
const Booking = require("../models/bookingModel"); // Booking model
const config = require("../config/vnpay"); // VNPay configuration

// Utility function to sort and format query parameters
const sortObject = (obj) => {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
  }
  return sorted;
};

// Generate VNPay payment URL
const vnpayPayment = async (req, res) => {
  try {
    const { bookingId, amount, orderInfo, returnUrl, userId, user } = req.body;

    // Validate input
    if (!bookingId || !amount || !orderInfo || !returnUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const vnp_TmnCode = config.vnp_TmnCode;
    const vnp_HashSecret = config.vnp_HashSecret;
    const vnp_Url = config.vnp_Url;

    const date = new Date();
    const createDate = date.toISOString().replace(/[-:]/g, "").slice(0, 14);

    const params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode,
      vnp_Amount: Math.round(amount * 100), // Amount in smallest unit
      vnp_CurrCode: "VND",
      vnp_TxnRef: bookingId, // Use bookingId as the transaction reference
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: "other",
      vnp_Locale: "vn",
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: req.ip || "127.0.0.1",
      vnp_CreateDate: createDate,
    };

    const sortedParams = sortObject(params);
    const signData = querystring.stringify(sortedParams);
    const hmac = crypto.createHmac("sha512", vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    const paymentUrl = `${vnp_Url}?${signData}&vnp_SecureHash=${signed}`;
    return res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error("Error generating payment URL:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Handle VNPay return URL
const vnpayReturn = async (req, res) => {
  const vnp_HashSecret = config.vnp_HashSecret;
  const vnp_Params = { ...req.query };

  try {
    console.log("VNPay Params:", vnp_Params);

    const secureHash = vnp_Params["vnp_SecureHash"];
    if (!secureHash) {
      return res.status(400).json({ message: "Missing vnp_SecureHash" });
    }

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    const sortedParams = sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams);
    const hmac = crypto.createHmac("sha512", vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    console.log("Calculated Secure Hash:", signed);

    if (secureHash !== signed) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const bookingId = vnp_Params["vnp_TxnRef"];
    const amount = parseInt(vnp_Params["vnp_Amount"], 10) / 100; // Convert to VND
    const orderInfo = vnp_Params["vnp_OrderInfo"];

    if (!bookingId || !amount || !orderInfo) {
      return res
        .status(400)
        .json({ message: "Missing required payment details" });
    }

    console.log("Booking ID:", bookingId);
    console.log("Amount:", amount);
    console.log("Order Info:", orderInfo);

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.payment.push({
      pay: { amount, orderInfo },
      user,
      userId,
      status: "Thanh toán thành công",
    });

    await booking.save();
    return res
      .status(200)
      .json({ message: "Payment success", data: vnp_Params });
  } catch (error) {
    console.error("Error processing VNPay return:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  vnpayPayment,
  vnpayReturn,
};
