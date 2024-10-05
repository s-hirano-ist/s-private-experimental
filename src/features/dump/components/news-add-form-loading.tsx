import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsAddFormLoading() {
	return (
		<div className="space-y-4 p-4">
			<div className="space-y-1">
				<Label htmlFor="category">カテゴリー</Label>
				<Skeleton className="h-9 " />
			</div>
			<div className="space-y-1">
				<Label htmlFor="title">タイトル</Label>
				<Skeleton className="h-9 " />
			</div>
			<div className="space-y-1">
				<Label htmlFor="quote">ひとこと</Label>
				<Skeleton className="h-[60px] " />
			</div>
			<div className="space-y-1">
				<Label htmlFor="url">URL</Label>
				<Skeleton className="h-9 " />
			</div>
			<Skeleton className="h-9 " />
		</div>
	);
}
