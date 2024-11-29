const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("tour", tourSchema);
