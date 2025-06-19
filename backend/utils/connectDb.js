import mongoose from "mongoose";
export const connect = async () =>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected")
  } catch (error) {
    console.log("Error in connectDb",error)
    process.exit(1)   //1 means exit with failure/error. 0 means success
  }
}
