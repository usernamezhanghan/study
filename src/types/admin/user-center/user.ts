import { PageRequest } from '@/types/common/page';

export interface IBaseUser {
  id?: string;
  fullName: string;
  loginName: string;
  phoneNum: string;
}

export interface IEditUser extends IBaseUser {
  roleType: string;
}

export interface IUser extends IBaseUser {
  createTime: string;
  creatorName: string;
  status: string;
  roleType: string;
  role?: string;
}

export class PageSearchRequest extends PageRequest {
  keyword: string | null = null;
  status: string | null = null;
  begin: string | null = null;
  end: string | null = null;
}

export class EditUser implements IEditUser {
  fullName = '';
  loginName = '';
  phoneNum = '';
  roleType = 'Operator';
}
