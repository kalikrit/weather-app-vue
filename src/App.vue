<template>
  <div id="app">
    <header class="app-header">
      <div class="logo">
        <span class="weather-icon">🌤️</span>
        <h1>SkyVue</h1>
      </div>
      <p class="subtitle">Погода в реальном времени</p>
    </header>

    <!-- Поиск -->
    <SearchBar @search="handleSearch" />

    <!-- Загрузка -->
    <AppLoader v-if="loading" />

    <!-- Ошибка -->
    <AppError v-else-if="error" :message="error" @retry="handleRetry" />

    <!-- Данные погоды -->
    <WeatherCard v-else-if="weather" :weather="weather" />

    <!-- Пустое состояние -->
    <div v-else class="placeholder">
      <p>Введите город или разрешите геолокацию</p>
    </div>

    <!-- Версия -->
    <footer class="version">Версия {{ version }}</footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherCard from "./components/WeatherCard.vue";
import AppLoader from "./components/AppLoader.vue";
import AppError from "./components/AppError.vue";
import { useWeather } from "@/composables/useWeather";
import { useGeolocation } from "@/composables/useGeolocation";
import { VERSION } from "@/version";

const {
  weather,
  loading,
  error,
  fetchWeatherByCoords,
  fetchWeatherByCity,
  resetError,
} = useWeather();
const { coords, fetchGeolocation } = useGeolocation();

const version = VERSION;

// Обработчик поиска
const handleSearch = (city: string) => {
  resetError();
  fetchWeatherByCity(city);
};

// Повтор при ошибке
const handleRetry = () => {
  resetError();
  if (coords.value) {
    fetchWeatherByCoords(coords.value.lat, coords.value.lon);
  } else {
    fetchWeatherByCity("Moscow");
  }
};

// При монтировании определяем геолокацию
onMounted(async () => {
  await fetchGeolocation();
  if (coords.value) {
    await fetchWeatherByCoords(coords.value.lat, coords.value.lon);
  } else {
    await fetchWeatherByCity("Moscow");
  }
});
</script>

<style lang="scss">
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  border-radius: 0;

  .app-header {
    text-align: center;
    padding: 20px 0 30px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;

      .weather-icon {
        font-size: 42px;
        animation: float 3s ease-in-out infinite;
      }

      h1 {
        font-size: 40px;
        font-weight: 800;
        margin: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -0.5px;
      }
    }

    .subtitle {
      margin: 5px 0 0;
      color: #7f8c8d;
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: 300;
    }
  }

  .placeholder {
    text-align: center;
    color: #999;
    padding: 40px 0;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    backdrop-filter: blur(5px);
  }

  .version {
    text-align: center;
    margin-top: 30px;
    font-size: 12px;
    color: #999;
    padding: 10px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    backdrop-filter: blur(5px);
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
}
</style>
