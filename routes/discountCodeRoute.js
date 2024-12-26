const express = require("express");
const {
  addCode,
  getAllCodes,
  deleteCode,
} = require("../controllers/discountCodeController");
const route = express.Router();

route.post("/add-code", addCode);
route.get("/get-all-codes", getAllCodes);
route.delete("/delete-code/:id", deleteCode);
module.exports = route;
