import { Router } from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/usersController";

const router = Router();

// Full CRUD operations for users.
// My final approach reads users using the Firebase SDK
// to showcase live updates from the Firebase Realtime Database.

//Get user by id method
router.get("/:id", getUser);

//Get all users method
router.get("/", getAllUsers);

//Create user method
router.post("/", createUser);

//Update user method
router.put("/:id", updateUser);

//Delete user method
router.delete("/:id", deleteUser);

export default router;
