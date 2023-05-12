import React, { useState } from "react";
import "../Login/login.css";
import "../../components/employeedetails/employeedetails.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");


  const navigate = useNavigate();

  //Snackbar Functions
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Password is required"),
      email: Yup.string().email().max(255).required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/register",
          values
        );
        setSnackbarType("success");
        setSnackbarMsg("Successfully Registered");
        handleOpenSnackbar();
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (error) {
        console.log(error);
        setSnackbarType("error");
        setSnackbarMsg(error.response.data);
        handleOpenSnackbar();
      }
    },
  });
  return (
    <div className="login">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <h1 className="login-title">Register</h1>
      <form className="login-form">
        <div className="username">
          <label>Username</label>
          <input
            type="username"
            className="login-input"
            placeholder="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.username && formik.errors.username ? (
          <span className="error">{formik.errors.username}</span>
        ) : null}

        <div className="username">
          <label>Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <span className="error">{formik.errors.email}</span>
        ) : null}

        <div className="password">
          <label>Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <span className="error">{formik.errors.password}</span>
        ) : null}

        <button
          className="login-button"
          type="submit"
          onClick={formik.handleSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
