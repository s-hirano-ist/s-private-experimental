"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Route } from "next";
import { Link } from "next-view-transitions";
import Image, { type StaticImageData } from "next/image";

export function ContentsPreview({
	path,
	slug,
	imagePath,
}: { path: string; slug: string; imagePath: string }) {
	// TODO: imageをblobから取ってくる
	// TODO: Image on errorの実装
	// FIXME: 相対パスの記述

	const imageSrc: StaticImageData =
		imagePath !== undefined
			? require(`../../../../s-contents/public/assets/${path}/${imagePath}`)
			: require("../../../../s-contents/public/assets/_no_image.svg");

	return (
		<Link href={`${path}/${slug}` as Route}>
			<Card className="flex h-full flex-col justify-evenly">
				<CardHeader>
					<CardTitle className="text-center">{slug}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center">
						<Image src={imageSrc} height={96} width={96} alt={slug} />
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
