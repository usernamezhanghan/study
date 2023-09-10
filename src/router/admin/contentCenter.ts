import type { IRouteConfig } from '@/types/common/router';
import { AdminNames } from '../routerNames';

export const contentCenterRouters: IRouteConfig[] = [
  {
    path: 'cc',
    name: AdminNames.ContentCenter,
    meta: { title: '内容中心' },
    icon: 'icon-neirongzhongxin',
    redirect: { name: AdminNames.ContentCenterDepartment },
    component: () => import('@/components/Layout/admin/index.vue'),
    children: [
      {
        path: 'department',
        name: AdminNames.ContentCenterDepartment,
        meta: { title: '科目管理' },
        component: () => import('@/views/admin/content-center/department/index.vue')
      },
      {
        path: 'teacher',
        name: AdminNames.ContentCenterTeacher,
        meta: { title: '讲师管理' },
        component: () => import('@/views/admin/content-center/teacher/index.vue')
      },
      {
        path: 'course',
        name: AdminNames.ContentCenterCourse,
        meta: { title: '课程管理' },
        component: () => import('@/views/admin/content-center/course/index.vue')
      }
    ]
  }
];
