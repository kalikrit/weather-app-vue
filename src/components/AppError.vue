<template>
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <h3>Ошибка</h3>
    <p class="error-message">{{ message }}</p>
    <button @click="handleRetry" class="retry-button">Повторить попытку</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  (e: "retry"): void;
}>();

const handleRetry = () => {
  emit("retry");
};
</script>

<style scoped lang="scss">
.error-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 30px;
  background: #fef0f0;
  border: 1px solid #fde2e2;
  border-radius: 12px;
  text-align: center;

  .error-icon {
    font-size: 48px;
    margin-bottom: 10px;
  }

  h3 {
    color: #e74c3c;
    margin-bottom: 10px;
    font-size: 20px;
  }

  .error-message {
    color: #555;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.5;
  }

  .retry-button {
    padding: 10px 30px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #c0392b;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
