// app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";

import userRouter from "./controllers/users.js";
// import postRouter from "./controllers/posts.js"; // (optional, for future extension)
// import tokenValidation from "./middlewares/tokenValidation.js"; // (optional)

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Enables parsing JSON in requests

// Routes
app.use("/users", userRouter); // Public route for creating/fetching users
// app.use("/posts", postRouter); // Optional/future use

// // Future route: Protected with token validation middleware
// app.use("/posts", tokenValidation, postRouter); // Optional/future use

app.get("/", (req, res) => {
  res.send("User Creation API is running");
});

// Start server
app.listen(PORT, () => {
  dbConnect(); // Connect to MongoDB
  console.log(`[server]: Listening on port ${PORT}`);
});
