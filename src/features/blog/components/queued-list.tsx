import prisma from "@/server/db";
import { QueuedTable } from "./queued-table";

export async function QueuedList() {
	const newsDetails = await prisma.newsDetail.findMany({
		where: { exported: false },
		select: {
			title: true,
			quote: true,
			url: true,
			category: { select: { category: true } },
		},
	});
	return (
		<QueuedTable
			data={newsDetails.map((d) => {
				return {
					title: d.title,
					quote: d.quote,
					url: d.url,
					category: d.category?.category ?? "",
				};
			})}
		/>
	);
}
