import { atom } from "recoil";

// FIXME: refactor use types of prisma
export type NewsContext = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
	categories: { name: string };
};

export const newsContext = atom<NewsContext[] | undefined>({
	key: "news",
	default: undefined,
});
