import ajax from '@/utils/ajax';
import type { IPage } from '@/types/common/page';
import type { Info, PageSearchRequest } from '@/types/admin/content-center/rank';

export async function getPages(data: PageSearchRequest) {
  return await ajax<IPage<Info>>({
    url: '/api/v1/admin/banner/page',
    method: 'get',
    params: data
  });
}
export async function postAdd(data: any) {
  return await ajax({
    url: '/api/v1/admin/banner/add',
    method: 'post',
    data
  });
}
export async function postUpdate(data: any) {
  return await ajax({
    url: '/api/v1/admin/banner/update',
    method: 'post',
    data
  });
}
export async function getDetail(data: any) {
  return await ajax({
    url: '/api/v1/admin/banner/edit',
    method: 'get',
    params: data
  });
}
export async function postDeleteSubject(data: any) {
  return await ajax({
    url: '/api/v1/admin/banner/delete',
    method: 'post',
    data
  });
}
export async function postDisable(data: any) {
  return await ajax({
    url: '/api/v1/admin/banner/disable',
    method: 'post',
    data
  });
}
export async function postEnsable(data: any) {
  return await ajax({
    url: '/api/v1/admin/banner/enable',
    method: 'post',
    data
  });
}
export async function getCourse() {
  return await ajax({
    url: '/api/v1/common/course/list',
    method: 'get'
  });
}