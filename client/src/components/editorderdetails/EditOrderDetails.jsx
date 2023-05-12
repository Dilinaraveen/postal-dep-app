import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, IconButton, Snackbar } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "../../pages/CreateOrder/createorder.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditOrderDetails({ order, setToggle, toggle }) {
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarType, setSnackbarType] = React.useState("");
  const [snackbarMsg, setSnackbarMsg] = React.useState("");

  const navigate = useNavigate();

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      status: order && order.status,
      parcelLocation: order && order.parcelLocation,
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Required"),

      parcelLocation: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      axios
      .put(`http://localhost:5001/api/parcels/${order._id}`,values)
      .then(({ data }) => { 
        console.log(data);
        setSnackbarType("success");
        setSnackbarMsg("Updated Successfully");
        handleOpenSnackbar();
        setOpen(false);
        setToggle(!toggle);
      })
      .catch((e) => {
        console.log(e);
      });
    },
  });

  return (
    <div>
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
      <form
        action=""
        className="create-order-form"
        onSubmit={formik.handleSubmit}
      ></form>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <ModeEditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Parcel Details</DialogTitle>
        <div style={{padding:'20px'}}>
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

        {formik.touched.status && formik.errors.status ? (
          <span className="error">{formik.errors.status}</span>
        ) : null}</div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={formik.handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
