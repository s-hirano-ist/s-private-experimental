import { signIn } from "@/features/auth/lib/auth";

export async function GET() {
	await signIn("github", { redirectTo: "/" });
}
