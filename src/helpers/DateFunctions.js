import moment from 'moment';
import 'moment/locale/pt-br';

export const DateCurrent = moment();
export const CurrentTimeEN = moment().format('YYYY-MM-DD H:mm:ss');
export const FormatDateEN = date => moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
export const FormatFullDateEN = date =>
	moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T00:00:00';
export const FormatFinalDateEN = date =>
	moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T23:59:59';
export const FormatInitialDateEN = date =>
	moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00';
export const FormatDateBR = date => moment(date).format('DD/MM/YYYY');
export const FormatDateInFull = date => moment(date).format('LL');
export const isBefore = date => moment().isBefore(date);

export const isSameDate = (date1, date2) =>
	moment(date1, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
	moment(date2, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');

export const isSameDateTime = (date1, date2) =>
	moment(date1, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss') ===
	moment(date2, 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');

export const GetMonthPeriod = (onlyData = false) => {
	return {
		startOfMonth: onlyData
			? moment().startOf('month').format('YYYY-MM-DD')
			: moment().startOf('month').format('YYYY-MM-DD') + 'T00:00:00',
		endOfMonth: onlyData
			? moment().endOf('month').format('YYYY-MM-DD')
			: moment().endOf('month').format('YYYY-MM-DD') + 'T23:59:59',
	};
};

export const GetToday = (onlyData = false) => {
	return {
		startDay: onlyData
			? moment().format('YYYY-MM-DD')
			: moment().format('YYYY-MM-DD') + 'T00:00:00',
		endOfDay: onlyData
			? moment().format('YYYY-MM-DD')
			: moment().format('YYYY-MM-DD') + 'T23:59:59',
	};
};

export const GetWeekPeriod = (onlyData = false) => {
	return {
		startOfWeek: onlyData
			? moment().day(0).format('YYYY-MM-DD')
			: moment().day(0).format('YYYY-MM-DD') + 'T00:00:00',
		endOfWeek: onlyData
			? moment().day(6).format('YYYY-MM-DD')
			: moment().day(6).format('YYYY-MM-DD') + 'T23:59:59',
	};
};

export const GetYearPeriod = (onlyData = false) => {
	return {
		startOfYear: onlyData
			? moment().startOf('year').format('YYYY-MM-DD')
			: moment().startOf('year').format('YYYY-MM-DD') + 'T00:00:00',
		endOfYear: onlyData
			? moment().endOf('year').format('YYYY-MM-DD')
			: moment().endOf('year').format('YYYY-MM-DD') + 'T23:59:59',
	};
};

export const GetYearOnlyMonthsPeriod = () => {
	return {
		startOfYear: moment().startOf('year').format('YYYY-MM'),
		endOfYear: moment().endOf('year').format('YYYY-MM'),
	};
};
