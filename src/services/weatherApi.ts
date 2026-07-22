import axios from "axios";
import type { OpenWeatherResponse } from "@/types/weather";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  params: {
    appid: process.env.VUE_APP_WEATHER_API_KEY,
    units: "metric",
    lang: "ru",
  },
});

export const getWeatherByCoords = (lat: number, lon: number) => {
  return api.get<OpenWeatherResponse>("/weather", {
    params: { lat, lon },
  });
};

export const getWeatherByCity = (city: string) => {
  return api.get<OpenWeatherResponse>("/weather", {
    params: { q: city },
  });
};
