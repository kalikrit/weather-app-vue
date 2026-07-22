<template>
  <div v-if="weather" class="weather-card">
    <div class="city-name">{{ weather.cityName }}</div>
    <div class="main-info">
      <img
        :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`"
        :alt="weather.description"
        class="weather-icon"
      />
      <div class="temperature">{{ weather.temperature }}°C</div>
    </div>
    <div class="description">{{ weather.description }}</div>

    <!-- Блок с восходом/закатом -->
    <div class="sun-info">
      <div class="sun-item">
        <span class="sun-icon">🌅</span>
        <span class="sun-label">Восход</span>
        <span class="sun-time">{{ formatTime(weather.sunrise) }}</span>
      </div>
      <div class="sun-item">
        <span class="sun-icon">🌇</span>
        <span class="sun-label">Закат</span>
        <span class="sun-time">{{ formatTime(weather.sunset) }}</span>
      </div>
      <div class="sun-item">
        <span class="sun-icon">⏳</span>
        <span class="sun-label">День</span>
        <span class="sun-time">{{ weather.dayLength }}</span>
      </div>
    </div>

    <!-- Детали погоды -->
    <div class="details">
      <div class="detail-item">
        <span class="label">Ощущается как</span>
        <span class="value">{{ weather.feelsLike }}°C</span>
      </div>
      <div class="detail-item">
        <span class="label">Влажность</span>
        <span class="value">{{ weather.humidity }}%</span>
      </div>
      <div class="detail-item">
        <span class="label">Ветер</span>
        <span class="value">{{ weather.windSpeed }} м/с</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherData } from "@/types/weather";

defineProps<{
  weather: WeatherData | null;
}>();

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped lang="scss">
.weather-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  .city-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .main-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;

    .weather-icon {
      width: 80px;
      height: 80px;
    }

    .temperature {
      font-size: 48px;
      font-weight: 300;
    }
  }

  .description {
    font-size: 18px;
    color: #555;
    margin-bottom: 15px;
  }

  .sun-info {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    padding: 12px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    gap: 10px;

    .sun-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;

      .sun-icon {
        font-size: 24px;
      }
      .sun-label {
        font-size: 11px;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .sun-time {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
    }
  }

  .details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 15px;

    .detail-item {
      background: white;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;

      .label {
        font-size: 12px;
        color: #999;
      }
      .value {
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  @media (max-width: 480px) {
    .details {
      grid-template-columns: 1fr;
    }
  }
}
</style>
