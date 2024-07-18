import { atom } from "recoil";

export type BlogContext = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
	category: string;
};

export const blogContext = atom<BlogContext[] | undefined>({
	key: "blog",
	default: undefined,
});
