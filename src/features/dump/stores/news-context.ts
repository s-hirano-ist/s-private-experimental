import { atom } from "jotai";

export type NewsContext = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
	category: string;
};

export const newsContext = atom<NewsContext[] | undefined>(undefined);
