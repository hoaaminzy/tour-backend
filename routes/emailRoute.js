const express = require("express");
const route = express.Router();

const { emailLogin, emailContact } = require("../controllers/emailController");

route.post("/send-email", emailLogin);
route.post("/send-email-contact", emailContact);

module.exports = route;
