const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    nicNo: {
      type: String,
      required: true,
    },
    serviceProvider: {
      type: String,
      required: true,
    },
    accNo: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payments", paymentSchema);
