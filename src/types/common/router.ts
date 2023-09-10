import { type RouteRecordRaw } from 'vue-router';

export type IRouteConfig = RouteRecordRaw & {
  icon?: string;
  notRequiredNav?: boolean;
  children?: IRouteConfig[];
};
