import { PageRequest } from '@/types/common/page';

export interface Info {
  id: string;
  updateTime: string;
  updaterName: string;
  name: string;
  disabled: boolean;
}
export interface InfoTeacher {
  id: string;
  updateTime: string;
  updaterName: string;
  name: string;
  disabled: boolean;
  hospital: string;
  hospitalId: string;
  proTitle: string;
  proTitleId: string;
  subject: string;
  subjectId: string;
  description:string;
  organization:string;
  organizationId:string;
}
export interface InfoCourse {
  id: string;
  addressCodes: string[];
  catalogs:children[],
  city:string,
  code: string;
  name: string;
  district:string;
  description: string;
  detailAddress: string;
  discountType: string;
  discountedPrice: number;
  province:string;
  enrollBase: number;
  enrollBegin: string;
  enrollEnd: string;
  lecturerId:string;
  originalPrice: number ;
  reportBegin: string;
  reportEnd: string;
  reviewUrl: string;
  serviceBegin: string;
  serviceEnd: string;
  studentCount: number;
  subjectId: string;
  thumbnail:string;
  trainingBegin: string;
  trainingEnd: string;
  typeId: string;
}
export interface children {
  id: string;
  reviewUrl: string;
  name: string;
  children:[]
}
export class PageSearchRequest extends PageRequest {
  keyword: string | null = null;
  disabled: boolean | null = null;
  begin: string | null = null;
  end: string | null = null;
}
export class PageSearchCourseRequest extends PageRequest {
  keyword: string | null = null;
  status: string | null = null;
  begin: string | null = null;
  end: string | null = null;
  typeId: string | null = null;
}
export class PageSearchStudentRequest extends PageRequest {
  keyword: string | null = null;
  status: string | null = null;
  begin: string | null = null;
  end: string | null = null;
  visitResult: string | null = null;
  courseId: string | null = null;
}
export class EditInfor implements Info {
  id=  '';
  updateTime=  '';
  updaterName=  '';
  name=  '';
  disabled= false;
}
export class EditTeacher implements InfoTeacher {
  id =  '';
  updateTime=  '';
  updaterName=  '';
  name=  '';
  disabled = false;
  hospital=  '';
  hospitalId=  '';
  proTitle=  '';
  proTitleId=  '';
  subject=  '';
  subjectId=  '';
  description=  '';
  organization ='';
  organizationId ='';
}
export class EditCourse implements InfoCourse {
  id=  '';
  addressCodes=[];
  catalogs =[];
  city=  '';
  code=  '';
  name=  '';
  district=  '';
  description=  '';
  detailAddress=  '';
  discountType=  '';
  discountedPrice = 0;
  province=  '';
  enrollBase = 0;
  enrollBegin=  '';
  enrollEnd=  '';
  lecturerId=  '';
  originalPrice = 0;
  reportBegin=  '';
  reportEnd=  '';
  reviewUrl=  '';
  serviceBegin=  '';
  serviceEnd=  '';
  studentCount = 0;
  subjectId=  '';
  thumbnail=  '';
  trainingBegin=  '';
  trainingEnd=  '';
  typeId=  '';
}