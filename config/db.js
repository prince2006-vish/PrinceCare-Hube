import mongoose from "mongoose";
import 'colors';

const connectsDB = async () =>{
 mongoose.connection.on('connected',()=>{
    console.log('mongoose Database connected'.bgMagenta.white)
 });
 await mongoose.connect(`${process.env.MONGO_LOCAL_URL}/doctorapp`);
}

export default connectsDB