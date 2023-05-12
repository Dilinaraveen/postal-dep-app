import React, { useEffect, useState } from "react";
import "../FinePayment/finepayment.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

// Get production API keys from Upload.io
const uploader = Uploader({
  apiKey: "free",
});

// Customize the file upload UI (see "customization"):
const options = { multi: true };

const FinePayment = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  //Form Validation

  const formik = useFormik({
    initialValues: {
      photo: "",
      licenseNo: "",
      amount: "",
    },
    validationSchema: Yup.object({
      licenseNo: Yup.string()
      .matches(/^\d+$/, 'License number must be numeric')
      .min(12, 'License number must be at least 12 digits')
      .max(12, 'License number can have at most 12 digits')
      .required('License number is required'),
      amount: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/fines",
          values
        );
        setShowCheckout(true);
        console.log(imagePreviewUrl);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onToken = (token) => {
    setStripeToken(token);
  };

  const { setFieldValue } = formik;

  return (
    <>
    <NavLink to="/services"><div style={{margin:'30px', fontSize:'30px', color:'red'}}><BsFillArrowLeftCircleFill/></div></NavLink>
      {stripeToken ? (
        <div className="success-container">
          <span className="successful-label">Successful !</span>

          <div className="payment-info-container">
            <h2 style={{ marginBottom: "50px", paddingBottom: "30px" }}>
              Payment Info
            </h2>
            <span className="details">
              License Number: {formik.values.licenseNo}
            </span>

            <span className="details">Amount: LKR {formik.values.amount}</span>
          </div>
        </div>
      ) : (
        <div className="finepayment-container">
          <h1 className="finepayment-container-header">Fine Payment</h1>
          <form action="" className="form" onSubmit={formik.handleSubmit}>
            {/* File Upload */}

            <UploadButton
              uploader={uploader} // Required.
              options={options} // Optional.
              onComplete={(files) => {
                // Optional.
                if (files.length === 0) {
                  console.log("No files selected.");
                } else {
                  console.log("Files uploaded:");
                  console.log(files.map((f) => f.fileUrl));
                  const photo = files[0].fileUrl;
                  setImagePreviewUrl(photo);
                  setFieldValue("photo", photo);
                }
              }}
            >
              {({ onClick }) => (
                <div
                  style={{
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Upload Document</span>
                  <button className="upload-button" onClick={onClick}>
                    Upload a file...
                  </button>
                </div>
              )}
            </UploadButton>

            {/* <label>{imagePreviewUrl}</label> */}
            {imagePreviewUrl && 
            <img className="img-preview" src={imagePreviewUrl} alt="" />}

            {/* Photo URL */}

            {/* <div className="service-acc-no">
              <span className="tag"></span>
              <input
                type="text"
                name="photo"
                value={imagePreviewUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.photo && formik.errors.photo ? (
              <span className="error">{formik.errors.photo}</span>
            ) : null} */}

            {/* License Number */}

            <div className="service-acc-no">
              <span className="tag">License Number</span>
              <input
                type="text"
                name="licenseNo"
                value={formik.values.licenseNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.licenseNo && formik.errors.licenseNo ? (
              <span className="error">{formik.errors.licenseNo}</span>
            ) : null}

            {/* Amount */}

            <div className="service-acc-no">
              <span className="tag">Amount</span>
              <input
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.amount && formik.errors.amount ? (
              <span className="error">{formik.errors.amount}</span>
            ) : null}

            {!showCheckout && (
              <button
                type="submit"
                className="pay-btn"
                style={{ marginBottom: "20px" }}
              >
                Pay Now
              </button>
            )}

            {showCheckout && (
              <StripeCheckout
                name="postal-app"
                description={`Total is LKR${formik.values.amount}`}
                amount={formik.values.amount}
                token={onToken}
                stripeKey={
                  "pk_test_51MpdNHFaKo24dUEZCjEQCwtbkEk0qJazhwzeckHwxwEkrFVOtwwVcnq1suQzrhUofem0LEjvMdISXskgytabmaL100KMkNcQRe"
                }
              >
                <button
                  className="pay-btn"
                  style={{ marginTop: "50px", width: "100%" }}
                >
                  Pay with Card
                </button>
              </StripeCheckout>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default FinePayment;
