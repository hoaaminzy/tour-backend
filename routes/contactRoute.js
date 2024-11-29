const express = require("express");
const route = express.Router();

const {
  contact,
  getAllContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactController.js");

route.post("/contact", contact);
route.get("/get-all-contact", getAllContact);
route.delete("/delete-contact/:id", deleteContact);
route.put("/update-contact/:id", updateContact);

module.exports = route;
