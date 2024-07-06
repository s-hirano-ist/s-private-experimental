import { Header } from "@/components/nav/header";
import { SubmitButtons } from "@/features/blog/components/submit-buttons";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Mypage | Dump",
	description: "Dump blog data to GitHub",
};

export default function Page() {
	return (
		<>
			<Header title="Mypageへの送信" />
		</>
	);
}
