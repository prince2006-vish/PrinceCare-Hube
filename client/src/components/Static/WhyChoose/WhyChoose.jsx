import React from "react";
import "./WhyChoose.css";
import img from "/whychoose.png";
import img2 from "/whychoose1.png";
import img3 from "/whychoose2.png";

const WhyChoose = () => {
  return (
    <>
      <div className="cardt">
        <h1 className="text-center mt-5">Why Choose Us?</h1>
        <div className="row why-container">
          <div className="col-md-3">
            <img src={img} alt="img1" width={"50%"} />
            <h2>Personalize Excellence</h2>
            <p>
              We tailor our healthcare services to meet the unique needs of each
              patient, ensuring personalized care and attention. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Recusandae dolorem
              quis debitis rem reiciendis optio eligendi, deleniti sit nihil
              saepe!
            </p>
          </div>
          <div className="col-md-3">
            <img src={img2} alt="img1" width={"50%"} />
            <h2>Trusted Care</h2>
            <p>
              Our team of experienced medical professionals is dedicated to
              providing trustworthy and reliable healthcare services. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
              fugiat quaerat dolorem placeat blanditiis ipsum.
            </p>
          </div>
          <div className="col-md-3">
            <img src={img3} alt="img1" width={"50%"} />
            <h2>Empowering Wellness Journey</h2>
            <p>
              We empower our patients to take control of their health through
              education, support, and comprehensive care plans.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChoose;
