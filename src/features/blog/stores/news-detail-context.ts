import { atom } from "recoil";

export type NewsDetailContext = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
	category: string;
};

export const newsDetailContext = atom<NewsDetailContext[]>({
	key: "newsDetails",
	default: [],
});
