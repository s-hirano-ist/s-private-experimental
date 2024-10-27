import { Header } from "@/components/nav/header";
import { checkSelfAuthOrRedirectToAuth } from "@/features/auth/utils/get-session";

export default async function Page() {
	await checkSelfAuthOrRedirectToAuth();
	return (
		<div className="space-y-2">
			<Header title="" />
		</div>
	);
}
