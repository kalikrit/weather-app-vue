<template>
  <div id="app">
    <h1>Погодное приложение</h1>

    <!-- Компонент поиска -->
    <SearchBar @search="handleSearch" />

    <!-- Заглушка для отображения состояния -->
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="weather" class="weather-info">
      <h2>{{ weather.cityName }}</h2>
      <p>Температура: {{ weather.temperature }}°C</p>
      <p>Описание: {{ weather.description }}</p>
      <p>Влажность: {{ weather.humidity }}%</p>
      <p>Ветер: {{ weather.windSpeed }} км/ч</p>
      <img
        :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`"
        alt="иконка"
      />
    </div>
    <div v-else class="placeholder">
      <p>Введите город или разрешите геолокацию</p>
    </div>

    <!-- Версия -->
    <footer class="version">Версия {{ version }}</footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import SearchBar from "@/components/SearchBar.vue";
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

// Повтор при ошибке (пока что просто перезапрос по координатам или Москве)
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

  .weather-info {
    text-align: center;
    background: #f5f7fa;
    border-radius: 12px;
    padding: 20px;
    margin-top: 20px;
    img {
      width: 80px;
      height: 80px;
    }
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
