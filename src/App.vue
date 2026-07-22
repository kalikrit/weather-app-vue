<template>
  <div id="app">
    <h1>Погодное приложение</h1>

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
  font-family: Arial, Helvetica, sans-serif;

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }

  .placeholder {
    text-align: center;
    color: #999;
    padding: 40px 0;
  }

  .version {
    text-align: center;
    margin-top: 30px;
    font-size: 12px;
    color: #999;
  }
}
</style>
