import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export type NewsAtom = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
	category: string;
};

export const newsAtom = atomWithReset<NewsAtom[] | undefined>(undefined);
