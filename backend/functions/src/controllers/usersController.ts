import { Request, Response } from "express";
import { db } from "../firebase";
import { getZipLocationData } from "../services/openWeatherMapService";
import { BadRequestError } from "../errors/BadRequestError";

interface User {
  id: string;
  name: string;
  zipCode: string;
  timezone: number;
  latitude: number;
  longitude: number;
}

const usersRef = db.ref("users");

//Creates new user entry in RealtimeDB: id, name, zipCode, timezone, latitude, longitude

export const createUser = async (req: Request, res: Response) => {
  const { name, zipCode } = req.body;

  if (!name || !zipCode) {
    return res.status(400).json({
      message: "Missing required fields",
      error: "Name and zipCode must be provided in the request body",
    });
  }

  if (zipCode.length !== 5) {
    return res.status(400).json({
      message: "Invalid zip code",
      error: "Zip code must be 5 digits",
    });
  }

  try {
    const zipCodeData = await getZipLocationData(zipCode);

    const userId = db.ref().child("users").push().key;
    const user: User = {
      id: userId || "",
      name,
      zipCode,
      timezone: zipCodeData.timezone,
      latitude: zipCodeData.coord.lat,
      longitude: zipCodeData.coord.lon,
    };

    await db.ref(`users/${userId}`).set(user);

    return res.status(201).json({
      user,
      message: "User created successfully",
    });
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    if (error instanceof BadRequestError) {
      return res.status(error.statusCode).json({
        message: "ZIP code not found",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Error creating user",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
};

//Get user by id method

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userRef = usersRef.child(id);
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = snapshot.val() as User;

    return res.status(200).json({
      user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving user",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

//Get all users in an array method

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const snapshot = await usersRef.once("value");

    const usersData = snapshot.val() || {};
    const usersArray = Object.values(usersData) as User[];

    return res.status(200).json({
      users: usersArray,
      message: "User retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving users",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

//Update user method validating zip code as if it's changed,
// the user's timezone, latitude, and longitude must be updated

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, zipCode } = req.body;

  if (!name || !zipCode) {
    return res.status(400).json({
      message: "Missing required fields",
      error: "Name and zipCode must be provided in the request body",
    });
  }

  if (zipCode.length !== 5) {
    return res.status(400).json({
      message: "Invalid zip code",
      error: "Zip code must be 5 digits",
    });
  }

  try {
    const userRef = usersRef.child(id);

    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = snapshot.val() as User;

    if (user.zipCode !== zipCode) {
      const zipCodeData = await getZipLocationData(zipCode);
      user.zipCode = zipCode;
      user.timezone = zipCodeData.timezone;
      user.latitude = zipCodeData.coord.lat;
      user.longitude = zipCodeData.coord.lon;
    }

    user.name = name;
    await userRef.update(user);

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(error.statusCode).json({
        message: "ZIP code not found",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Error updating user",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
};

//Delete user method

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userRef = usersRef.child(id);
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    await usersRef.child(id).remove();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
