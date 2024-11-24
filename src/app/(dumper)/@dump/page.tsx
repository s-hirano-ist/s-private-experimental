import { Unauthorized } from "@/components/unauthorized";
import { checkSelfAuthOrRedirectToAuth } from "@/features/auth/utils/get-session";
import { checkAdminPermission } from "@/features/auth/utils/role";
import { ChangeStatusButtons } from "@/features/dump/components/change-status-buttons";

export default async function Page() {
	await checkSelfAuthOrRedirectToAuth();

	const hasAdminPermission = await checkAdminPermission();

	return <>{hasAdminPermission ? <ChangeStatusButtons /> : <Unauthorized />}</>;
}
