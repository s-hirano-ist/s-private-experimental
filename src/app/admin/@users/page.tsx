import { Unauthorized } from "@/components/unauthorized";
import { UserCard } from "@/features/auth/components/user-card";
import { checkAdminPermission } from "@/features/auth/utils/role";
import prisma from "@/prisma";

export const dynamic = "force-dynamic";

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	const users = await prisma.users.findMany({
		select: {
			id: true,
			username: true,
			role: true,
			Profile: true,
		},
	});

	return (
		<div className="px-2">
			{hasAdminPermission ? (
				<div className="space-y-2">
					{users.map((user) => (
						<UserCard key={user.id} user={user} />
					))}
				</div>
			) : (
				<Unauthorized />
			)}
		</div>
	);
}
