"use server";
import { StatusCodeView } from "@/components/status-code-view";
import { NotAllowedError } from "@/error-classes";
import { getSelfRole } from "@/features/auth/utils/get-session";
import type { ContentsContext } from "@/features/dump/stores/contents-context";
import { DumpTable } from "@/features/update-status/components/dump-table";
import prisma from "@/prisma";

export async function ContentsTable() {
	try {
		// FIXME: hasAdminRoleOrThrow関数を作る
		const role = await getSelfRole();
		if (role !== "ADMIN") throw new NotAllowedError();

		const contents = await prisma.contents.findMany({
			select: {
				id: true,
				title: true,
				quote: true,
				url: true,
				status: true,
			},
		});

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
