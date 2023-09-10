<script setup lang="ts">
  import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
  @import './assets/iconfont/iconfont.css';
  @import './styles/common.scss';
  #app {
    min-width: 1200px;
    min-height: 100vh;
    font-size: 14px;
    color: #333;
    background-color: #fafafa;
  }
</style>
