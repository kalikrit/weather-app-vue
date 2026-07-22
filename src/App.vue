<template>
  <div id="app">
    <h1>Погодное приложение</h1>

    <!-- Поиск -->
    <SearchBar @search="handleSearch" />

    <!-- Загрузка -->
    <div v-if="loading">Загрузка...</div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Данные погоды (теперь через компонент) -->
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

  .error {
    color: #e74c3c;
    text-align: center;
    padding: 20px;
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
