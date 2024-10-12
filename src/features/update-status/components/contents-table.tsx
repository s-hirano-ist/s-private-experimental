"use server";
import { getAllContents } from "@/apis/prisma/fetch-contents";
import { StatusCodeView } from "@/components/status-code-view";
import type { ContentsContext } from "@/features/dump/stores/contents-context";
import { DumpTable } from "@/features/update-status/components/dump-table";

export async function ContentsTable() {
	try {
		const contents = await getAllContents();

		return (
			<DumpTable<ContentsContext>
				data={contents.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						status: d.status,
					};
				})}
				columnType="CONTENTS"
			/>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView statusCode="500" />
			</div>
		);
	}
}
