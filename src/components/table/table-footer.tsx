"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";

type Props = {
	onClickPrevious?: () => void;
	previousButtonDisabled?: boolean;
	onClickNext?: () => void;
	nextButtonDisabled?: boolean;
};
export function TableFooter({
	onClickPrevious,
	previousButtonDisabled = true,
	onClickNext,
	nextButtonDisabled = true,
}: Props) {
	return (
		<div className="flex items-center justify-end space-x-2 py-4">
			<Button
				variant="outline"
				size="sm"
				onClick={onClickPrevious}
				disabled={previousButtonDisabled}
			>
				前のページ
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={onClickNext}
				disabled={nextButtonDisabled}
			>
				次のページ
			</Button>
		</div>
	);
}
