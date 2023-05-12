import React, { useState } from "react";
import "../Login/login.css";
import "../../components/employeedetails/employeedetails.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const dispatch = useDispatch();
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().max(255).required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/login",
          values
        );
        window.localStorage.setItem("isLoggedIn", true);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        window.localStorage.setItem("isAdmin", JSON.stringify(response.data.user.isAdmin));
        console.log(response.data.user.isAdmin);
        setSnackbarType("success");
        setSnackbarMsg("Successfully Logged");
        handleOpenSnackbar();
        dispatch(
          login({ userDetails: response.data })
        );
        setTimeout(() => {
          navigate("/");
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
      <h1 className="login-title">Login</h1>
      <form className="login-form">
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
