import mongoose from "mongoose";
import 'colors';

const connectsDB = async () => {

  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected".bgMagenta.white);
  });

  await mongoose.connect(process.env.MONGO_URL);

};

export default connectsDB;