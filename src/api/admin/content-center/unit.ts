import ajax from '@/utils/ajax';
import type { IPage } from '@/types/common/page';
import type { Info, PageSearchRequest } from '@/types/admin/content-center/unit';

export async function getPages(data: PageSearchRequest) {
  return await ajax<IPage<Info>>({
    url: '/api/v1/admin/organization/page',
    method: 'get',
    params: data
  });
}
export async function postAddPages(data: any) {
  return await ajax({
    url: '/api/v1/admin/organization/add',
    method: 'post',
    data
  });
}
export async function postUpdate(data: any) {
  return await ajax({
    url: '/api/v1/admin/organization/update',
    method: 'post',
    data
  });
}
export async function getDetail(data: any) {
  return await ajax({
    url: '/api/v1/admin/organization/edit',
    method: 'get',
    params: data
  });
}
export async function postDeleteSubject(data: any) {
  return await ajax({
    url: '/api/v1/admin/organization/delete',
    method: 'post',
    data
  });
}
export async function postDisable(data: any) {
  return await ajax({
    url: '/api/v1/admin/organization/disable',
    method: 'post',
    data
  });
}
export async function postEnsable(data: any) {
  return await ajax({
    url: '/api/v1/admin/organization/enable',
    method: 'post',
    data
  });
}
