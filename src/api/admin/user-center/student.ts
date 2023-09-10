import ajax from '@/utils/ajax';
import type { IPage } from '@/types/common/page';
import type {
  IStudent,
  IStudentDetail,
  PageSearchRequest
} from '@/types/admin/user-center/student';
import type { IBaseInfo, IId } from '@/types/common/common';

export async function getStudents(data: PageSearchRequest) {
  return await ajax<IPage<IStudent>>({
    url: '/api/v1/admin/student/page',
    method: 'get',
    params: data
  });
}

export async function getStudentDetail(data: IId) {
  return await ajax<IStudentDetail>({
    url: '/api/v1/admin/student/detail',
    method: 'get',
    params: data
  });
}

export async function getCourseTypes() {
  return await ajax<IBaseInfo[]>({
    url: '/api/v1/common/coursetype/list',
    method: 'get'
  });
}
