const express = require("express");
const {
  getParcels,
  createParcel,
  updateParcel,
  getParcel,
} = require("../controllers/parcelController");
const router = express.Router();

router.route("/").get(getParcels).post(createParcel);

router.route("/:id").get(getParcel).put(updateParcel);

module.exports = router;
