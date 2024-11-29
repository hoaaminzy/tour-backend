const express = require("express");
const route = express.Router();

// const {
//   authMiddleware,
//   isAdmin,
// } = require("../middlewares/authMiddleware.js");
const {
  addTour,
  getAllTours,
  updateTour,
  deleteTour,
} = require("../controllers/tourController.js");
const upload = require("../config/multerConfig.js");

route.post("/add-tour", upload.array("images", 4), addTour);
route.get("/get-all-tours", getAllTours);
route.put("/update-tour/:id", upload.array("images", 4), updateTour);
route.delete("/delete-tour/:id", deleteTour);
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
