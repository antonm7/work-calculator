'use client';

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import translations from '@/locales/he';
import { Button } from '../ui/button';

interface Props {
	selected: {
		day: number;
		friday: boolean;
		saturday: boolean;
	};
	onSave: (obj: ShiftObject) => void;
	currentValues: ShiftObject;
	onCancel: () => void;
}

export type ShiftObject = {
	date: number;
	morning: boolean;
	day: boolean;
	night: boolean;
	halfNight: boolean;
};

export const ShiftSelector: React.FC<Props> = ({ selected, onSave, currentValues, onCancel }) => {
	const [morning, setMorning] = useState(false);
	const [day, setDay] = useState(false);
	const [halfNight, setHalfNight] = useState(false);
	const [night, setNight] = useState(false);

	useEffect(() => {
		if (!currentValues) return;
		setMorning(currentValues.morning);
		setDay(currentValues.day);
		setHalfNight(currentValues.halfNight);
		setNight(currentValues.night);
	}, [currentValues]);

	const handle_select = (shift: string) => {
		if (shift === 'morning') {
			if (morning) {
				setMorning(false);
			} else {
				if ((halfNight && day) || (night && day) || day) return;
				setMorning(true);
			}
		} else if (shift === 'day') {
			if (day) {
				setDay(false);
			} else {
				if ((morning && halfNight) || (morning && night) || day) return;
				setDay(true);
			}
		} else if (shift === 'halfNight') {
			if (halfNight) {
				setHalfNight(false);
			} else {
				if ((morning && day) || (night && day) || (night && morning) || night) return;
				setHalfNight(true);
			}
		} else {
			if (night) {
				setNight(false);
			} else {
				if ((morning && day) || (morning && halfNight) || (halfNight && day) || halfNight) return;
				setNight(true);
			}
		}
	};

	return (
		<div className="flex flex-col">
			<h1>
				{translations.Select_Your_Shifts}
				{selected.day}
			</h1>
			<button
				className={`py-2 rounded-xl my-2 ${morning ? styles.selectedShift : 'bg-gray-200'}`}
				onClick={() => handle_select('morning')}
			>
				7:00 - 15:00
			</button>
			<button
				className={`py-2 rounded-xl my-2  ${day ? styles.selectedShift : 'bg-gray-200'}`}
				onClick={() => handle_select('day')}
			>
				15:00 - 23:00
			</button>
			<button
				className={` py-2 rounded-xl my-2  ${night ? styles.selectedShift : 'bg-gray-200'}`}
				onClick={() => handle_select('night')}
			>
				23:00 - 7:00
			</button>
			<button
				className={` py-2 rounded-xl my-2 ${halfNight ? styles.selectedShift : 'bg-gray-200'}`}
				onClick={() => handle_select('halfNight')}
			>
				23:00 - 3:00
			</button>
			<Button
				className="m-2 -md p-2"
				onClick={() => onSave({ date: selected.day, morning, day, night, halfNight })}
			>
				Save
			</Button>
			<Button className="m-2 bg-gray-400 -md p-2" onClick={() => onCancel()}>
				Cancel
			</Button>
		</div>
	);
};
