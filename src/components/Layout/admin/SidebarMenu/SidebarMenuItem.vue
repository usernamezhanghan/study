<template>
  <Submenu :name="menuItem.name" class="sidebar-sub">
    <template #title>
      <span class="iconfont icon-menu" :class="menuItem.icon"></span>
      <span class="menu-title">{{ menuItem.meta?.title }}</span>
    </template>
    <template v-for="(item, index) in menuItem.children" :key="index">
      <template v-if="item.children && item.children.length === 1">
        <sidebar-menu-item :menuItem="item"></sidebar-menu-item>
      </template>
      <template v-else>
        <MenuItem v-if="!item.notRequiredNav" :name="item.name">
          <span class="menu-title">{{ item.meta?.title }}</span>
        </MenuItem>
      </template>
    </template>
  </Submenu>
</template>

<script lang="ts" setup>
  import { type PropType } from 'vue';
  import { type IRouteConfig } from '@/types/common/router';

  import { Submenu, MenuItem } from 'view-ui-plus';

  defineProps({
    menuItem: {
      type: Object as PropType<IRouteConfig>,
      default: () => {
        return {};
      }
    }
  });
</script>

<style lang="scss" scoped>
  .sidebar-sub {
    .icon-menu {
      font-size: 16px;
      color: #333;

      &:hover {
        color: #4182fa;
      }
    }

    .menu-title {
      padding-left: 10px;
      font-weight: 600;
    }
  }
</style>

<style lang="scss">
  .sidebar-sub {
    .ivu-menu-item {
      display: flex;
      align-items: center;
    }

    .ivu-menu {
      .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: #4182fa;
        background: rgba(65, 130, 250, 0.05);

        &::after {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          display: block;
          width: 2px;
          background: #4182fa;
          content: '';
        }
      }
    }
  }
</style>
