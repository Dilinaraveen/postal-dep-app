const asyncHandler = require("express-async-handler");
const Fine = require("../models/fineModel");

//@desc GET all fine
//@route GET /api/fine
//@access admin

const getFines = asyncHandler(async (req, res) => {
  const fine = await Fine.find();
  res.status(200).json(fine);
});

//@desc CREATE fine
//@route CREATE /api/fines
//@access public

const createFine = asyncHandler(async (req, res) => {
  console.log("The req body: ", req.body);
  const { photo, licenseNo, amount } = req.body;
  if (!licenseNo || !amount) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const fine = await Fine.create({
    photo,
    licenseNo,
    amount,
  });
  res.status(201).json(fine);
});

//@desc GET single fine
//@route GET /api/fines/:id
//@access admin

const getFine = asyncHandler(async (req, res) => {
  const fine = await Fine.findById(req.params.id);
  if (!fine) {
    res.status(404);
    throw new Error("Fine not found!");
  }
  res.status(200).json(fine);
});

//@desc UPDATE status
//@route PUT /api/fines/:id
//@access admin


module.exports = { getFines, createFine, getFine };
