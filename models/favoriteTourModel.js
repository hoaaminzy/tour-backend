const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteTourSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "User", 
      required: true,
    },
    tourId: {
      type: String,
      ref: "Tour",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FavoriteTour", favoriteTourSchema);
