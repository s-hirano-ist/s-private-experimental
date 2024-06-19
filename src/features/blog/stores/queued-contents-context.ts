import { atom } from "recoil";

export type QueuedContent = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
	category: string;
};

export const queuedContentsContext = atom<QueuedContent[]>({
	key: "queuedContentsContext",
	default: [],
});
