import { PAGE_SIZE } from "@/constants";
import { getUserId } from "@/features/auth/utils/get-session";
import { fetchMetadata } from "@/features/image/actions/fetch-metadata";
import { generateUrl } from "@/features/image/actions/generate-url";
import { ImageStack } from "@/features/image/components/image-stack";
import prisma from "@/prisma";

type Props = {
	page: number;
};

export async function ImageStackProvider({ page }: Props) {
	const userId = await getUserId();

	const _images = await prisma.images.findMany({
		where: { userId },
		select: {
			id: true,
		},
		orderBy: { id: "desc" },
		skip: (page - 1) * PAGE_SIZE,
		take: PAGE_SIZE,
	});

	const images = await Promise.all(
		_images.map(async (image) => {
			const url = await generateUrl(image.id);
			if (!url.success) return { src: "/not-found.png" };

			const metadata = await fetchMetadata(url.data);
			if (!metadata.success) return { src: "/not-found.png" };

			return { src: url.data, metadata: metadata.data };
		}),
	);

	return <ImageStack images={images} />;
}
