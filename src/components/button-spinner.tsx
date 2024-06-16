import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import type { FC } from "react";

type Props = {
	numberOfRows: number;
};

export const ButtonSpinner: FC<Props> = ({ numberOfRows }) => {
	return (
		<div className="grid grid-cols-2 gap-4 w-full">
			{[...Array(numberOfRows)].map((_, key) => {
				return (
					<Button key={String(key)} variant="outline">
						<LoaderCircle className="animate-spin" />
					</Button>
				);
			})}
		</div>
	);
};
