import { Header } from "@/components/nav/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Portfolio",
	description: "Portfolio of s-hirano-ist",
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
