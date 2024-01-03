import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/bankController.js";

const router = express.Router();

// Route to get all Users
router.get("/", getAllUsers);

// Route to get a single User by ID
router.get("/:id", getUserById);

// Route to create a new User
router.post("/", createUser);

// Route to update an existing User
router.put("/:id", updateUser);

// Rout to delete a User
router.delete("/:id", deleteUser);

export default router