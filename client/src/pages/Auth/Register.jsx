import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/slice/authSlice";
import { register } from "../../redux/actions/authActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please provider all fields");
    }
    dispatch(register({ name, email, password }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Registration successful!");
      navigate("/login");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <div className="auth-container">
        <div className="card">
          <h2>Create Account</h2>
          <p>please enter your details</p>
          <div className="form-group md-3">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group md-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group md-3">
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            disabled={!name || !email || !password}
            onClick={handleSubmit}
          >
            Register
          </button>
          <p style={{ margin: "10px" }}>
            {" "}
            Already have an account? <NavLink to="/login">Login here!</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
