import express from "express";
import {
  createMessage,
  deleteWebMessage,
  getAllMessage,
} from "../controllers/webMessageController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
const router = express.Router();

//create message || post
router.post("/create", createMessage);

//get all message || post
router.get("/get-all", getAllMessage);

//delete msg || delete
router.delete("/delete/:id", userAuth, isAdmin, deleteWebMessage);

export default router;
