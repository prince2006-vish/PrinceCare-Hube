import doctorModel from "../models/doctorModel.js";
//add doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      degree,
      fee,
      about,
      gender,
      phone,
      address,
      speciality,
      experience,
    } = req.body;
    if (
      !name ||
      !email ||
      !degree ||
      !fee ||
      !about ||
      !gender ||
      !phone ||
      !address ||
      !speciality ||
      !experience ||
      !req.file
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const photoBase64 = req.file.buffer.toString("base64");
    const doctorData = {
      name,
      email,
      degree,
      fee,
      about,
      gender,
      phone,
      address,
      speciality,
      experience,
      image: photoBase64,
    };
    const doctor = new doctorModel(doctorData);
    await doctor.save();
    res.status(201).send({
      success: true,
      message: "Docter Created Successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in add Doctor API",
      error,
    });
  }
};

//get all doctor
export const getAllDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "All Doctor List",
      totalCounnt: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All Doctor API",
      error,
    });
  }
};

//get doctor details
export const getDoctorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Add vailid Doctor id",
      });
    }
    //find doctor
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "No Doctor found With this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Details Fetched Successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get Doctor Details API",
      error,
    });
  }
};

//update doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Doctor ID is required",
      });
    }

    let updateData = { ...req.body };

    // ✅ photo sirf tab add karo jab aaye
    if (req.file) {
      updateData.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in update Doctor API",
      error: error.message,
    });
  }
};

//delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Doctor ID is required",
      });
    }
    await doctorModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Doctor has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Doctor API",
      error,
    });
  }
};

//update avaialbe status
export const updateAvailableStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Doctor ID is required",
      });
    }
    const { availableStatus } = req.body;
    if (!availableStatus) {
      return res.status(404).send({
        success: false,
        message: "please Provide available status",
      });
    }
    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: { available: availableStatus } },
      { returnOriginal: false }
    );
    res.status(200).send({
      success: true,
      message: "Doctor avaialbe status has been updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update avaialbe Doctor API",
      error,
    });
  }
};
