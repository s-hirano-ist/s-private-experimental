import { getUsers } from "@/apis/prisma/fetch-user";
import { Unauthorized } from "@/components/unauthorized";
import { UserCard } from "@/features/auth/components/user-card";
import { checkAdminPermission } from "@/features/auth/utils/role";
export const dynamic = "force-dynamic";

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	const users = await getUsers();

	return (
		<>
			{hasAdminPermission ? (
				<div className="space-y-2">
					{users.map((user) => (
						<UserCard key={user.id} user={user} />
					))}
				</div>
			) : (
				<Unauthorized />
			)}
		</>
	);
}
