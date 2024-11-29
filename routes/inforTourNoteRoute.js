const express = require("express");
const route = express.Router();

// const {
//   authMiddleware,
//   isAdmin,
// } = require("../middlewares/authMiddleware.js");
const {
  addInforTourNote,
  getAllInforToursNote,
} = require("../controllers/inforTourNoteController");

route.post("/add-infor-tour-note", addInforTourNote);
route.get("/get-all-infor-tours-note", getAllInforToursNote);

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
