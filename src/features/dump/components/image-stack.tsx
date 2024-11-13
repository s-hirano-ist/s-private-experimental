import { ImageSkeleton } from "@/components/stack/image-skeleton";
import { StackSkeleton } from "@/components/stack/stack-skeleton";
import { StatusCodeView } from "@/components/status-code-view";
import { Suspense } from "react";
import { ImageContainer } from "./image-container";

type Props = {
	images: {
		id: string;
	}[];
};

export function ImageStack({ images }: Props) {
	if (images === undefined) return <StackSkeleton />;
	if (images.length === 0) return <StatusCodeView statusCode="204" />;

	return (
		<div className="grid grid-cols-4 gap-2 p-2 sm:p-4">
			{images.map(async (image) => (
				<Suspense fallback={<ImageSkeleton />} key={image.id}>
					<ImageContainer id={image.id} key={image.id} />
				</Suspense>
			))}
		</div>
	);
}
