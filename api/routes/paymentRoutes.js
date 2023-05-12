const express = require("express");
const {
  getPayments,
  createPayment,
  updatePayment,
  getPayment,
} = require("../controllers/paymentController");
const router = express.Router();

router.route("/").get(getPayments).post(createPayment);

router.route("/:id").get(getPayment).put(updatePayment);

module.exports = router;
