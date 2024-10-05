import { getUnexportedContents } from "@/apis/prisma/fetch-contents";
import { StatusCodeView } from "@/components/status-code-view";
import { MypageStack } from "./contents-stack";

export async function ContentsContents() {
	try {
		const mypage = await getUnexportedContents();

		return (
			<MypageStack
				mypage={mypage.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote ?? "",
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
