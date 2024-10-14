import { Unauthorized } from "@/components/unauthorized";
import { NotAllowedError } from "@/error-classes";
import { UserCard } from "@/features/auth/components/user-card";
import { getSelfRole } from "@/features/auth/utils/get-session";
import { checkAdminPermission } from "@/features/auth/utils/role";
import prisma from "@/prisma";

export const dynamic = "force-dynamic";

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	// FIXME:
	const role = await getSelfRole();
	if (role !== "ADMIN") throw new NotAllowedError();

	const users = await prisma.users.findMany({
		select: {
			id: true,
			username: true,
			role: true,
			Profile: true,
		},
	});

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
