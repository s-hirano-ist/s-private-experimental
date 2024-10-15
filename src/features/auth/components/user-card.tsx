"use client";
import type { Role } from "@prisma/client";
import { RoleUpdateSelector } from "./role-update-selector";

type Props = {
	user: {
		id: string;
		username: string;
		role: Role;
	};
};

export function UserCard({ user }: Props) {
	return (
		<div className="flex flex-row items-center justify-between rounded-lg border p-4">
			<div className="space-y-0.5">
				<p className="text-base font-bold text-primary">ユーザー情報</p>
				<p>{user.id}</p>
				<p>{user.username}</p>
			</div>
			<div>
				<RoleUpdateSelector userId={user.id} role={user.role} />
			</div>
		</div>
	);
}
