"use server";
import "server-only";
import { StatusCodeView } from "@/components/status-code-view";
import { getUserId } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import { NewsStack } from "./news-stack";

export async function NewsStackProvider() {
	try {
		const userId = await getUserId();

		const unexportedNews = await prisma.news.findMany({
			where: { status: "UNEXPORTED", userId },
			select: {
				id: true,
				title: true,
				quote: true,
				url: true,
				Category: { select: { name: true } },
			},
			orderBy: { id: "desc" },
		});

		return (
			<NewsStack
				news={unexportedNews.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						category: d.Category.name,
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
