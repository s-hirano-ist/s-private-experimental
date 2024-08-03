import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Route } from "next";
import { Link } from "next-view-transitions";
import Image from "next/image";

export function ContentsPreview({
	slug,
	noImage,
}: { slug: string; noImage: boolean }) {
	// TODO: Image on errorの実装
	// TODO: imageをblobから取ってくる
	const src = noImage ? "/_no_image.svg" : "/TODO";
	return (
		<Link href={slug as Route}>
			<Card>
				<CardHeader>
					<CardTitle className="text-center">{slug}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center">
						<Image src={src} width={100} height={100} alt={slug} />
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
