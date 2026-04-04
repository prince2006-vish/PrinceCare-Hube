import express from "express";
import testRoutes from "./routes/testRoutes.js";
import dotenv from "dotenv";
import "colors";
import morgan from "morgan";
import cors from "cors";
import { connect } from "mongoose";
import connectsDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

import webMessageRoutes from "./routes/webMessageRoutes.js";
// import {bgCyan} from 'colors';

//coning env var
dotenv.config();

//database
connectsDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/appointment", appointmentRoutes);
app.use("/api/v1/webmessage", webMessageRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Node Server Running</h1>");
});

//port
const PORT = process.env.PORT || 5000;

//run server
app.listen(PORT, () => {
  console.log(
    `Node Server Running in ${process.env.NODE_ENV} Mode on Port ${PORT}`.bgCyan
      .white
  );
});
