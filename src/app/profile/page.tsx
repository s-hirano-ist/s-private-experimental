import { Header } from "@/components/nav/header";
import { PAGE_NAME } from "@/constants";
import { checkAuth } from "@/features/auth/utils/role";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `MY PROFILE | ${PAGE_NAME}`,
	description: "My profile",
};

export default async function Page() {
	const session = await checkAuth();

	return (
		<>
			<Header title={`Profile of ${session.user.username}`} />
			{/* TODO: profileを追加 */}
		</>
	);
}
