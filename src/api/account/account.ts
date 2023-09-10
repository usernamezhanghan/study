import ajax from '@/utils/ajax';

export async function login(data: any) {
  return await ajax({
    url: '/api/v1/admin/login/pwd',
    method: 'post',
    data
  });
}

export async function updatePassword(data: any) {
  return await ajax({
    url: '/api/v1/admin/user/changePwd',
    method: 'post',
    data
  });
}
