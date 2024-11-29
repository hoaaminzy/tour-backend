const mongoose = require("mongoose");

const inforTourDetailSchema = new mongoose.Schema(
  {
    price: {
      price: { type: String, required: true },
      priceBaby: { type: String, required: false },
      priceChildren: { type: String, required: false },
    },
    time: {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
    },
    fightTime: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    fightBackTime: {
      startBackTime: { type: String, required: true },
      endBackTime: { type: String, required: true },
    },
    slot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const tourDetailSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    endCity: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    inforTourDetail: {
      type: [inforTourDetailSchema], 
      required: true, 
    },
    vehicle: {
      type: String,
      required: true,
    },
    hotel: {
      type: String,
      required: true,
    },
    typeCombo: {
      type: String,
      required: true,
    },
    combo: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tourDetail", tourDetailSchema);
