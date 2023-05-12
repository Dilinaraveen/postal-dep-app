const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");

//@desc GET all payments
//@route GET /api/payments
//@access admin

const getPayments = asyncHandler(async (req, res) => {
  const payment = await Payment.find();
  res.status(200).json(payment);
});

//@desc CREATE payment
//@route CREATE /api/payments
//@access public

const createPayment = asyncHandler(async (req, res) => {
  console.log("The req body: ", req.body);
  const { nicNo, serviceProvider, accNo, amount } = req.body;
  if (!nicNo || !serviceProvider || !accNo || !amount) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const payment = await Payment.create({
    nicNo,
    serviceProvider,
    accNo,
    amount,
  });
  res.status(201).json(payment);
});

//@desc GET single payment
//@route GET /api/payments/:id
//@access admin

const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found!");
  }
  res.status(200).json(payment);
});

//@desc UPDATE status
//@route PUT /api/payments/:id
//@access admin

const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found!");
  }

  const updatedPayment = await Payment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res
    .status(200)
    .json(updatedPayment);
});

module.exports = { getPayments, createPayment, updatePayment, getPayment };
