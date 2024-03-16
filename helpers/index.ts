import translations from '@/locales/he';

export type PricesObject = {
	morning: number;
	day: number;
	night: number;
};

export const getMonthName = (month: number) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	if (month < 0 || month > 11) {
		throw new Error('Month must be between 0 (January) and 11 (December).');
	}
	return translations[months[month] as keyof typeof translations];
};

export const checkIfWeekend = (
	date: number,
	hours: { morning: number; day: number; night: number }
) => {
	const month = new Date().getMonth();
	const year = new Date().getFullYear();

	const d = new Date(year, month, date);

	if (d.getDay() === 6) return 'full';
	if (d.getDay() === 5 && hours.morning > 0 && (hours.day > 0 || hours.night > 0)) return 'half';
	if (d.getDay() === 5 && hours.morning > 0 && (hours.day === 0 || hours.night === 0)) return 'none';

	return 'none';
};

export const getDayName = (year: number, month: number, day: number): string => {
	var date = new Date(year, month, day);
	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var dayName = dayNames[date.getDay()] as keyof typeof translations;

	return translations[dayName];
};
