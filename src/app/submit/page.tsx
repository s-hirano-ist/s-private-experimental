import { Header } from "@/components/nav/header";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Submit | Dump",
	description: "Dump blog data to GitHub",
};

export default function Page() {
	return (
		<>
			<Header title="SUBMIT" description="データのバッチ送信" />
			<div className="p-4">TODO: SUBMIT DATA</div>
		</>
	);
}
