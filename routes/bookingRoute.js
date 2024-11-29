const express = require("express");
const route = express.Router();

// const {
//   authMiddleware,
//   isAdmin,
// } = require("../middlewares/authMiddleware.js");
const {
  addBooking,
  getAllBookings,
  updateBookingStatus,
  updateBookingedDetail,
  cancelTour,
  updateBookingedStatus,
} = require("../controllers/bookingController");

route.post("/add-booking", addBooking);
route.get("/get-all-bookings", getAllBookings);
route.put("/update-status", updateBookingStatus);
route.put("/update-bookinged-detail/:id", updateBookingedDetail);
route.put("/update-bookinged-status/:id", updateBookingedStatus);

route.delete("/cancel-tour/:id", cancelTour);
// route.post(
//   "/updatesp",

// );
// route.get(
//   "/get-product/:id",
//   // authMiddleware,
//   // isAdmin,
//   getsignProduct
// );
// route.post(
//   "/filter-product",
//   // authMiddleware,
//   // isAdmin,
//   filterProduct
// );
// route.delete(
//   "/delete-product/:id",
//   deletesignProduct
// );

module.exports = route;
