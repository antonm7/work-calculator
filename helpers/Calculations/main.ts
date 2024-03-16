import { PricesObject } from '..';

class Daily {
	morning: number;
	day: number;
	night: number;
	date: number;
	prices: { morning: number; day: number; night: number };
	isWeekend: boolean;
	weekendValue: number;

	constructor(
		date: number,
		morning: number,
		day: number,
		night: number,
		pricesObject: { morning: number; day: number; night: number },
		isWeekend: boolean,
		weekendValue = 300
	) {
		this.morning = morning;
		this.day = day;
		this.night = night;
		this.date = date;
		this.prices = pricesObject;
		this.weekendValue = weekendValue;
		this.isWeekend = isWeekend;
	}

	calculate() {
		const hours = [this.morning, this.day, this.night];
		const rates = [this.prices.morning, this.prices.day, this.prices.night];
		let totalSalary = 0;

		if (this.isWeekend) {
			const multiplier = this.weekendValue / 100;
			for (let i = 0; i < hours.length; i++) {
				console.log('dsadsa', hours[i], rates[i], multiplier);
				totalSalary += hours[i] * rates[i] * multiplier;
			}
		} else {
			// If it's not a weekend, apply the standard calculation
			let totalHours = 0;
			for (let i = 0; i < hours.length; i++) {
				for (let j = 0; j < hours[i]; j++) {
					totalHours++;
					let currentRate = rates[i];
					if (totalHours >= 8 && totalHours <= 9) {
						// Apply 25% bonus
						currentRate += (currentRate * 25) / 100;
					} else if (totalHours >= 10) {
						// Apply 50% bonus
						currentRate += (currentRate * 50) / 100;
					}
					totalSalary += currentRate;
				}
			}
		}

		return totalSalary;
	}

	getFinal() {
		return {
			date: this.date,
			salary: this.calculate(),
		};
	}
}

export const calculateDailySalary = (
	date: number,
	morning: number,
	day: number,
	night: number,
	prices: PricesObject,
	isWeekend: boolean,
	weekendValue: number
) => {
	const daily = new Daily(date, morning, day, night, prices, isWeekend, weekendValue);
	return daily.getFinal();
};
