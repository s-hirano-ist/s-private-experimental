import { Header } from "@/components/nav/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Book reviews | Contents",
	description: "Private book reviews",
};

export default function Page() {
	return (
		<>
			<Header title="Book reviews" />
		</>
	);
}
