const mongoose = require("mongoose");

const parcelSchema = mongoose.Schema(
  {
    trackingNo: {
      type: String,
      required: true,
    },
    status:{
      type: String,
      required: true,
    },
    senderName:{
      type: String,
      required: true,
    },
    senderPhone:{
      type: String,
      required: true,
    },
    senderAddress:{
      type: String,
      required: true,
    },
    recieverName:{
      type: String,
      required: true,
    },
    recieverPhone:{
      type: String,
      required: true,
    },
    recieverAddress:{
      type: String,
      required: true,
    },
    parcelLocation:{
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Parcels", parcelSchema);
