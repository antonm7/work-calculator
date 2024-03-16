import { checkIfWeekend } from '@/helpers';
import { ShiftObject } from '../ShiftSelector';
import { useStore } from '@/store';
import { calculateDailySalary } from '@/helpers/Calculations/main';
import translations from '@/locales/he';

interface Props {
	finalArray: ShiftObject[];
}
export const FinalCalculation: React.FC<Props> = ({ finalArray }) => {
	const { morning, day, night, weekendValue } = useStore((state) => state);

	const final_calculation = () => {
		let f = { hours: 0, salary: 0 };
		for (let i = 0; i < finalArray.length; i++) {
			const current = finalArray[i];

			const salary = calculateDailySalary(
				current.date,
				current.morning ? 8 : 0,
				current.day ? 8 : 0,
				current.night ? 8 : current.halfNight ? 6 : 0,
				{ morning, day, night },
				checkIfWeekend(current.date, { morning, day, night }),
				weekendValue
			);
			f.hours += current.morning ? 8 : 0;
			f.hours += current.day ? 8 : 0;
			f.hours += current.night ? 8 : 0;
			f.hours += current.halfNight ? 6 : 0;
			f.salary += salary.salary;
		}
		return f;
	};

	const { hours, salary } = final_calculation();

	return (
		<div className="pt-4">
			<h1 className="font-bold text-xl">
				{translations.TotalHours}: {hours}
			</h1>
			<h1 className="font-bold text-xl">
				{translations.MonthlySalary}: {salary.toLocaleString()}₪
			</h1>
		</div>
	);
};
