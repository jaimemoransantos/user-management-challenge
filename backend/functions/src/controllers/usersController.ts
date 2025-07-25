import { Request, Response } from "express";
import { db } from "../firebase";
import { getZipLocationData } from "../services/openWeatherMapService";
import { BadRequestError } from "../errors/BadRequestError";

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
    const user = {
      id: userId,
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
        message: "ZIP code missing",
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
