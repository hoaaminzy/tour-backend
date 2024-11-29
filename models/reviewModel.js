// models/Review.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Object,
      required: true,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
    tourId: {
      type: Object,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
