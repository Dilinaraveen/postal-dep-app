const mongoose = require("mongoose");

const fineSchema = mongoose.Schema(
  {
    licenseNo: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    paymentDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fine", fineSchema);
