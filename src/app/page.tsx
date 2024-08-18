import { Header } from "@/components/nav/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Notes | Contents",
	description: "Private notes",
};

export default function Page() {
	return (
		<iframe
			title="portfolio"
			src="https://s-hirano.com"
			width="100%"
			className="h-dvh border-0"
		/>
	);
}
