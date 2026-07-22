<template>
  <div class="loader-container">
    <div class="spinner"></div>
    <p>Загрузка...</p>
  </div>
</template>

<style scoped lang="scss">
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e0e0e0;
    border-top-color: #409eff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  p {
    margin-top: 15px;
    color: #666;
    font-size: 16px;
  }
}
</style>
