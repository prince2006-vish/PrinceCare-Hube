import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { getUserData } from "../../../redux/actions/authActions";
import "./NavMenu.css";

const NavMenu = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link navcolor active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navcolor" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navcolor" to="/Docter">
                  Docter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navcolor" to="/Gallery">
                  Gallery
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navcolor" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navcolor" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button className="btn button" type="submit">
                <NavLink className="nav-link " to="/Docter">
                  {" "}
                  Book a Appointment
                </NavLink>
              </button>
            </form>
            {/* login User  */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> 
              {user ? (
                <li className="nav-item">
                  <NavLink className="nav-link navcolor" to="/user/profile">
                    My Account
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link navcolor" to="/login">
                    LOGIN
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavMenu;
