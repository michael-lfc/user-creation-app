// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("[database]: connected to db");
  } catch (err) {
    console.warn(`[database error]: ${err.message}`);
  }
};

export { dbConnect, mongoose };
