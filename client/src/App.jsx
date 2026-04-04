import "./App.css";
import { Routes, Route } from "react-router";
// import Slider from "./components/Slider_temp/Slider1";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import Docterpage from "./pages/Docter/Docterpage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import Register from "./pages/Auth/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import Appointments from "./pages/Docter/Appointments";
import UserProfile from "./pages/User/UserProfile";
import MyAppointment from "./pages/User/MyAppointment";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset } from "./redux/slice/authSlice";
import { getLoginUserDetails } from "./redux/actions/authActions";
import AppointmentDetails from "./pages/User/AppointmentDetails";
import ResetPassword from "./pages/User/ResetPassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    const localData = localStorage.getItem("appData");
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getLoginUserDetails(id));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/docter" element={<Docterpage />} />
        <Route path="/appointments/:id" element={<Appointments />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/reset-password/:id" element={<ResetPassword />} />
        <Route path="/user/appointment" element={<MyAppointment />} />
        <Route path="/user/appointment/:id" element={<AppointmentDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
