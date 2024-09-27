import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_CATEGORIES = ["AI", "education", "innovation", "interesting"];
async function main() {
	try {
		// UPSERT: if already exists then update, otherwise create
		await Promise.all(
			SEED_CATEGORIES.map(async (category, index) => {
				await prisma.category.upsert({
					where: { id: index + 1 },
					update: {},
					create: {
						name: category,
					},
				});
			}),
		);

		console.log("added sample data to the database");
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
