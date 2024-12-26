const express = require("express");
const route = express.Router();

const {
  emailLogin,
  emailContact,
  emailBooking,
  emailStatus,
} = require("../controllers/emailController");

route.post("/send-email", emailLogin);
route.post("/send-email-contact", emailContact);
route.post("/send-email-booking", emailBooking);
route.post("/send-email-status", emailStatus);

module.exports = route;
