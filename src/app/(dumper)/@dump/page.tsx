import { Unauthorized } from "@/components/unauthorized";
import { checkAdminPermission } from "@/features/auth/utils/role";
import { ChangeStatusButtons } from "@/features/update-status/components/change-status-buttons";

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	return <>{hasAdminPermission ? <ChangeStatusButtons /> : <Unauthorized />}</>;
}
