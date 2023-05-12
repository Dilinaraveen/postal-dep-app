import React from "react";
import '../ContactUs/contactus.css'

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="title-container">
        <span>Contect Us</span>
      </div>
      <span className="contact-desc">If you have any queries or clarifications on Sri Lanka Post or the services offered by the Department, please feel free to contact us using any of the following methods.</span>
      <span className="contact-desc">Contacts : +94 0112328301-3 (Tel) , + 94 011 2440555 (Fax)</span>
      <span className="contact-desc">Email : info@slpost.lk / pmg@slpost.lk</span>
      <span className="contact-desc">Address :</span>
      <span className="contact-desc">Post Master General ,
Postal Head Quarters ,
D.R Wijewardena Mawatha ,
Colombo 10 ,
001000 ,
Sri Lanka.</span>
    </div>
  );
};

export default ContactUs;
