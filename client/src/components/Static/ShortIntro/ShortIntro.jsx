import React from "react";
import "./ShortIntro.css";
import introImg from "/doctor.jpg";
import { NavLink } from "react-router";
const ShortIntro = () => {
  return (
    <>
      <div className="intro-container">
        <div className="row">
          <div className="col-md-6 img-container">
            <img src={introImg} alt="intro img" className="hos-image" />
          </div>
          <div className="col-md-5 info-container">
            <h1>PrinceCare Hub</h1>
            <h6>A Super Specility Hospital</h6>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
              nihil adipisci dolor deleniti expedita sapiente vero perferendis
              sit unde praesentium.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
              nihil adipisci dolor deleniti expedita sapiente vero perferendis
              sit unde praesentium.
            </p>
            <button className="btn btn-success">
              <NavLink className="nav-link" to="/Docter">
                Book Appointment
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortIntro;
