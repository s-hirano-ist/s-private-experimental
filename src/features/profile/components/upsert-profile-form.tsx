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
import { changeProfile } from "@/features/profile/actions/change-profile";
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

export function UpsertProfileForm({ defaultValues }: Props) {
	const { toast } = useToast();

	const form = useForm<ProfileSchema>({
		resolver: zodResolver(profileSchema),
		defaultValues: defaultValues ?? undefined,
	});

	async function onProfileSubmit(values: ProfileSchema) {
		const response = await changeProfile(values);
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
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onProfileSubmit)}
				className="space-y-8 pt-4"
			>
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
