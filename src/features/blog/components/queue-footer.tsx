import prisma from "@/server/db";
import { QueueDrawer } from "./queue-drawer";

export async function QueueFooter() {
	try {
		const categories = await prisma.category.findMany({
			select: { id: true, category: true },
		});
		return <QueueDrawer categories={categories} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
