"use client";
import { StackSkeleton } from "@/components/stack/stack-skeleton";
import { StatusCodeView } from "@/components/status-code-view";
import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect } from "react";
import "photoswipe/style.css";

type Props = {
	images: {
		src: string;
		width?: number | undefined;
		height?: number | undefined;
	}[];
};

export function ImageStack({ images }: Props) {
	useEffect(() => {
		const lightbox = new PhotoSwipeLightbox({
			gallery: "#image-preview",
			children: "a",
			pswpModule: () => import("photoswipe"),
			bgOpacity: 1.0,
		});
		lightbox.init();

		return () => {
			lightbox.destroy();
		};
	}, []);

	if (images === undefined) return <StackSkeleton />;
	if (images.length === 0) return <StatusCodeView statusCode="204" />;

	return (
		// eslint-disable-next-line
		<div className="pswp-gallery" id="image-preview">
			<div className="grid grid-cols-4 gap-2 p-2 sm:p-4">
				{images.map((image) => (
					<a
						href={image.src}
						target="_blank"
						rel="noreferrer"
						key={image.src}
						data-pswp-width={image.width}
						data-pswp-height={image.height}
					>
						<Image src={image.src} width={300} height={96} alt="" />
					</a>
				))}
			</div>
		</div>
	);
}
