import { ref } from "vue";
import { getWeatherByCoords, getWeatherByCity } from "@/services/weatherApi";
import type { WeatherData, OpenWeatherResponse } from "@/types/weather";

export function useWeather() {
  const weather = ref<WeatherData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const cityName = ref("");

  const mapResponseToWeather = (
    data: OpenWeatherResponse,
    city?: string
  ): WeatherData => ({
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 10) / 10, // м/с с одним знаком после запятой
    description: data.weather[0]?.description || "",
    icon: data.weather[0]?.icon || "",
    cityName: city || data.name,
  });

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getWeatherByCoords(lat, lon);
      weather.value = mapResponseToWeather(response.data);
      cityName.value = weather.value.cityName;
    } catch (err: any) {
      error.value = getErrorMessage(err);
      weather.value = null;
      cityName.value = "";
    } finally {
      loading.value = false;
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    if (!city.trim()) {
      error.value = "Введите название города";
      return;
    }
    loading.value = true;
    error.value = null;
    try {
      const response = await getWeatherByCity(city.trim());
      weather.value = mapResponseToWeather(response.data);
      cityName.value = weather.value.cityName;
    } catch (err: any) {
      error.value = getErrorMessage(err);
      weather.value = null;
      cityName.value = "";
    } finally {
      loading.value = false;
    }
  };

  const resetError = () => {
    error.value = null;
  };

  const getErrorMessage = (err: any): string => {
    if (err.response) {
      const status = err.response.status;
      if (status === 404) return "Город не найден. Проверьте название.";
      if (status === 401) return "Ошибка авторизации API. Проверьте ключ.";
      if (status === 500) return "Ошибка на сервере погоды. Попробуйте позже.";
      return `Ошибка сервера (${status})`;
    } else if (err.request) {
      return "Нет ответа от сервера. Проверьте интернет-соединение.";
    } else {
      return err.message || "Произошла ошибка. Попробуйте ещё раз.";
    }
  };

  return {
    weather,
    loading,
    error,
    cityName,
    fetchWeatherByCoords,
    fetchWeatherByCity,
    resetError,
  };
}
