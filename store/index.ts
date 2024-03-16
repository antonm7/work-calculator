import { create } from 'zustand';

interface Store {
	morning: number;
	day: number;
	night: number;
	weekendValue: number;
	changeValues: (type: 'morning' | 'day' | 'night', value: number) => void;
	changeWeekendValue: (value: number) => void;
}

export const useStore = create<Store>((set) => ({
	morning: 47.5,
	day: 56.5,
	night: 72,
	weekendValue: 300,
	changeWeekendValue: (value) => set({ weekendValue: value }),
	changeValues: (type, value) => set((state) => ({ [type]: value })),
}));
