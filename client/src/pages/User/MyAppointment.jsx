import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelStatus,
  getAllAppointments,
} from "../../redux/actions/authActions";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyAppointment = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem("appData");
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getAllAppointments(id));
    }
  }, [dispatch]);

  const { appointments, error, success } = useSelector((state) => state.auth);

  const handleCancel = (id) => {
    dispatch(cancelStatus(id));
    if (success) {
      toast.success("Cancel Successfully");
      window.location.reload();
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <h1>My All Appointment</h1>
      <table className="table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Booking Date</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Details</th>
            <th>Update Booking</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.length > 0 &&
            appointments?.map((a, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{a?.slotDate}</td>
                <td>{a?.amount}</td>
                <td>{a?.status}</td>
                <td>
                  <Link to={`/user/appointment/${a?._id}`}>details</Link>
                </td>
                <td>
                  {a?.status == "pending" ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancel(a?._id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    "NA"
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default MyAppointment;
