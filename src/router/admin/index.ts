import type { IRouteConfig } from '@/types/common/router';
import { userCenterRouters } from './userCenter';
import { contentCenterRouters } from './contentCenter';
import { AdminNames } from '../routerNames';

export const adminRouters: IRouteConfig[] = [
  {
    path: '/',
    name: AdminNames.Admin,
    meta: { title: '后台管理' },
    component: () => import('@/components/Common/BaseEmpty.vue'),
    redirect: { name: AdminNames.ContentCenterDepartment },
    children: [...contentCenterRouters]
  }
];
