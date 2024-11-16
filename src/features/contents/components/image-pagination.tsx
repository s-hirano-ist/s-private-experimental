import { Badge } from "@/components/ui/badge";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "@/constants";
import { getUserId } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";

type Props = {
	currentPage: number;
};

export async function ImagePagination({ currentPage }: Props) {
	const userId = await getUserId();
	const totalImages = await prisma.images.count({
		where: { userId },
	});

	const showPreviousPageLink = 1 < currentPage;
	const showNextPageLink = currentPage < totalImages / PAGE_SIZE;

	return (
		<>
			<Badge className="m-2 flex justify-center">画像数: {totalImages}</Badge>
			<Pagination>
				<PaginationContent>
					{showPreviousPageLink && (
						<PaginationItem>
							<PaginationPrevious
								href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
							/>
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink href="#">{currentPage}</PaginationLink>
					</PaginationItem>
					{showNextPageLink && (
						<PaginationItem>
							<PaginationNext href={`?page=${currentPage + 1}`} />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</>
	);
}
