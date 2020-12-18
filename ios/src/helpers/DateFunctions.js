import moment from 'moment';
import 'moment/locale/pt-br';

export const DateCurrent = moment();
export const FormatDateEN = () => moment().format('YYYY-MM-DD');
export const FormatDateBR = date => moment(date).format('DD/MM/YYYY');
export const FormatDateInFull = date => moment(date).format('LL');
export const isBefore = date => moment().isBefore(date);
export const isSameDate = (date1, date2) =>
  moment(date1, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
  moment(date2, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');

export const isSameDateTime = (date1, date2) =>
  moment(date1, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss') ===
  moment(date2, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
