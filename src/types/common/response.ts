export interface IResponseData<T = any> {
  code: string;
  msg: string;
  msgCode: string;
  data: T;
}
