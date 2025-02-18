import mongoose from "mongoose";

async function connectDb() {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI as string);
    // console.log();
    console.log("mongodb connection succeeded hostName: " + result?.connection.host);
  } catch (error) {
    console.log("mongodb error: " + error);
    process.exit(1);
  }
}

export default connectDb;
