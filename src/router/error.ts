import type { IRouteConfig } from '@/types/common/router';
import { ErrorNames } from './routerNames';

export const errorRouters: IRouteConfig[] = [
  {
    path: '/error/404',
    name: ErrorNames.Err404,
    meta: { title: '找不到页面' },
    component: () => import('@/views/error/err404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: ErrorNames.Err404 }
  }
];
