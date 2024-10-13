"use client";
import { Switch } from "@/components/ui/switch";
import { toggleScope } from "@/features/profile/actions/toggle-scope";
import { useToast } from "@/hooks/use-toast";
import type { Scope } from "@prisma/client";
import { useState } from "react";

type Props = {
	scope: Scope;
};

export function ScopeUpdateSwitch({ scope }: Props) {
	const { toast } = useToast();

	const [switchChecked, setSwitchChecked] = useState<boolean>(
		scope === "PUBLIC",
	);

	async function handleScopeChange(checked: boolean) {
		const state = await toggleScope(checked);
		if (!state.success) {
			toast({
				variant: "destructive",
				description: state.message,
			});
			return;
		}
		toast({
			variant: "default",
			description: state.message,
		});
		if (checked) setSwitchChecked(true);
		else setSwitchChecked(false);
	}

	return (
		<div className="flex flex-row items-center justify-between rounded-lg border p-4">
			<div className="space-y-0.5">
				<p className="text-base font-bold text-primary">外部に投稿を公開する</p>
				<div className="hidden sm:block">
					外部に投稿を公開したい場合は、スイッチをオンにしてください。
					<br />
					プロフィールは認証済みのユーザー全員に公開されます。
				</div>
			</div>
			<div>
				<Switch checked={switchChecked} onCheckedChange={handleScopeChange} />
			</div>
		</div>
	);
}
