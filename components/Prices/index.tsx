import translations from '@/locales/he';
import { useStore } from '@/store';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const Prices: React.FC = () => {
	const { morning, day, night, changeValues, changeWeekendValue, weekendValue } = useStore(
		(state) => state
	);
	const [morningValue, setMorningValue] = useState(morning);
	const [dayValue, setDayValue] = useState(day);
	const [nightValue, setNightValue] = useState(night);
	const [weekend, setWeekend] = useState(weekendValue);

	const handleMorningChange = (value: string) => {
		if (isNaN(parseInt(value))) return;
		setMorningValue(parseInt(value));
	};

	const handleDayChange = (value: string) => {
		if (isNaN(parseInt(value))) return;
		setDayValue(parseInt(value));
	};

	const handleNightChange = (value: string) => {
		if (isNaN(parseInt(value))) return;
		setNightValue(parseInt(value));
	};

	const handleWeekendChange = (value: string) => {
		if (isNaN(parseInt(value))) return;
		setWeekend(parseInt(value));
	};

	const saveTrigger = () => {
		if (morningValue !== morning) changeValues('morning', morningValue);
		if (dayValue !== day) changeValues('day', dayValue);
		if (nightValue !== night) changeValues('night', nightValue);
		if (weekend !== weekendValue) changeWeekendValue(weekend);
	};

	return (
		<div className="flex flex-row items-end flex-wrap pb-4">
			<div className="mr-12">
				<h1 className="pr-4">{translations.Morning}:</h1>
				<Input
					type="text"
					className="max-w-[4rem] "
					onChange={(e) => handleMorningChange(e.target.value)}
					value={morningValue}
				/>
			</div>
			<div className="mr-12">
				<h1 className="pr-4">{translations.Day}:</h1>
				<Input
					width={'2rem'}
					className="max-w-[4rem]"
					type="text"
					onChange={(e) => handleDayChange(e.target.value)}
					value={dayValue}
				/>
			</div>
			<div className="mr-12">
				<h1 className="pr-4">{translations.Night}:</h1>
				<Input
					type="text"
					className="max-w-[4rem] "
					onChange={(e) => handleNightChange(e.target.value)}
					value={nightValue}
				/>
			</div>
			<div>
				<h1 className="pr-4">{translations.WeekendValue}:</h1>
				<Input
					type="text"
					className="max-w-[4rem] "
					onChange={(e) => handleWeekendChange(e.target.value)}
					value={weekend}
				/>
			</div>
			<Button className="ml-4 w-24" onClick={() => saveTrigger()}>
				{translations.Edit}
			</Button>
		</div>
	);
};
