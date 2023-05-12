const express = require("express");
const {
  getFines,
  createFine,
  getFine,
} = require("../controllers/fineController");
const router = express.Router();

router.route("/").get(getFines).post(createFine);

router.route("/:id").get(getFine);

module.exports = router;
