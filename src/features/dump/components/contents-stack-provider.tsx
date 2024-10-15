"use server";
import "server-only";
import { StatusCodeView } from "@/components/status-code-view";
import { getUserId } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import { ContentsStack } from "./contents-stack";

export async function ContentsStackProvider() {
	try {
		const userId = await getUserId();
		const unexportedContents = await prisma.contents.findMany({
			where: { status: "UNEXPORTED", userId },
			select: {
				id: true,
				title: true,
				quote: true,
				url: true,
			},
			orderBy: { id: "desc" },
		});

		return (
			<ContentsStack
				contents={unexportedContents.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
					};
				})}
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
