import { createRouter, createWebHistory } from 'vue-router';
import { accountRouters } from './account';
import { adminRouters } from './admin';
import { layoutRouters } from './admin/layoutTop';

import type { IRouteConfig } from '@/types/common/router';
import { LoadingBar } from 'view-ui-plus';

const routes: IRouteConfig[] = [...accountRouters, ...adminRouters, layoutRouters];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

router.beforeEach((to) => {
  document.title = `admin-${to.meta.title}`;
  LoadingBar.start();
});

router.afterEach(() => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});
