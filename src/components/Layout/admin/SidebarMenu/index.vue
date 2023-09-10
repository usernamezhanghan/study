<template>
  <Menu
    ref="siderbarMenu"
    class="sidebar-menu"
    style="width: 228px"
    :open-names="openedNames"
    :active-name="router.currentRoute.value.name"
    @on-select="toPage"
  >
    <template
      v-for="(item, index) in menuList"
      :key="index"
    >
      <template v-if="item.children && item.children.length > 0">
        <sidebar-menu-item
          :menuItem="item"
          :key="item.name"
        ></sidebar-menu-item>
      </template>

      <template v-else>
        <MenuItem
          v-if="!item.notRequiredNav"
          :name="item.name"
        >
        <span
          class="iconfont icon-menu"
          :class="item.icon"
        ></span>
        <span class="menu-title">{{ item.meta?.title }}</span>
        </MenuItem>
      </template>
    </template>
  </Menu>
</template>

<script lang="ts" setup>
import { type PropType, watch, ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { type IRouteConfig } from '@/types/common/router';

import SidebarMenuItem from './SidebarMenuItem.vue';

import { Menu, MenuItem } from 'view-ui-plus';

defineProps({
  menuList: {
    type: Array as PropType<IRouteConfig[]>,
    default: () => {
      return [];
    }
  }
});

const openedNames = ref();
const siderbarMenu = ref();
const router = useRouter();

watch(
  () => router.currentRoute.value.name,
  () => {
    openedNames.value = router.currentRoute.value.matched.map((item: any) => {
      return item.name;
    });
    nextTick(() => {
      if (siderbarMenu.value) {
        siderbarMenu.value.updateOpened();
      }
    });
  }
);

watch(openedNames, () => {
  nextTick(() => {
    if (siderbarMenu.value) {
      siderbarMenu.value.updateOpened();
    }
  });
});

function toPage(routerName: string) {
  router.push({
    name: routerName
  });
}

onMounted(() => {
  openedNames.value = router.currentRoute.value.matched.map((item: any) => {
    return item.name;
  });
});
</script>

<style lang="scss" scoped>
.sidebar-menu {
  width: 228px;
  margin-top: 2px;
  color: #333;
  background: #fff;
  box-shadow: 0 6px 12px 0 rgba(194, 194, 194, 0.12);

  .icon-menu {
    font-size: 16px;
    color: #333;
  }

  .menu-title {
    padding-left: 10px;
    font-weight: 600;
  }
}
</style>

<style lang="scss">
.sidebar-menu {
  .ivu-menu-item {
    color: #333;

    &:hover {
      color: #333;
      background: rgba(65, 130, 250, 0.05);

      .icon-menu {
        color: #333;
      }
    }
  }

  .ivu-menu-submenu-title {
    display: flex;
    align-items: center;

    &:hover {
      color: #333;
      background: rgba(65, 130, 250, 0.05);

      .icon-menu {
        color: #333;
      }
    }
  }
}
</style>
