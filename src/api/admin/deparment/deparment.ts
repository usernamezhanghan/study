import ajax from '@/utils/ajax';
import type { IPage } from '@/types/common/page';
import type { Info, PageSearchRequest,InfoTeacher } from '@/types/admin/deparment/index';

export async function getPages(data: PageSearchRequest) {
  return await ajax<IPage<Info>>({
    url: '/api/v1/admin/subject/page',
    method: 'get',
    params: data
  });
}
export async function postAddPages(data: any) {
  return await ajax({
    url: '/api/v1/admin/subject/add',
    method: 'post',
    data
  });
}
export async function postUpdate(data: any) {
  return await ajax({
    url: '/api/v1/admin/subject/update',
    method: 'post',
    data
  });
}
export async function getDetail(data: any) {
  return await ajax({
    url: '/api/v1/admin/subject/edit',
    method: 'get',
    params: data
  });
}
export async function postDeleteSubject(data: any) {
  return await ajax({
    url: '/api/v1/admin/subject/delete',
    method: 'post',
    data
  });
}
export async function postDisable(data: any) {
  return await ajax({
    url: '/api/v1/admin/subject/disable',
    method: 'post',
    data
  });
}
export async function postEnsable(data: any) {
  return await ajax({
    url: '/api/v1/admin/subject/enable',
    method: 'post',
    data
  });
}
// 讲师
export async function getTeacherPages(data: PageSearchRequest) {
  return await ajax<IPage<InfoTeacher>>({
    url: '/api/v1/admin/lecturer/page',
    method: 'get',
    params: data
  });
}
export async function postDeleteTeacher(data: any) {
  return await ajax({
    url: '/api/v1/admin/lecturer/delete',
    method: 'post',
    data
  });
}
export async function getTeacherDetail(data: any) {
  return await ajax({
    url: '/api/v1/admin/lecturer/edit',
    method: 'get',
    params: data
  });
}
export async function postAddTeacher(data: any) {
  return await ajax({
    url: '/api/v1/admin/lecturer/add',
    method: 'post',
    data
  });
}
export async function postUpdateTeacher(data: any) {
  return await ajax({
    url: '/api/v1/admin/lecturer/update',
    method: 'post',
    data
  });
}
export async function getOrganization() {
  return await ajax({
    url: '/api/v1/common/organization/list',
    method: 'get'
  });
}
export async function getSubject() {
  return await ajax({
    url: '/api/v1/common/subject/list',
    method: 'get'
  });
}
export async function getProtitle() {
  return await ajax({
    url: '/api/v1/common/protitle/list',
    method: 'get'
  });
}
export async function getTeacher() {
  return await ajax({
    url: '/api/v1/common/lecturer/list',
    method: 'get'
  });
}
export async function postTDisable(data: any) {
  return await ajax({
    url: '/api/v1/admin/lecturer/disable',
    method: 'post',
    data
  });
}
export async function postTEnsable(data: any) {
  return await ajax({
    url: '/api/v1/admin/lecturer/enable',
    method: 'post',
    data
  });
}

// 课程
export async function getCoursePages(data: any) {
  return await ajax({
    url: '/api/v1/admin/course/page',
    method: 'get',
    params: data
  });
}
export async function getCourseTypeList() {
  return await ajax({
    url: '/api/v1/common/coursetype/list',
    method: 'get'
  });
}
export async function getCourseStudentPages(data: any) {
  return await ajax({
    url: '/api/v1/admin/coursestudent/page',
    method: 'get',
    params: data
  });
}
export async function postUpdateCourseStudent(data: any) {
  return await ajax({
    url: '/api/v1/admin/coursestudent/update',
    method: 'post',
    data
  });
}
export async function postExport(data: any) {
  return await ajax({
    url: '/api/v1/admin/coursestudent/export',
    method: 'post',
    data
  });
}
export async function postDeleteStudent(data: any) {
  return await ajax({
    url: '/api/v1/admin/course/delete',
    method: 'post',
    data
  });
}
export async function getCourseDetail(data: any) {
  return await ajax({
    url: '/api/v1/admin/course/edit',
    method: 'get',
    params: data
  });
}
export async function postAddCourse(data: any) {
  return await ajax({
    url: '/api/v1/admin/course/add',
    method: 'post',
    data
  });
}
export async function postUpdateCourse(data: any) {
  return await ajax({
    url: '/api/v1/admin/course/update',
    method: 'post',
    data
  });
}