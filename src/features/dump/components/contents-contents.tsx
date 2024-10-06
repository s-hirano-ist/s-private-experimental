import { getUnexportedContents } from "@/apis/prisma/fetch-contents";
import { StatusCodeView } from "@/components/status-code-view";
import { getUserId } from "@/features/auth/lib/user-id";
import { ContentsStack } from "./contents-stack";

export async function ContentsContents() {
	try {
		const userId = await getUserId();
		const unexportedContents = await getUnexportedContents(userId);

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
