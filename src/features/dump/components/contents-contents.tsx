import { getUnexportedContents } from "@/apis/prisma/fetch-contents";
import { StatusCodeView } from "@/components/status-code-view";
import { ERROR_MESSAGES } from "@/constants";
import { auth } from "@/features/auth/lib/auth";
import { ContentsStack } from "./contents-stack";

export async function ContentsContents() {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!session || !userId) throw new Error(ERROR_MESSAGES.UNAUTHORIZED);

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
