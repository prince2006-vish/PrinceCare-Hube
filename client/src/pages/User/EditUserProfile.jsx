import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import {
  // getLoginUserDetails,
  // getUserData,
  updateUserData,
} from "../../redux/actions/authActions";
import toast from "react-hot-toast";
import { reset } from "../../redux/slice/authSlice";
// import { getLoginUser } from "../../../../controllers/userController";

const EditUserProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  // const naviagte = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  // const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  // useEffect(() => {
  //   dispatch(getLoginUserDetails());
  // }, [dispatch]);

  const { user, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setPhone(user?.phone || "");
      setGender(user?.gender || "");
      setAddress(user?.address || "");
      setImage(user?.image || "");
    }
  }, [user]);

  //handle updata
  const handleUpdata = (id) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("gender", gender);
    dispatch(reset());
    dispatch(updateUserData({ id, formData }));
  };

  useEffect(() => {
    if (success) {
      toast.success("user Updated!");
      dispatch(reset());
      onClose();
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error, onClose]);

  if (!isOpen) return null;
  return (
    <>
      <div className="editmodal modal d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Your Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <div className="mod-details d-flex flex-column">
                <img
                  src={`data:image/jpeg;base64,${user?.image}`}
                  alt="userpic"
                  height={80}
                  width={100}
                />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="d-flex flex-row">
                  <select
                    className="m-1"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value={"male"} selected>
                      Male
                    </option>
                    <option value={"female"} selected>
                      female
                    </option>
                  </select>
                  {/* <input type="date" placeholder="dob" /> */}
                </div>
                <input
                  type="text"
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdata(user?._id)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
