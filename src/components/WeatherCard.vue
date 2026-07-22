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
        <span class="value">{{ weather.windSpeed }} км/ч</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherData } from "@/types/weather";

defineProps<{
  weather: WeatherData | null;
}>();
</script>

<style scoped lang="scss">
.weather-card {
  max-width: 400px;
  margin: 20px auto 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;

  .city-name {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .main-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 10px 0;

    .weather-icon {
      width: 80px;
      height: 80px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }

    .temperature {
      font-size: 56px;
      font-weight: 300;
      line-height: 1;
    }
  }

  .description {
    font-size: 20px;
    margin-bottom: 20px;
    text-transform: capitalize;
    opacity: 0.9;
  }

  .details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 15px;

    .detail-item {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(4px);
      padding: 12px 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      .label {
        font-size: 12px;
        opacity: 0.8;
        margin-bottom: 4px;
      }

      .value {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 16px;

    .city-name {
      font-size: 22px;
    }

    .main-info .temperature {
      font-size: 40px;
    }

    .details {
      grid-template-columns: 1fr;
      gap: 8px;
    }
  }
}
</style>
