const mongoose = require("mongoose");

const discountCodeSchema = new mongoose.Schema(
  {
    titleCode: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("discountCode", discountCodeSchema);
