import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { BadRequestError } from "../errors/BadRequestError";

const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

//Endpoint works only with 5 digits zip codes

export async function getZipLocationData(zipCode: string) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new BadRequestError("The provided ZIP returned no results");
    }
    throw new Error("Failed to fetch ZIP code data");
  }
}
