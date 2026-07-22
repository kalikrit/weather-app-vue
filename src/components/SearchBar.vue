<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Введите название города"
      @keyup.enter="handleSearch"
    />
    <button @click="handleSearch" :disabled="!searchQuery.trim()">Поиск</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "search", city: string): void;
}>();

const searchQuery = ref("");

const handleSearch = () => {
  const city = searchQuery.value.trim();
  if (city) {
    emit("search", city);
    searchQuery.value = "";
  }
};
</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto 20px;

  input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
    &:focus {
      border-color: #409eff;
    }
  }

  button {
    padding: 10px 20px;
    background: #409eff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
    &:hover:not(:disabled) {
      background: #66b1ff;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
}
</style>
