import { Header } from "@/components/nav/header";
import { LoadingTable } from "@/components/table/loading-table";
import { AllContents } from "@/features/blog/components/all-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "All | Dump",
	description: "Dump blog data to GitHub",
};

export default function Home() {
	return (
		<>
			<Header title="全データ" />
			<Suspense fallback={<LoadingTable />}>
				<AllContents />
			</Suspense>
		</>
	);
}
