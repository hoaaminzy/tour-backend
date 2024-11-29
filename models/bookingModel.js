const mongoose = require("mongoose");

// Define the payment schema
const paymentSchema = new mongoose.Schema(
  {
    pay: { type: Object, required: true },
    userId: String,
    user: {
      name: String,
      address: String,
      numberphone: String,
      email: String,
    },
    inforTour: {
      type: Object,
    },
    orderId: String,
    totalPrice: Number,
    status: { type: String, default: "Chờ thanh toán" },
  },
  { timestamps: true }
);
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    tourId: {
      type: String,
    },
    bookingId: {
      type: String,
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    passengers: {
      type: Object,
    },
    tourDetail: {
      type: Array,
    },
    tourInfor: {
      type: Array,
      default: [],
    },
    selectedPayment: {
      type: String,
      enum: ["cash", "bank", "momo"],
    },
    totalPrice: {
      type: String,
    },
    messageContent: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      default: "Chờ xác nhận",
    },
    payment: {
      type: [paymentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
