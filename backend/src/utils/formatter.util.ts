/**
 * util này giúp format kiểu dữ liệu bất kì thành string theo format mong muốn
 */
import moment from 'moment';
import slugify from 'slugify';
import { lowercase } from 'zod';
export const formatDate = (date: Date, format: string = 'HH:mm DD/MM/YYYY') => {
  return moment(date).format(format);
}
export const formatMoney = (money: number) => {
  return money.toLocaleString("vi-VN");
}

export const formatObjectToNeo4jSetter = (tmpName: string, obj: { [key: string] : any}) => {
  return Object.keys(obj).map((key) => `${tmpName}.${key} = $${key}`).join(", ");
}
export const formatObjectToNeo4jQuery = (tmpName: string, obj: { [key: string] : any}) => {
  return Object.keys(obj).map((key) => `${tmpName}.${key}: $${key}`).join(", ");
}
export const toNeo4jQueryKeySearch = (keyword: string) => {
  return slugify(keyword, {
    trim: true,
    lower: true,
    replacement: " "
  });
}