import mongoose from "mongoose";
import 'dotenv/config';
const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected")
    })
    // console.log(process.env.MONGODB_URL)
    await mongoose.connect(`${process.env.MONGODB_URL}`);
}

export default connectDB;