<template>
  <GlobalHeader></GlobalHeader>

  <div class="admin-main">
    <SidebarMenu :menuList="menuList"></SidebarMenu>

    <div class="admin-container">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import GlobalHeader from '@/components/Layout/admin/Header/index.vue';
  import SidebarMenu from '@/components/Layout/admin/SidebarMenu/index.vue';
  import { adminRouters } from '@/router/admin';
  import type { IRouteConfig } from '@/types/common/router';

  const menuList: IRouteConfig[] = adminRouters[0].children || [];
</script>

<style lang="scss" scoped>
  .admin-main {
    display: flex;
    min-height: 100vh;
    padding-top: 56px;

    .admin-container {
      flex: 1;
      width: 0;
      margin: 12px 12px 26px;
      background-color: #fff;
    }
  }
</style>

<style lang="scss">
  @import url('@/styles/admin/layout.scss');
</style>
