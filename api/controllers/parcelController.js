const asyncHandler = require("express-async-handler");
const Parcel = require("../models/parcelModel");

//@desc GET all parcels
//@route GET /api/parcels
//@access admin

const getParcels = asyncHandler(async (req, res) => {
  const parcel = await Parcel.find();
  res.status(200).json(parcel);
});

//@desc CREATE parcel
//@route CREATE /api/parcels
//@access public

const createParcel = asyncHandler(async (req, res) => {
  const {
    trackingNo,
    status,
    senderName,
    senderPhone,
    senderAddress,
    recieverName,
    recieverPhone,
    recieverAddress,
    parcelLocation,
  } = req.body;

  const parcel = await Parcel.create({
    trackingNo,
    status,
    senderName,
    senderPhone,
    senderAddress,
    recieverName,
    recieverPhone,
    recieverAddress,
    parcelLocation,
  });
  console.log(parcel)
  res.status(201).json(parcel);
});

//@desc GET single parcel
//@route GET /api/parcels/:id
//@access admin

const getParcel = asyncHandler(async (req, res) => {
  const parcel = await Parcel.find({'trackingNo': { $regex: '.*' + req.params.id + '.*' } });
  if (!parcel) {
    res.status(404);
    throw new Error("Parcel not found!");
  }
  res.status(200).json(parcel);
});

//@desc UPDATE status
//@route PUT /api/parcels/:id
//@access admin

const updateParcel = asyncHandler(async (req, res) => {
  const parcel = await Parcel.findById(req.params.id);
  if (!parcel) {
    res.status(404);
    throw new Error("Parcel not found!");
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedParcel);
});

module.exports = { getParcels, createParcel, updateParcel, getParcel };
