import React from "react";
import "./Facility.css";
import FacilityData from "./FacilityData.json";

const Facility = () => {
  return (
    <>
      <div className="facility-container-main">
        <h1 className="facilityHeading">Facilites</h1>
        <div className="facility-container">
          {FacilityData.map((d, i) => (
            <div className="card" key={i}>
              <i className={`${d.icon} card-img-top`}></i>
              <div className="card-body">
                <h5 className="card-title">{d.title} </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Facility;
