const express = require("express");
const route = express.Router();

// const {
//   authMiddleware,
//   isAdmin,
// } = require("../middlewares/authMiddleware.js");
const { addReply } = require("../controllers/replyController.js");

route.post("/add-reply", addReply);

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
