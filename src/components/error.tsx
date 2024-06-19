import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
	return (
		<main>
			<div className="flex h-screen w-screen flex-col items-center justify-center space-y-4 text-center">
				<span className="block text-2xl font-extrabold">
					Internal Server Error
				</span>
				<Button variant="outline" asChild>
					<Link href="/">HOMEへ戻る</Link>
				</Button>
			</div>
		</main>
	);
}
