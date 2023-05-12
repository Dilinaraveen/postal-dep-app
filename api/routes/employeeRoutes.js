const express = require("express");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  getEmployee,
} = require("../controllers/employeeController");
const router = express.Router();

router.route("/").get(getEmployees).post(createEmployee);

router.route("/:id").get(getEmployee).put(updateEmployee);

module.exports = router;
