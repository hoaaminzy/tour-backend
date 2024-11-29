const mongoose = require("mongoose");

var inforTourSchema = new mongoose.Schema(
  {
    titleTour: {
      type: String,
      required: true,
    },
    sightseeingSpot: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },

    suitable: {
      type: String,
      required: true,
    },
    idealTime: {
      type: String,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    endow: {
      type: String,
      required: true,
    },

    // updateBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("inforTour", inforTourSchema);
