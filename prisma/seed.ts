import { PrismaClient } from "@prisma/client";
import data1 from "./sampleData/AI.json";
import data2 from "./sampleData/education.json";
import data3 from "./sampleData/innovation.json";
import data4 from "./sampleData/interesting.json";

const prisma = new PrismaClient();

async function main() {
	try {
		// UPSERT: if already exists then update, otherwise create
		await prisma.category.upsert({
			where: { id: 1 },
			update: {},
			create: {
				category: data1.category,
				newsDetail: {
					create: data1.body,
				},
			},
		});
		await prisma.category.upsert({
			where: { id: 2 },
			update: {},
			create: {
				category: data2.category,
				newsDetail: {
					create: data2.body,
				},
			},
		});
		await prisma.category.upsert({
			where: { id: 3 },
			update: {},
			create: {
				category: data3.category,
				newsDetail: {
					create: data3.body,
				},
			},
		});
		await prisma.category.upsert({
			where: { id: 4 },
			update: {},
			create: {
				category: data4.category,
				newsDetail: {
					create: data4.body,
				},
			},
		});
		console.log("added sample data to the database");
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
