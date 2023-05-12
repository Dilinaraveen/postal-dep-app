const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

//@desc GET all employees
//@route GET /api/employees
//@access admin

const getEmployees = asyncHandler(async (req, res) => {
  const employee = await Employee.find();
  res.status(200).json(employee);
});

//@desc CREATE employees
//@route CREATE /api/employees
//@access public

const createEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, jobTitle, salary } = req.body;

  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    jobTitle,
    salary,
  });
  console.log(employee);
  res.status(201).json(employee);
});

//@desc GET single employee
//@route GET /api/employees/:id
//@access admin

const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found!");
  }
  res.status(200).json(employee);
});

//@desc UPDATE employee
//@route PUT /api/employees/:id
//@access admin

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found!");
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedEmployee);
});

module.exports = { getEmployees, createEmployee, updateEmployee, getEmployee };
