export interface IPage<T> {
  total: number;
  pages: number;
  records: T[];
}

export class PageRequest {
  pageNo: number = 1;
  pageSize: number = 10;
}
