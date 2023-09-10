import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { showMessage } from './status';
import { Message } from 'view-ui-plus';
import { type IResponseData } from '@/types/common/response';
import { AdminNames } from '@/router/routerNames';
import router from '@/router';

const ajax: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 6e4
});

// 拦截请求
ajax.interceptors.request.use(
  (config: any) => {
    config.headers = config.headers || {};
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const jwt = JSON.parse(userInfo)?.jwt;

      if (jwt) {
        config.headers.Authorization = jwt;
      }
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 拦截响应
ajax.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === '1') {
      if (response.data.errorCode === '02012001') {
        localStorage.removeItem('userInfo');
        router.push({
          name: AdminNames.AccountLogin
        });
        return Promise.reject(response.data);
      }

      if (response.data.msg) {
        Message.error(response.data.msg);
      }
    }
    return response;
  },

  (error: any) => {
    const { response } = error;

    if (response) {
      Message.error(showMessage(response.status));
    } else {
      Message.error('网络连接异常，请稍后再试！');
    }

    return Promise.reject(response.data);
  }
);

export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await ajax(config);
  return res.data as IResponseData<T>;
};
