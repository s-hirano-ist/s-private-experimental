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
import { DEFAULT_SIGN_IN_REDIRECT } from "@/constants";
import { signIn } from "@/features/auth/actions/sign-in";
import {
	type SignInSchema,
	signInSchema,
} from "@/features/auth/schemas/sign-in-schema";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function SignInForm() {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSignInSubmit(values: SignInSchema) {
		const response = await signIn(values);
		if (response.success) {
			router.push(DEFAULT_SIGN_IN_REDIRECT);
		} else {
			toast({
				variant: "destructive",
				description: response.message,
			});
		}
	}

	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSignInSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ユーザー名</FormLabel>
							<FormControl>
								<Input {...field} type="text" inputMode="text" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>パスワード</FormLabel>
							<FormControl>
								<div className="flex items-center">
									<Input {...field} type={showPassword ? "text" : "password"} />
									<Button
										onClick={handleShowPassword}
										variant="ghost"
										type="button"
									>
										{showPassword ? <EyeIcon /> : <EyeOffIcon />}
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					サインイン
				</Button>
			</form>
		</Form>
	);
}
