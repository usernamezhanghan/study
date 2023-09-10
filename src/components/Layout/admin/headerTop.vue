<template>
  <GlobalHeader></GlobalHeader>

  <div class="admin-main">
    <div class="admin-container">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from '@/components/Layout/admin/Header/index.vue';
</script>

<style lang="scss" scoped>
.admin-main {
  display: flex;
  min-height: 100vh;
  padding-top: 56px;
  .admin-container {
    margin: 0 auto;
  }
}
</style>

<style lang="scss">
@import url('@/styles/admin/layout.scss');
</style>
