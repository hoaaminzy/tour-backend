const mongoose = require("mongoose");

const paymentMomoSchema = new mongoose.Schema(
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
  {
    timestamps: true,
  }
);

const paymentModel = mongoose.model("PaymentMomo", paymentMomoSchema);

module.exports = paymentModel;
