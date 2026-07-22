export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  cityName: string;
  sunrise: number; // <-- добавляем
  sunset: number; // <-- добавляем
  dayLength: string; // <-- добавляем
}

export interface OpenWeatherResponse {
  weather: Array<{
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    sunrise: number;
    sunset: number;
  };
}
