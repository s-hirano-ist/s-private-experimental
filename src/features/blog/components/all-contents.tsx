import ErrorView from "@/components/error-view";
import prisma from "@/server/db";
import { AllTable } from "./all-table";

export async function AllContents() {
	try {
		const newsDetails = await prisma.newsDetail.findMany({
			select: {
				id: true,
				title: true,
				quote: true,
				url: true,
				category: { select: { category: true } },
			},
		});
		return (
			<AllTable
				data={newsDetails.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						category: d.category?.category ?? "",
					};
				})}
			/>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return (
			<div className="flex flex-col items-center">
				<ErrorView />
			</div>
		);
	}
}
