import type { IRouteConfig } from '@/types/common/router';
import { AdminNames } from './routerNames';

export const accountRouters: IRouteConfig[] = [
  {
    path: '/admin',
    name: AdminNames.Account,
    component: () => import('@/views/account/components/LoginMain.vue'),
    redirect: { name: AdminNames.AccountLogin },
    children: [
      {
        path: 'login',
        name: AdminNames.AccountLogin,
        meta: { title: '登录' },
        component: () => import('@/views/account/login.vue')
      }
    ]
  }
];
