import { BottomNavigationBar } from "@/components/nav/bottom-navigation-bar";
import prisma from "@/server/db";

export async function Footer() {
	try {
		const categories = await prisma.category.findMany({
			select: { id: true, category: true },
		});
		return (
			<footer className="sticky bottom-4 z-50 mx-auto w-full max-w-lg rounded-full border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
				<BottomNavigationBar categories={categories} />
			</footer>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
