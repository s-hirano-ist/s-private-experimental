import { atom } from "jotai";

export type ContentsAtom = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
};

export const contentsAtom = atom<ContentsAtom[] | undefined>(undefined);
