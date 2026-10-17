import express from "express";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
import {
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getAppointmentDetails,
  getUserAppointmentDetails,
  getUserAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentsController.js";

const router = express.Router();

//create || post
router.post("/create", userAuth, isAdmin, bookAppointment);

//get all || get
router.get("/get-all", userAuth, isAdmin, getAllAppointments);

//get details || get
router.get("/get-details/:id", userAuth, isAdmin, getAppointmentDetails);

//update status || patch
router.patch("/update-status/:id", userAuth, isAdmin, updateAppointmentStatus);

//GET ALL USER APPOINTMENT || GET
router.get("/get-user-appointments/:id", userAuth, getUserAppointments);

//get user appointment details || get
router.get(
  "/get-user-appointment-details/:id",
  userAuth,
  getUserAppointmentDetails
);

//cancel user appointment || post
router.post("/cancel/:id", userAuth, cancelAppointment);

export default router;
