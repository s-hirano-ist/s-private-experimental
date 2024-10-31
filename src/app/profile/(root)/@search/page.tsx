import { checkSelfAuthOrRedirectToAuth } from "@/features/auth/utils/get-session";
import { SearchProfile } from "@/features/profile/components/search-profile";

export default async function Page() {
	await checkSelfAuthOrRedirectToAuth();

	return <SearchProfile />;
}
