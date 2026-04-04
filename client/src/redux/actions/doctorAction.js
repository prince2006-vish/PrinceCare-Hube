import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

//get all Doctor
export const getAllDoctor = createAsyncThunk(
  "doctor/getAllDoctors",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/doctor/get-all");
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "get all doctor error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//get doctor details
export const getDoctorDetails = createAsyncThunk(
  "doctor/getDoctorDetails",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/doctor/get-details/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "doctor details error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//add Doctor
export const addDoctor = createAsyncThunk(
  "doctor/AddDoctor",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/doctor/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Add new doctor error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//update Doctor
export const updateDoctor = createAsyncThunk(
  "doctor/updateDoctor",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await API.patch(`/doctor/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "update doctor error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//delete Doctor
export const deleteDoctor = createAsyncThunk(
  "doctor/deleteDoctor",
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/doctor/delete/${id}`);

      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "delete doctor error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//update status Doctor
export const updateStatus = createAsyncThunk(
  "doctor/updateStatus",
  async ({ id, availableStatus }, thunkAPI) => {
    try {
      const res = await API.patch(
        `/doctor/update-status/${id}`,
        availableStatus,
      );

      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "update status Doctor error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);
