import { PAGE_SIZE } from "@/constants";
import { getUserId } from "@/features/auth/utils/get-session";
import { ImageStack } from "@/features/dump/components/image-stack";
import prisma from "@/prisma";

type Props = {
	page: number;
};

export async function ImagePage({ page }: Props) {
	const userId = await getUserId();

	const images = await prisma.images.findMany({
		where: { userId },
		select: {
			id: true,
		},
		orderBy: { id: "desc" },
		skip: (page - 1) * PAGE_SIZE,
		take: PAGE_SIZE,
	});

	return <ImageStack images={images} />;
}
