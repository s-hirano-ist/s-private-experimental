import { Header } from "@/components/nav/header";
import { SubmitButtons } from "@/features/blog/components/submit-buttons";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Submit | Dump",
	description: "Dump blog data to GitHub",
};

export default function Page() {
	return (
		<>
			<Header title="バッチ送信" />
			<div className="flex justify-center pt-8">
				<SubmitButtons />
			</div>
		</>
	);
}
