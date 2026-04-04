import React, { useEffect } from "react";
import AllDoctorData from "./Docters.json";
import "./Doctors.css";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctor } from "../../redux/actions/doctorAction";

const Docterpage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDoctor());
  }, [dispatch]);

  const { doctors } = useSelector((state) => state.doctor);

  return (
    <>
      <h4 className="text-center mt-3 text-success">
        Select a Doctor and Book an Appointment online now!
      </h4>
      <div className="container doc-container">
        {doctors?.map((d) => (
          <div className="card" key={d._id} style={{ width: "15rem" }}>
            <NavLink to={`/appointments/${d._id}`}>
              <img
                src={`data:image/jpeg;base64,${d?.image}`}
                alt="doc_pic"
                width={160}
                height={150}
                className="card-image-top"
              />
              <div className="card-body">
                <h6>{d.name}</h6>
                <p>{d.degree}</p>
              </div>
              <div className="card-footer">
                <p>
                  {""}
                  <i className={d.icon}></i>
                  {d.speciality}
                </p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Docterpage;
