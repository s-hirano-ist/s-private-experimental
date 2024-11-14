"use server";
import { StatusCodeView } from "@/components/status-code-view";
import { ERROR_MESSAGES } from "@/constants";
import { hasAdminPermissionOrThrow } from "@/features/auth/utils/get-session";
import type { ContentsAtom } from "@/features/dump/stores/contents-atom";
import { DumpTable } from "@/features/update-status/components/dump-table";
import { loggerError } from "@/pino";
import prisma from "@/prisma";

export async function ContentsTable() {
	try {
		await hasAdminPermissionOrThrow();

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
			<DumpTable<ContentsAtom>
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
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "ContentsTable",
				status: 500,
			},
			error,
		);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView statusCode="500" />
			</div>
		);
	}
}
