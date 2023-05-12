import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../navbar/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //console.log(user.value[0].userDetails.isAdmin);

  const handleLogOut = () => {
    dispatch(logout());
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isAdmin");
  };

  // useEffect(() => {
  //   console.log("User", user);
  // }, [user]);

  // useEffect(() => {
  //   const user = window.localStorage.getItem("user");
  //   if (user) {
  //     setIsAuthenticated(true);

  //   }
  // }, []);

  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const isAdmin = window.localStorage.getItem("isAdmin");

  console.log("isLoggedIn", loggedIn);
  console.log("isAdmin", isAdmin);

  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <img
          src="https://res.cloudinary.com/srilankan-cloudname/image/upload/v1679510130/DOP_header_wiejhn.png"
          alt=""
        />
      </div>
      <div className="navbar-links-container">
        <NavLink className="navbar-navlink" to="/">
          Home
        </NavLink>

        {loggedIn && (
          <>
            {isAdmin == "true" && (
              <NavLink className="navbar-navlink" to="/createorder">
                Create Order
              </NavLink>
            )}

            {isAdmin == "false" && (
              <NavLink className="navbar-navlink" to="/services">
                Services
              </NavLink>
            )}
          </>
        )}

        <NavLink className="navbar-navlink" to="/about">
          About
        </NavLink>
        <NavLink className="navbar-navlink" to="/contactus">
          Contact Us
        </NavLink>

        {loggedIn && (
          <>
            {isAdmin == "true" && (
              <NavLink className="navbar-navlink" to="/dashbaord">
                Dashboard
              </NavLink>
            )}

            <NavLink className="navbar-navlink" onClick={handleLogOut} to="/">
              Log Out
            </NavLink>
          </>
        )}

        {!loggedIn && (
          <>
            <NavLink className="navbar-navlink" to="/login">
              Login
            </NavLink>

            <NavLink className="navbar-navlink" to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
