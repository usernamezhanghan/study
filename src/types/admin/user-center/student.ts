import { PageRequest } from '@/types/common/page';

export interface IStudent {
  id: string;
  name: string;
  phoneNum: string;
  courseType?: string;
  wxAvatar: string;
  wxId: string;
  wxOpenId: string;
  wxName: string;
  createTime: string;
}

export interface ICourse {
  courseId: string;
  courseName: string;
  createTime: string;
}

export interface IStudentDetail extends IStudent {
  department: string;
  hospital: string;
  proTitle: string;
  courses: ICourse[];
}

export class PageSearchRequest extends PageRequest {
  keyword: string | null = null;
  courseTypeId: string | null = null;
  begin: string | null = null;
  end: string | null = null;
}
