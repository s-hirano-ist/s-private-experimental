"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileUpsert } from "@/features/profile/actions/profile-upsert";
import {
	type ProfileSchema,
	profileSchema,
} from "@/features/profile/schemas/profile-schema";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
	defaultValues: ProfileSchema | undefined;
};

export function ProfileUpsertForm({ defaultValues }: Props) {
	const { toast } = useToast();

	const form = useForm<ProfileSchema>({
		resolver: zodResolver(profileSchema),
		defaultValues: defaultValues ?? undefined,
	});

	async function onProfileSubmit(values: ProfileSchema) {
		const state = await profileUpsert(values);
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
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>名前</FormLabel>
							<FormControl>
								<Input {...field} required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>自己紹介</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="avatarUrl"
					render={({ field }) => (
						<FormItem>
							{/* FIXME: 画像のアップロードに変更 */}
							<FormLabel>アバターのURL</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="画像のアップロード機能を提供予定"
									type="url"
									inputMode="url"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					プロフィールを修正
				</Button>
			</form>
		</Form>
	);
}
