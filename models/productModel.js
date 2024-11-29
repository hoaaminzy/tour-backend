const mongoose = require("mongoose"); // Erase if already required

var ProductSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    action: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    links: {
      type: String,
      require: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    hang: {
      type: Array,
      // require: true,
    },
    updateBy: {
      type: mongoose.Schema.Types
        .ObjectId,
      ref: "User",
    },
    statusProduct: {
      type: String,
      enum: ["Đang rao", "Đã bán"],
      default: "Đang rao",
    },
    status: {
      type: String,
      enum: ["Chờ duyệt", "Đã duyệt"],
      default: "Chờ duyệt",
    },
  },
  {
    timestamps: true, // time create
  }
);

module.exports = mongoose.model(
  "Product",
  ProductSchema
);
