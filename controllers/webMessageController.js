import webmessageModel from "../models/webMessage.js";

//create message
export const createMessage = async (req, res) => {
  try {
    const { name, contact, message } = req.body;
    if (!name || !contact || !message) {
      return res.status(402).send({
        success: false,
        message: "please Provide All Fields",
      });
    }
    const webMessage = new webmessageModel({ name, contact, message });
    webMessage.save();
    res.status(201).send({
      success: true,
      message: "Your Message Sent Successfully",
      webMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in web Message Api",
      error,
    });
  }
};

//getAll message
export const getAllMessage = async (req, res) => {
  try {
    const webMessage = await webmessageModel.find({});
    res.status(201).send({
      success: true,
      message: "all web messages",
      totalCount: webMessage.length,
      webMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all web Message Api",
      error,
    });
  }
};

//delete message
export const deleteWebMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide message id",
      });
    }
    //find message
    const webMessage = await webmessageModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Message has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete web Message Api",
      error,
    });
  }
};
