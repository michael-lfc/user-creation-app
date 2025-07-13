// users.js (controller)

import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const router = express.Router();

// POST /users - Create a new user with hashed password
router.post("/", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      age,
      password: hashedPassword, // store hashed password
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
        // password intentionally excluded
      },
    });
  } catch (err) {
    console.error("[POST /users error]:", err.message);
    if (err.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
});

// GET /users - Fetch all users (excluding passwords)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("[GET /users error]:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET /users/:id - Fetch single user by ID (excluding password)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("[GET /users/:id error]:", err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// DELETE /users/:id - Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error("[DELETE /users/:id error]:", err.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// PUT /users/:id - Update a user's details
router.put("/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("[PUT /users/:id error]:", err.message);
    res.status(500).json({ error: "Failed to update user" });
  }
});


export default router;
