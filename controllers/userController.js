import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import appointmentModel from "../models/appointmentsModel.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).send({
        succes: false,
        message: "Please Prvoid All fields",
      });
    }
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hanedPassword = await bcrypt.hash(password, salt);
    const userDate = { name, email, password: hanedPassword };
    //save user
    const newUser = new userModel(userDate);
    const user = await newUser.save();

    res.status(201).send({
      success: true,
      message: "Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

//LOGIN

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        succes: false,
        message: "Please add email or password",
      });
    }
    //find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user Not Found",
      });
    }
    //match password
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(402).send({
        success: false,
        message: "invalid Credential",
      });
    }
    //token
    const token = JWT.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

//update user details
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "User id Not Found",
      });
    }
    const { name, phone, dob, image, gender, address } = req.body;
    const photoToBase64 = req.file && req.file.buffer.toString("base64");
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { name, dob, address, phone, gender, image: photoToBase64 },
      },
      { returnOriginal: false },
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong in update user api",
      error,
    });
  }
};

//password rest
export const updatePassword = async (req, res) => {
  try {
    //user id
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "user id not found",
      });
    }
    //req.body
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old and New password",
      });
    }
    //find user
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(402).send({
        success: false,
        message: "user not found",
      });
    }

    //check old password
    const isMatch = await bcrypt.compare(oldPassword, user?.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "incorrect old password",
      });
    }
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //update
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update password API",
      error,
    });
  }
};

//admin panel ka backend
//get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "All user",
      totalCount: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get all users API",
      error,
    });
  }
};

//Get user details & appointment details
export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please provide user id",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No user found with this id",
      });
    }
    //find appointment
    const appointments = await appointmentModel.find({ userId: user?.id });
    res.status(200).send({
      success: true,
      message: "Details Fetched Successfully",
      user,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get users details API",
      error,
    });
  }
};

//get stats
export const getStats = async (req, res) => {
  try {
    const users = await userModel.find({});
    const doctors = await doctorModel.find({});
    const appointments = await appointmentModel.aggregate([
      {
        $group: { _id: null, totalEarning: { $sum: { $toDouble: "$amount" } } },
      },
    ]);
    const total = appointments.length > 0 ? appointments[0].totalEarning : 0;
    res.status(200).send({
      success: true,
      message: "All Stats",
      stats: {
        totalUsers: users.length,
        totalDoctors: doctors.length,
        totalErning: total,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get all stats API",
      error,
    });
  }
};

//get login User
export const getLoginUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide user id!",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "no user found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login user details",

      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get all users API",
      error,
    });
  }
};
