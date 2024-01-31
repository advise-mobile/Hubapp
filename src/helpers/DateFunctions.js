import moment from 'moment';
import 'moment/locale/pt-br';

export const DateCurrent = moment();
export const CurrentTimeEN = moment().format('YYYY-MM-DD H:mm:ss');
export const FormatDateEN = date => moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
export const FormatFullDateEN = date => moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + "T00:00:00";
export const FormatFinalDateEN = date => moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + "T23:59:59";
export const FormatInitialDateEN = date => moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + " 00:00:00";
export const FormatDateBR = date => moment(date).format('DD/MM/YYYY');
export const FormatDateInFull = date => moment(date).format('LL');
export const isBefore = date => moment().isBefore(date);

export const isSameDate = (date1, date2) =>
  moment(date1, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
  moment(date2, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');

export const isSameDateTime = (date1, date2) =>
  moment(date1, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss') ===
  moment(date2, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');

export const GetMonthPeriod = () => {
  return {
    startOfMonth : moment().startOf('month').format('YYYY-MM-DD')+ "T00:00:00",
    endOfMonth: moment().endOf('month').format('YYYY-MM-DD')+ "T23:59:59",
  }
} 

export const GetToday = () => {
  return {
    startDay: moment().format("YYYY-MM-DD") + "T00:00:00",
    endOfDay: moment().format("YYYY-MM-DD")+ "T23:59:59",
  } 
} 

export const GetWeekPeriod = () => {
  return {
    startOfWeek: moment().day(0).format('YYYY-MM-DD') + "T00:00:00",
    endOfWeek:moment().day(6).format('YYYY-MM-DD')+ "T23:59:59",
  } 
}