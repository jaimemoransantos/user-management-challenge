import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

export async function getZipLocationData(zipCode: string) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch weather data");
  }

  const data = response.data;
  return data;
}
