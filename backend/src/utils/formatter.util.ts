/**
 * util này giúp format kiểu dữ liệu bất kì thành string theo format mong muốn
 */
import moment from 'moment';
export const formatDate = (date: Date, format: string = 'HH:mm DD/MM/YYYY') => {
  return moment(date).format(format);
}
export const formatMoney = (money: number) => {
  return money.toLocaleString("vi-VN");
}