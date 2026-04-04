import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <>
      <div className="topbar-container ">
        <h6>
          {" "}
          <i className="fa-solid fa-phone"></i> Emergency Call: 8853260723
        </h6>
        <h6>
          {" "}
          <i className="fa-solid fa-clock"></i> 10:00AM to 10:00PM
        </h6>
        <h6>
          {" "}
          <i className="fa-solid fa-envelope"></i>help@princecarehub.com
        </h6>
        <h6>
          {" "}
          <i className="fa-solid fa-caret-down"></i>English
        </h6>
      </div>
    </>
  );
};

export default Topbar;
