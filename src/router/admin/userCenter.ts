import type { IRouteConfig } from '@/types/common/router';
import { AdminNames } from '../routerNames';

export const userCenterRouters: IRouteConfig = {
  path: 'uc',
  name: AdminNames.UserCenter,
  meta: { title: '用户中心' },
  icon: 'icon-gerenzhongxin',
  component: () => import('@/components/Layout/admin/index.vue'),
  redirect: { name: AdminNames.UserCenterAdminUser },
  children: [
    {
      path: 'user',
      name: AdminNames.UserCenterAdminUser,
      meta: { title: '后台用户管理' },
      component: () => import('@/views/admin/user-center/user/index.vue')
    },
    {
      path: 'member',
      name: AdminNames.UserCenterStudent,
      meta: { title: '用户管理' },
      component: () => import('@/views/admin/user-center/student/index.vue')
    }
  ]
};
