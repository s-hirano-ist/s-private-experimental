import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
	return (
		<main>
			<div className="text-center h-screen w-screen flex flex-col justify-center items-center space-y-4">
				<span className="block font-extrabold text-2xl">
					Internal Server Error
				</span>
				<Button variant="outline" asChild>
					<Link href="/">HOMEへ戻る</Link>
				</Button>
			</div>
		</main>
	);
}
