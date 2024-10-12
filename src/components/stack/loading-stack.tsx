import { LOADING_STACK_SIZE } from "@/constants";
import { DumpLoadingCard } from "./dump-card";

export function LoadingStack() {
	return (
		<div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:gap-4">
			{[...Array(LOADING_STACK_SIZE)].map((_, index) => (
				<DumpLoadingCard key={String(index)} />
			))}
		</div>
	);
}
