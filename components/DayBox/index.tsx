import { getDayName } from '@/helpers';
import { ShiftObject } from '../ShiftSelector';
import styles from './index.module.scss';

interface Props {
	handleDayClick: (day: number) => void;
	finalArray: ShiftObject[];
	day: number;
	month: number;
	year: number;
	isIncluded: (day: number) => boolean;
}

export const DayBox: React.FC<Props> = ({
	handleDayClick,
	finalArray,
	day,
	isIncluded,
	month,
	year,
}) => {
	const now = new Date();

	const recieveFinalObject = (day: number) => {
		return finalArray.filter((m) => m.date === day)[0];
	};

	return (
		<div
			onClick={() => handleDayClick(day)}
			className={`${styles.day} ${
				!isIncluded(day) ? 'hover:bg-gray-400' : ''
			} sm:w-48  w-40 h-36 p-2 ${isIncluded(day) ? 'bg-green-200' : 'bg-gray-200'}`}
		>
			<h3 className="font-bold">
				{getDayName(year, month, day)} - {day}
			</h3>
			<div>
				{recieveFinalObject(day) ? (
					<div>
						<p>{recieveFinalObject(day).morning ? '6:00-14:00' : ''}</p>
						<p>{recieveFinalObject(day).day ? '14:00-22:00' : ''}</p>
						<p>{recieveFinalObject(day).night ? '22:00-6:00' : ''}</p>
						<p>{recieveFinalObject(day).halfNight ? '22:00-4:00' : ''}</p>
					</div>
				) : (
					<p></p>
				)}
			</div>
		</div>
	);
};
