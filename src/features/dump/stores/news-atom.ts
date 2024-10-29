import { atom } from "jotai";

export type NewsAtom = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
	category: string;
};

export const newsAtom = atom<NewsAtom[] | undefined>(undefined);
