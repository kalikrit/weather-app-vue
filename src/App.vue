<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <footer class="version">Версия {{ version }}</footer>
</template>

<script setup lang="ts">
import { VERSION } from "@/version";
const version = VERSION;
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.version {
  text-align: center;
  margin-top: 30px;
  font-size: 12px;
  color: #999;
}
</style>
