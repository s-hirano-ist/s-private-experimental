import { getAllMypage } from "@/apis/prisma/fetch-mypage";
import { StatusCodeView } from "@/components/status-code-view";
import { ContentsTable } from "@/components/table/contents-table";
import type { MypageContext } from "../stores/mypage-context";

export async function MypageTable() {
	try {
		const blog = await getAllMypage();

		return (
			<ContentsTable<MypageContext>
				data={blog.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote ?? "",
						url: d.url,
						status: d.status,
					};
				})}
				columnType="mypage"
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
