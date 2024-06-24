import { LoadingTable } from "@/components/table/loading-table";
import { AllContents } from "@/features/blog/components/all-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

// FIXME:
export const metadata: Metadata = {
	title: "All | Dump",
	description: "Dump blog data to GitHub",
};

export default function Home() {
	return (
		// TODO: header & description
		<div className="w-full">
			<Suspense fallback={<LoadingTable />}>
				<AllContents />
			</Suspense>
		</div>
	);
}
