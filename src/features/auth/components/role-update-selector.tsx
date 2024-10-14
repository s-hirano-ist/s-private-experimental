"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ROLES } from "@/constants";
import { changeRole } from "@/features/auth/actions/change-role";
import { useToast } from "@/hooks/use-toast";
import type { Role } from "@prisma/client";
import { useState } from "react";

type Props = {
	userId: string;
	role: Role;
};

export function RoleUpdateSelector({ userId, role }: Props) {
	const { toast } = useToast();

	const [value, setValue] = useState<Role>(role);

	async function handleScopeChange(value: Role) {
		const response = await changeRole(userId, value);
		if (!response.success) {
			toast({
				variant: "destructive",
				description: response.message,
			});
			return;
		}
		toast({
			variant: "default",
			description: response.message,
		});
		setValue(value);
	}

	return (
		<Select value={value} onValueChange={handleScopeChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{ROLES.map((role) => (
					<SelectItem key={role} value={role}>
						{role}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
