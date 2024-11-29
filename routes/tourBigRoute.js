const express = require("express");
const route = express.Router();

// const {
//   authMiddleware,
//   isAdmin,
// } = require("../middlewares/authMiddleware.js");
const {
  tour,
  getAllTourBig,

} = require("../controllers/tourBigController.js");
const upload = require("../config/multerConfig.js");

route.post("/tour", upload.array("images", 4), tour);
route.get("/get-all-tours", getAllTourBig);
// route.put("/update-tour/:id", upload.array("images", 4), updateTour);
// route.delete("/delete-tour/:id", deleteTour);
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
