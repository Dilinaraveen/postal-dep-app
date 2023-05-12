import React, { useState } from "react";
import "../CreateOrder/createorder.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateOrder = () => {
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

  //Form Validation

  const formik = useFormik({
    initialValues: {
      trackingNo: uuidv4().split('-')[0],
      status: "",
      senderName: "",
      senderPhone: "",
      senderAddress: "",
      recieverName: "",
      recieverPhone: "",
      recieverAddress: "",
      parcelLocation: "",
    },
    validationSchema: Yup.object({
      trackingNo: Yup.string()
        .max(8, "Must be 8 characters")
        .min(8, "Must be 8 characters")
        .required("Required"),

      status: Yup.string().required("Required"),

      senderName: Yup.string().required("Required"),

      senderPhone: Yup.string()
      .matches(/^\d+$/, 'Phone number must be numeric')
      .min(10, 'Phone number must be at least 10 digits')
      .max(10, 'Phone number can have at most 10 digits')
      .required('Phone number is required'),

      senderAddress: Yup.string().required("Required"),

      recieverName: Yup.string().required("Required"),

      recieverPhone: Yup.string()
      .matches(/^\d+$/, 'Phone number must be numeric')
      .min(10, 'Phone number must be at least 10 digits')
      .max(10, 'Phone number can have at most 10 digits')
      .required('Phone number is required'),

      recieverAddress: Yup.string().required("Required"),

      parcelLocation: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/parcels",
          values
        );
        console.log(response.data);
        setSnackbarType("success");
        setSnackbarMsg("Created Successfully");
        handleOpenSnackbar();
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (error) {
        console.log(error);
        setSnackbarType("error");
        setSnackbarMsg(error.response.data);
        handleOpenSnackbar();
      }
    },
  });

  return (
    <div className="create-order-container">
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
      <h2 className="create-order-container-header">Create Order</h2>
      <form
        action=""
        className="create-order-form"
        onSubmit={formik.handleSubmit}
      >
        {/* Tracking Number */}

        <div className="create-order-input">
          <span className="tag">Tracking Number</span>
          <input
            type="text"
            name="trackingNo"
            value={formik.values.trackingNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {formik.touched.trackingNo && formik.errors.trackingNo ? (
          <span className="error">{formik.errors.trackingNo}</span>
        ) : null}

        {/* Status */}

        <div className="create-order-input">
          <span className="tag">Status</span>
          <select
            aria-label="Default select example"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled selected>
              Select
            </option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="recieved">Recieved</option>
          </select>
        </div>

        {formik.touched.status && formik.errors.status ? (
          <span className="error">{formik.errors.status}</span>
        ) : null}

        <div className="divider">
          <div className="senders-details">

            {/* Sender Name */}

            <div className="create-order-input">
              <span className="tag">Sender's Name</span>
              <input
                type="text"
                name="senderName"
                value={formik.values.senderName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.senderName && formik.errors.senderName ? (
              <span className="error">{formik.errors.senderName}</span>
            ) : null}

            {/* Sender Phone */}

            <div className="create-order-input">
              <span className="tag">Sender's Phone</span>
              <input
                type="text"
                name="senderPhone"
                value={formik.values.senderPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.senderPhone && formik.errors.senderPhone ? (
              <span className="error">{formik.errors.senderPhone}</span>
            ) : null}

            {/* Sender Address */}

            <div className="create-order-input">
              <span className="tag">Sender's Address</span>
              <input
                type="text"
                name="senderAddress"
                value={formik.values.senderAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.senderAddress && formik.errors.senderAddress ? (
              <span className="error">{formik.errors.senderAddress}</span>
            ) : null}

            {/* Parcel Location */}

            <div className="create-order-input">
              <span className="tag">Parcel Location</span>
              <input
                type="text"
                name="parcelLocation"
                value={formik.values.parcelLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.parcelLocation && formik.errors.parcelLocation ? (
              <span className="error">{formik.errors.parcelLocation}</span>
            ) : null}
          </div>

          <div className="recievers-details">

            {/* Reciever Name */}

            <div className="create-order-input">
              <span className="tag">Reciever's Name</span>
              <input
                type="text"
                name="recieverName"
                value={formik.values.recieverName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.recieverName && formik.errors.senderAddress ? (
              <span className="error">{formik.errors.senderAddress}</span>
            ) : null}

            {/* Reciever Phone */}

            <div className="create-order-input">
              <span className="tag">Reciever's Phone</span>
              <input
                type="text"
                name="recieverPhone"
                value={formik.values.recieverPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.recieverPhone && formik.errors.recieverPhone ? (
              <span className="error">{formik.errors.recieverPhone}</span>
            ) : null}

            {/* Reciever Address */}

            <div className="create-order-input">
              <span className="tag">Reciever's Address</span>
              <input
                type="text"
                name="recieverAddress"
                value={formik.values.recieverAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.recieverAddress && formik.errors.recieverAddress ? (
              <span className="error">{formik.errors.recieverAddress}</span>
            ) : null}

            
          </div>
        </div>
        <button type="submit" className="create-order-btn">
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
