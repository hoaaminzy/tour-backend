const mongoose = require("mongoose");

var inforTourNoteSchema = new mongoose.Schema(
  {
    titleTour: {
      type: String,
      required: true,
    },
    tourPriceIncluded: {
      type: String,
      required: true,
    },
    tourPriceNotIncluded: {
      type: String,
      required: true,
    },

    notePriceChildren: {
      type: String,
      required: true,
    },
    paymentConditions: {
      type: String,
      required: true,
    },
    registerConditions: {
      type: String,
      required: true,
    },
    noteTransferCancellation: {
      type: String,
      required: true,
    },
    tourCancelWeekdays: {
      type: String,
      required: true,
    },
    tourCancelHolidays: {
      type: String,
      required: true,
    },
    forceMajeureReasons: {
      type: String,
      required: true,
    },
    contact: {
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

module.exports = mongoose.model("inforTourNote", inforTourNoteSchema);
