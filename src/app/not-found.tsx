import { Header } from "@/components/nav/header";
import { StatusCodeView } from "@/components/status-code-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
	return (
		<>
			<Header title="Not found" />
			<div className="pt-32 text-center">
				<StatusCodeView statusCode="404" />
				<Button variant="outline" asChild>
					<Link href="/">HOMEへ戻る</Link>
				</Button>
			</div>
		</>
	);
}
