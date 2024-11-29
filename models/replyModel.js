// models/Reply.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema(
  {
    reply: {
      type: String,
      required: true,
    },
    userId: {
      type: Object,
      required: true,
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
      required: true,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reply", ReplySchema);
