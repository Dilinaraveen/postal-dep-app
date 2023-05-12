import React from "react";
import "../About/about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="title-container">
        <span>About Us</span>
      </div>
      <div className="image-container">
        <img
          src="https://res.cloudinary.com/srilankan-cloudname/image/upload/v1679510130/DOP_header_wiejhn.png"
          alt=""
        />
      </div>

      <div className="about-content">
        <div className="about-title">Our Vision</div>
        <div className="about-desc">
          Become the partner of excellence in relations, by providing innovative
          and diverse service.
        </div>
      </div>

      <div className="about-content">
        <div className="about-title">Our Mission</div>
        <div className="about-desc">
          To provide a highly innovative, efficient and reliable postal service
          utilizing motivated staff and modern technology in a pleasant work
          environment to maximize customer satisfaction while adhering to the
          standards of the Universal Postal Union and upholding the policies of
          the Government of Sri Lanka.
        </div>
      </div>

      <div className="about-content">
        <div className="about-title">Major functions</div>
        <div className="about-desc">
          <ol>
            <li>Provision of an efficient and reliable service in tandem with all stakeholders as a team under any environmental and social condition under the guidance of the leadership and the promotion of income.</li>
            <li>Formulation and implementation of a strategic plan focused on new technological market and that advances the cause of the postal service in collaboration with the relevant stake holders.</li>
            <li>Bringing about an attitudinal change for the provision of a dignified service, updating intrinsic value systems of the Sri Lanka Post as a flagship communication entity of the state sector.</li>
            <li>Deploying the disciplined staff empowered by continuous training and a system of methodical performance appraisal in such a way to consolidate the public trust.</li>
            <li>Becoming the best postal hub of South Asia by providing a more efficient service through proper study of work, income-based grading and employee motivation.</li>
            <li>Making the post office network a commercial center providing multi-purpose services that can attract tourists and win public trust.</li>
          </ol>
        </div>
      </div>

     
    </div>
  );
};

export default About;
