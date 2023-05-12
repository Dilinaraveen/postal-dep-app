import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "../employeedetails/employeedetails.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Alert, Snackbar } from "@mui/material";

export default function FormDialog({ setToggle, toggle }) {
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarType, setSnackbarType] = React.useState("");
  const [snackbarMsg, setSnackbarMsg] = React.useState("");

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
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      jobTitle: "",
      salary: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required("First name is required"),

      lastName: Yup.string().max(255).required("Last name is required"),

      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),

      phoneNumber: Yup.string()
      .matches(/^\d+$/, 'Phone number must be numeric')
      .min(10, 'Phone number must be at least 10 digits')
      .max(10, 'Phone number can have at most 10 digits')
      .required('Phone number is required'),

      jobTitle: Yup.string().required("Required"),

      salary: Yup.number()
      .integer('Value must be an integer')
      .required('Value is required'),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/employees",
          values
        );
        console.log(response.data);
        setSnackbarType("success");
        setSnackbarMsg("Added Successfully");
        handleOpenSnackbar();
        setOpen(false);
        setToggle(!toggle);

      } catch (error) {
        console.log(error);
        setSnackbarType("error");
        setSnackbarMsg(error.response.data);
        handleOpenSnackbar();
        setOpen(false);
      }
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
      <Button
        variant="outlined"
        sx={{ display: "flex", gap: "10px", alignItems: "center" }}
        onClick={handleClickOpen}
      >
        <PersonAddIcon /> Add Employee
      </Button>
      <Dialog
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              height: "400px",
              width: "1000px",
              maxWidth: "1100px", // Set your width here
            },
          },
        }}
        onClose={handleClose}
      >
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <form
            action=""
            className="employee-form"
            onSubmit={formik.handleSubmit}
          >
            <div className="employee-column">
              {/* First Name */}

              <div className="employee-input">
                <span className="tag">First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.firstName && formik.errors.firstName ? (
                <span className="error">{formik.errors.firstName}</span>
              ) : null}

              {/* Last Name */}

              <div className="employee-input">
                <span className="tag">Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.lastName && formik.errors.lastName ? (
                <span className="error">{formik.errors.lastName}</span>
              ) : null}

              {/* Email */}

              <div className="employee-input">
                <span className="tag">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.email && formik.errors.email ? (
                <span className="error">{formik.errors.email}</span>
              ) : null}
            </div>

            <div className="employee-column">
              {/* Phone Number */}

              <div className="employee-input">
                <span className="tag">Phone Number</span>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <span className="error">{formik.errors.phoneNumber}</span>
              ) : null}

              {/* Job Title */}

              <div className="employee-input">
                <span className="tag">Job Title</span>
                <input
                  type="text"
                  name="jobTitle"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.jobTitle && formik.errors.jobTitle ? (
                <span className="error">{formik.errors.jobTitle}</span>
              ) : null}

              {/* Salary */}

              <div className="employee-input">
                <span className="tag">Salary</span>
                <input
                  type="text"
                  name="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.salary && formik.errors.salary ? (
                <span className="error">{formik.errors.salary}</span>
              ) : null}
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained"  onClick={formik.handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
