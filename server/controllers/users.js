// controllers/users.js

import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /users - Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = await User.create({ name, email, age });
    
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("[POST /users error]:", err.message);

    if (err.code === 11000) {
    // Duplicate key error (usually for email)
    res.status(400).json({ error: "Email already exists" });
    } else {
    res.status(500).json({ error: "Failed to create user" });
    }
  }
});

// GET /users - Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.status(200).json(users);
  } catch (err) {
    console.error("[GET /users error]:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});



// ✅ GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
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

// PUT /users/:id - Update a user by ID
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
