import { atom } from "recoil";

// FIXME: refactor use types of prisma
export type ContentsContext = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
};

export const contentsContext = atom<ContentsContext[] | undefined>({
	key: "contents",
	default: undefined,
});
