// models/User.js

import { mongoose } from "../config/db.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
