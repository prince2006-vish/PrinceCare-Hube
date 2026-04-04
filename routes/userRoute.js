import express from "express";
import {
  getAllUser,
  getLoginUser,
  getStats,
  getUserDetails,
  updatePassword,
  updateUser,
  userLogin,
  userRegister,
} from "../controllers/userController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
import upload from "../middlewares/multer.js";

const router = express();

//register || post
router.post("/register", userRegister);

//login || post
router.post("/login", userLogin);

//update profile || patch
router.patch("/update/:id", userAuth, upload.single("image"), updateUser);

//update password || patch
router.patch("/update-password/:id", userAuth, updatePassword);

//GET ALL USERS || GET
router.get("/get-all", userAuth, isAdmin, getAllUser);

//GET ALL STATS || GET
router.get("/get-stats", userAuth, isAdmin, getStats);

//GET USERS DETAILS || GET
router.get("/get-user/:id", userAuth, isAdmin, getUserDetails);

//GET LOGIN DETAILS || GET
router.get("/get-login-user/:id", userAuth, getLoginUser);

export default router;
