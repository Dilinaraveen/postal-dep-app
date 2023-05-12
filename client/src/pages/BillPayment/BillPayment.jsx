import React, { useEffect, useState } from "react";
import "../BillPayment/billpayment.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const BillPayment = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  //Form Validation

  const formik = useFormik({
    initialValues: {
      nicNo: "",
      serviceProvider: "",
      accNo: "",
      amount: "",
    },
    validationSchema: Yup.object({
      nicNo: Yup.string()
        .test("validNIC", "Invalid NIC number", (value) =>
          /^[0-9]{9}[VX]$/i.test(value)
        )
        .required("NIC number is required"),
      serviceProvider: Yup.string().required("Required"),
      accNo: Yup.string().required("Required"),
      amount: Yup.number()
        .integer("Value must be an integer")
        .required("Value is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/payments",
          values
        );
        console.log(response.data);
        setShowCheckout(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onToken = (token) => {
    setStripeToken(token);
  };

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:5001/api/checkout/payment",
  //         {
  //           tokenId: stripeToken.id,
  //           amount: 1000,
  //         }
  //       );
  //       console.log(res.data);

  //       // navigate("/success", res.data);
  //     } catch (err) {}
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, navigate]);

  return (
    <div> 
      <NavLink to="/services"><div style={{margin:'30px', fontSize:'30px', color:'red'}}><BsFillArrowLeftCircleFill/></div></NavLink>
      {stripeToken ? (
        <div className="success-container">
          <span className="successful-label">Successful !</span>

          <div className="payment-info-container">
            <h2 style={{ marginBottom: "50px", paddingBottom: "30px" }}>
              Payment Info
            </h2>
            <span className="details">NIC Number: {formik.values.nicNo}</span>
            <span className="details">
              Selected Service: {formik.values.serviceProvider}{" "}
            </span>
            <span className="details">
              Account Number: {formik.values.accNo}
            </span>
            <span className="details">Amount: LKR {formik.values.amount}</span>
          </div>
        </div>
      ) : (
        <div className="billpayment-container">
          <h1 className="billpayment-container-header">Bill Payment</h1>
          <form action="" className="form" onSubmit={formik.handleSubmit}>
            {/* NIC Number */}

            <div className="service-acc-no">
              <span className="tag">NIC Number</span>
              <input
                type="text"
                name="nicNo"
                value={formik.values.nicNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.nicNo && formik.errors.nicNo ? (
              <span className="error">{formik.errors.nicNo}</span>
            ) : null}

            {/* Service */}

            <div className="select-service">
              <span className="tag">Select Service</span>
              <select
                aria-label="Default select example"
                name="serviceProvider"
                value={formik.values.serviceProvider}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="slt">SLT</option>
                <option value="mobitel">Mobitel</option>
                <option value="ceb">CEB</option>
              </select>
            </div>

            {formik.touched.serviceProvider && formik.errors.serviceProvider ? (
              <span className="error">{formik.errors.serviceProvider}</span>
            ) : null}

            {/* Account Number */}

            <div className="service-acc-no">
              <span className="tag">Account Number</span>
              <input
                type="text"
                name="accNo"
                value={formik.values.accNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.accNo && formik.errors.accNo ? (
              <span className="error">{formik.errors.accNo}</span>
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
    </div>
  );
};

export default BillPayment;
