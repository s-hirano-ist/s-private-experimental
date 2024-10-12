import { StatusCodeView } from "@/components/status-code-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NotFound() {
	return (
		<div className="space-y-2">
			<StatusCodeView statusCode="404" />
			<p className="px-4 text-center text-primary-grad">
				お探しのコンテンツが見つかりませんでした。
			</p>
			<Button className="mx-auto flex flex-col">
				<Link href="/auth" scroll={false}>
					HOMEへ戻る
				</Link>
			</Button>
		</div>
	);
}
