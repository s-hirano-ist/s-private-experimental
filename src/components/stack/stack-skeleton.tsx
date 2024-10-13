import { SKELETON_STACK_SIZE } from "@/constants";
import { SmallCardSkeleton } from "./small-card-skeleton";

export function StackSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:gap-4">
			{[...Array(SKELETON_STACK_SIZE)].map((_, index) => (
				<SmallCardSkeleton key={String(index)} />
			))}
		</div>
	);
}
