import React, { useCallback, useEffect, useState } from 'react';
import { ShiftObject, ShiftSelector } from '../ShiftSelector';
import { FinalCalculation } from '../FinalCalculation';
import { DayBox } from '../DayBox';
import { getMonthName } from '@/helpers';
import { Button } from '../ui/button';

type Selected = {
	day: number;
	friday: boolean;
	saturday: boolean;
};

export type DailySalary = {
	date: number;
	salary: number;
};

const activeMonth = (current: boolean) => {
	const now = new Date();
	let year = now.getFullYear();
	let month = now.getMonth(); // Note: January is 0, December is 11

	if (!current) {
		// If the current month is January and we want the previous month, we need to go back to December of the previous year.
		if (month === 0) {
			month = 11; // Set to December
			year--; // Decrement the year
		} else {
			// For any other month, just decrement the month
			month--;
		}
	}

	// Adjust the month to be human-readable (1 for January, 12 for December)
	month + 1;

	return { month, year };
};

export default function Calendar() {
	const [selected, setSelected] = useState<null | Selected>(null);
	const [finalArray, setFinalArray] = useState<ShiftObject[]>([]);
	const [final, setFinal] = useState<boolean>(false);
	const [activeMonthValue, setActiveMonthValue] = useState(true);

	const { month, year } = activeMonth(activeMonthValue);

	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	const handleDayClick = (day: number) => {
		if (selected) return;
		const clickedDate = new Date(year, month, day);
		const dayOfWeek = clickedDate.getDay();

		setSelected({ day, friday: dayOfWeek === 5, saturday: dayOfWeek === 6 });
	};

	const isIncluded = useCallback(
		(day: number) => {
			return finalArray.filter((m) => m.date === day).length >= 1;
		},
		[finalArray]
	);

	const save_method = (obj: ShiftObject) => {
		if (isIncluded(obj.date)) {
			const removed = finalArray.filter((m) => m.date !== obj.date);
			setFinalArray([...removed]);
			setSelected(null);
			return;
		}
		if (!obj.morning && !obj.day && !obj.night && !obj.halfNight) {
			setFinalArray((old) => old.filter((m) => m.date !== obj.date));
		} else {
			setFinalArray((old) => [...old, obj]);
		}
		setSelected(null);
	};

	return (
		<>
			{!selected ? (
				<>
					<div className="flex justify-center items-center">
						{activeMonthValue ? (
							<span
								className="w-0 justify-self-start mr-auto whitespace-nowrap"
								onClick={() => setActiveMonthValue(false)}
							>
								חודש קודם
							</span>
						) : (
							<span
								className="w-0 justify-self-start mr-auto whitespace-nowrap"
								onClick={() => setActiveMonthValue(true)}
							>
								חודש הבא
							</span>
						)}
						<h1 className="text-2xl font-bold text-center pb-4 mr-auto">{getMonthName(month)}</h1>
					</div>
					<div className="flex sm:justify-start justify-center flex-wrap gap-4">
						{daysArray.map((day) => (
							<DayBox
								month={month}
								year={year}
								handleDayClick={(day) => handleDayClick(day)}
								finalArray={finalArray}
								key={day}
								isIncluded={isIncluded}
								day={day}
							/>
						))}
					</div>
				</>
			) : null}
			<div className="flex flex-col justify-center items-center w-56 ml-auto mr-auto">
				<div>
					{selected ? (
						<ShiftSelector
							currentValues={finalArray.filter((o) => o.date === selected.day)[0]}
							onSave={(obj) => save_method(obj)}
							selected={selected}
							onCancel={() => setSelected(null)}
						/>
					) : null}
				</div>
				{!selected ? (
					<Button className="w-36 mt-4" onClick={() => setFinal(true)}>
						Calculate
					</Button>
				) : null}
				{final ? <FinalCalculation finalArray={finalArray} /> : null}
			</div>
		</>
	);
}
