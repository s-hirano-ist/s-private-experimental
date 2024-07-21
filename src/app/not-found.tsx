import { StatusCodeView } from "@/components/status-code-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
	return (
		<main>
			<div className="flex h-screen w-screen flex-col items-center justify-center space-y-4 text-center">
				<StatusCodeView statusCode="404" />
				<Button variant="outline" asChild>
					<Link href="/">HOMEへ戻る</Link>
				</Button>
			</div>
		</main>
	);
}
