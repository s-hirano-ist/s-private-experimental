import { getUnexportedMypage } from "@/apis/prisma/mypage";
import ErrorView from "@/components/error-view";
import { MypageStack } from "./mypage-stack";

export async function MypageContents() {
	try {
		const newsDetails = await getUnexportedMypage();

		return (
			<MypageStack
				mypage={newsDetails.map((d) => {
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
