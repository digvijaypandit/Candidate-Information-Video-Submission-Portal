import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const baseURI = process.env.MONGODB_URI.replace(/\/+$/, "");
    const dbName = process.env.DB_NAME;

    const fullURI = `${baseURI}/${dbName}`;

    const connectionInstance = await mongoose.connect(fullURI);
    console.log(`MongoDB connected! DB Name: ${connectionInstance.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
