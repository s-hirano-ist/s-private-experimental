import { getUnexportedMypage } from "@/apis/prisma/fetch-mypage";
import { ErrorView } from "@/components/error-view";
import { MypageStack } from "./mypage-stack";

export async function MypageContents() {
	try {
		const mypage = await getUnexportedMypage();

		return (
			<MypageStack
				mypage={mypage.map((d) => {
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
				<ErrorView />
			</div>
		);
	}
}
