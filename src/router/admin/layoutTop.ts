import type { IRouteConfig } from '@/types/common/router';
import { AdminNames } from '../routerNames';

export const layoutRouters: IRouteConfig =
  {
    path: '/',
    meta: { title: '顶部' },
    component: () => import('@/components/Layout/admin/headerTop.vue'),
    children: [
      {
        path: 'cc/course/reg',
        name: AdminNames.ContentCenterCourseRegister,
        meta: { title: '报名列表' },
        component: () => import('@/views/admin/content-center/course/register.vue')
      }
    ]
  }
 
  
