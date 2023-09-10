import ajax from '@/utils/ajax';
import type { IPage } from '@/types/common/page';
import type { IEditUser, IUser, PageSearchRequest } from '@/types/admin/user-center/user';
import { type IId } from '@/types/common/common';

export async function getUsers(data: PageSearchRequest) {
  return await ajax<IPage<IUser>>({
    url: '/api/v1/admin/user/page',
    method: 'get',
    params: data
  });
}

export async function getUserDetail(data: IId) {
  return await ajax<IEditUser>({
    url: '/api/v1/admin/user/edit',
    method: 'get',
    params: data
  });
}

export async function addUser(data: IEditUser) {
  return await ajax({
    url: '/api/v1/admin/user/add',
    method: 'post',
    data
  });
}

export async function updateUser(data: IEditUser) {
  return await ajax({
    url: '/api/v1/admin/user/update',
    method: 'post',
    data
  });
}

export async function deleteUser(data: IId) {
  return await ajax({
    url: '/api/v1/admin/user/delete',
    method: 'post',
    data
  });
}

export async function disableUser(data: IId) {
  return await ajax({
    url: '/api/v1/admin/user/disable',
    method: 'post',
    data
  });
}

export async function enableUser(data: IId) {
  return await ajax({
    url: '/api/v1/admin/user/enable',
    method: 'post',
    data
  });
}

export async function resetPwd(data: IId) {
  return await ajax({
    url: '/api/v1/admin/user/resetPwd',
    method: 'post',
    data
  });
}
