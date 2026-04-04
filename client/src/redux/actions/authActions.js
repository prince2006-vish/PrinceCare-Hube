import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

//login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const res = await API.post("/user/login", { email, password });
      localStorage.setItem("appData", JSON.stringify(res?.data));
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "login error";
      return thunkApi.rejectWithValue(message);
    }
  },
);

//Register
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkApi) => {
    try {
      const res = await API.post("/user/register", { name, email, password });
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Register error";
      return thunkApi.rejectWithValue(message);
    }
  },
);

//get user data
export const getUserData = createAsyncThunk("auth/getUserData", () => {
  const localData = localStorage.getItem("appData");
  const appData = JSON.parse(localData);
  return appData?.user;
});

//get token
export const loadToken = createAsyncThunk("auth/loadToken", () => {
  const localData = localStorage.getItem("appData");
  const appData = JSON.parse(localData);
  return appData?.token;
});

//get login user details
export const getLoginUserDetails = createAsyncThunk(
  "user/getLoginUserDetails",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/user/get-login-user/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "user details error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//update user
export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await API.patch(`/user/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "user user details error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//get All Appointments
export const getAllAppointments = createAsyncThunk(
  "Appointments/getAllAppointments",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/appointment/get-user-appointments/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "user appointment error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//cancel status
export const cancelStatus = createAsyncThunk(
  "Appointments/cancelStatus",
  async (id, thunkAPI) => {
    try {
      const res = await API.post(`/appointment/cancel/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "appointment cancel status error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//Reset Password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ id, oldPassword, newPassword, thunkAPI }) => {
    try {
      const res = await API.patch(`/user/update-password/${id}`, {
        oldPassword,
        newPassword,
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "update password error !";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//Book Appointment
export const bookAppointment = createAsyncThunk(
  "user/bookAppointment",
  async (bookingData, thunkAPI) => {
    try {
      const res = await API.post(`/appointment/create`, bookingData);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "update password error !";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//Send Web Message
export const sendWebMessage = createAsyncThunk(
  "user/sendWebMessage",
  async (msgData, thunkAPI) => {
    try {
      const res = await API.post(`/webmessage/create`, msgData);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "update password error !";
      return thunkAPI.rejectWithValue(message);
    }
  },
);