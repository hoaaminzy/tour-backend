const express = require("express");
const { vnpayPayment, vnpayReturn } = require("../controllers/vnpaycontroller");

const router = express.Router();

router.post("/payment", vnpayPayment);
router.get("/return", vnpayReturn);

module.exports = router;
