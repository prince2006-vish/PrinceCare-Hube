import appointmentModel from "../models/appointmentsModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

//create
export const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, amount, slotDate, slotTime } = req.body;
    if (!userId || !doctorId || !amount || !slotDate || !slotTime) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fileds",
      });
    }
    const appointment = new appointmentModel({
      userId,
      doctorId,
      slotDate,
      slotTime,
      amount,
    });
    await appointment.save();
    res.status(201).send({
      success: true,
      message: "Appointment Book Successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create appointment API",
      error,
    });
  }
};

//get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.status(200).send({
      success: true,
      message: "All Appointmenta",
      totalCount: appointments.length,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all appointment API",
      error,
    });
  }
};

//get details
export const getAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide appointment ID",
      });
    }
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "No Appointment found with this ID ",
      });
    }
    //find user & doctor
    const user = await userModel.findOne({ _id: appointment?.userId });
    const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });
    res.status(200).send({
      success: true,
      message: "Appointment details Fetched Successfully",
      appointmentDetails: {
        clientName: user?.name,
        clientPhone: user?.phone,
        clientEmail: user?.email,
        doctorName: doctor?.name,
        doctorPhone: doctor?.phone,
        doctorEmail: doctor?.email,
        bookingDate: appointment?.slotDate,
        bookingTime: appointment?.slotTime,
        amount: appointment?.amount,
        bookingStatus: appointment?.status,
        paymentMode: appointment?.payment,
        createdAt: appointment?.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get appointment details API",
      error,
    });
  }
};

//change status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide appointment ID",
      });
    }
    const { appointmentStatus } = req.body;
    if (!appointmentStatus) {
      return res.status(404).send({
        success: false,
        message: "Please provide appointment status",
      });
    }
    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { $set: { status: appointmentStatus } },
      { returnOriginal: false },
    );
    res.status(200).send({
      success: true,
      message: "Appointment Status has been Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update status appointment API",
      error,
    });
  }
};

//user appointments
export const getUserAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide appointment id",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const appointment = await appointmentModel.find({ userId: user?._id });
    res.status(200).send({
      success: true,
      message: "Your Appointments",
      totalCount: appointment.length,
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro in get user appointment API",
      error,
    });
  }
};

//get user appointment details
export const getUserAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide appointment ID",
      });
    }
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "no user found with this id",
      });
    }
    //find user & doctor
    const appointment = await appointmentModel.findOne({ userId: user?._id });
    const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });
    res.status(200).send({
      success: true,
      message: "Appointment details Fetched Successfully",
      getAppointmentDetails: {
        doctorName: doctor?.name,
        doctorPhone: doctor?.phone,
        doctorEmail: doctor?.email,
        bookingDate: appointment?.slotDate,
        bookingTime: appointment?.slotTime,
        amount: appointment?.amount,
        bookingStatus: appointment?.status,
        paymentMode: appointment?.payment,
        createdAt: appointment?.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get appointment details API",
      error,
    });
  }
};

//update user booking status
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide appointment ID",
      });
    }
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: " No appointment found with this ID",
      });
    }
    await appointment.updateOne({ $set: { status: "cancel" } });
    res.status(200).send({
      success: true,
      message: "Appointment Cancel Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in cancel appointment API",
      error,
    });
  }
};
