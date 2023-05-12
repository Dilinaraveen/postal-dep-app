import React from "react";
import { NavLink } from "react-router-dom";
import "../Services/services.css";
import { RiBillFill } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { MdDangerous } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

const Services = () => {
  return (
    <div className="services-container">
      <NavLink to={"/billpayment"}>
        <div className="service-btn">
          <div className="tab-heading">
            <RiBillFill />
            <span>Bill Payments</span>
          </div>
          <div className="tab-description">
            <p>
              Experience the convenience of paying all your utility bills in one
              place. Simplify your life and save valuable time with our utility
              bill payment service our postal department portal.
            </p>
          </div>
          <div className="continue-btn-container">
            <button className="continue-btn">Continue</button>
            <BsArrowRight />
          </div>
        </div>
      </NavLink>

      <NavLink to={"/finepayment"}>
        <div className="service-btn">
          <div className="tab-heading">
            <MdDangerous />
            <span>Fine Payments</span>
          </div>
          <div className="tab-description">
            <p>
              Take advantage of our streamlined Fine Payment function in the
              postal department portal and experience a simpler, more efficient
              way to handle fines and penalties.
            </p>
          </div>
          <div className="continue-btn-container">
            <button className="continue-btn">Continue</button>
            <BsArrowRight />
          </div>
        </div>
      </NavLink>

      <NavLink to={"/parceltracking"}>
        <div className="service-btn">
          <div className="tab-heading">
            <BsSearch />
            <span>Parcel Tracking</span>
          </div>
          <div className="tab-description">
            <p>
              Make the most of our Parcel Tracking feature in the postal department portal 
             and take control of your shipments like
              never before. Stay connected, stay updated, and enjoy the
              convenience of tracking your parcels effortlessly.
            </p>
          </div>
          <div className="continue-btn-container">
            <button className="continue-btn">Continue</button>
            <BsArrowRight />
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Services;
