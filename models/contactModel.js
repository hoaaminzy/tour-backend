const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    infoType: {
      type: String,
      required: true,
      enum: ["Du lịch", "Công việc", "Khác"],
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    numberOfGuests: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contacted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
