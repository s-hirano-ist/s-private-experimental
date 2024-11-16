import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export type ContentsAtom = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
};

export const contentsAtom = atomWithReset<ContentsAtom[] | undefined>(
	undefined,
);
