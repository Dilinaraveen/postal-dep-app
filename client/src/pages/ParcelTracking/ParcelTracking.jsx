import React, { useState } from "react";
import "./parceltracking.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const ParcelTracking = () => {
  const [details, setDetails] = useState([]);
  const [span, setSpan] = useState(false);

  const formik = useFormik({
    initialValues: {
      trackingNo: "",
    },
    validationSchema: Yup.object({
      trackingNo: Yup.string()
        .max(8, "Must be 8 characters")
        .min(8, "Must be 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/parcels/${formik.values.trackingNo}`,
          values
        );
        
        console.log(response.data);
        setDetails(response.data);
        if(response.data.length === 0){
          setSpan(true);
        }
      } catch (error) {
        
        console.log(error);  
      }
    },
  });

  return (
    <>
    <NavLink to="/services"><div style={{margin:'30px', fontSize:'30px', color:'red'}}><BsFillArrowLeftCircleFill/></div></NavLink>
    <div className="parcel-tracking-container">
      <div className="search-parcel-input">
        <input
          type="text"
          name="trackingNo"
          placeholder="Enter Tracking Number"
          value={formik.values.trackingNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          type="submit"
          className="search-btn"
          onClick={formik.handleSubmit}
        >
          Create Order
        </button>
      </div>
      {formik.touched.trackingNo && formik.errors.trackingNo ? (
        <span className="error">{formik.errors.trackingNo}</span>
      ) : null}

      {/* Parcel Details */}

      {details.length != 0 && (
        <div className="info-container">
          <div className="parcel-id">Parcel Id: &nbsp;&nbsp;{details && details[0]._id}</div>
          <div className="sender">
            Sender's Name: &nbsp;&nbsp;{details && details[0].senderName}
          </div>
          <div className="reciever">Sender's Address: &nbsp;&nbsp;{details && details[0].senderAddress}</div>
          <div className="reciever">Sender's Phone: &nbsp;&nbsp;{details && details[0].senderPhone}</div>
          <div className="reciever">Reciever's Name: &nbsp;&nbsp;{details && details[0].recieverName}</div>
          <div className="reciever">Reciever's Address: &nbsp;&nbsp;{details && details[0].recieverAddress}</div>
          <div className="reciever">Reciever's Phone: &nbsp;&nbsp;{details && details[0].recieverPhone}</div>
          <div className="delivered-info">
            <div className="location">
              Delivered Location: &nbsp;&nbsp;{details && details[0].parcelLocation}
            </div>
            <div className="status-info">
              <div className="status">Status:</div>
              <div className={details && details[0].status === "delivered" ? "delivered" : "pending"}>{details && details[0].status}</div>
            </div>
          </div>
          
        </div>
      )} {span ?  <h3 style={{fontSize:"40px", marginTop:"80px" , color:"red"}}>Invalid Tracking Number!</h3> : ""}
    </div>
    </>
  );
};

export default ParcelTracking;
