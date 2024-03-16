'use client';

import Calendar from '@/components/MainCalendar';
import MainCalendar from '@/components/MainCalendar';
import { Prices } from '@/components/Prices';

export default function Home() {
	return (
		<main className="p-4">
			<Prices />
			<Calendar />
		</main>
	);
}
