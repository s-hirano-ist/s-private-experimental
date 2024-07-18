import { PrismaClient } from "@prisma/client";
import data1 from "./sampleData/AI.json";
import data2 from "./sampleData/education.json";
import data3 from "./sampleData/innovation.json";
import data4 from "./sampleData/interesting.json";
import mypageData from "./sampleData/mypage.json";

const prisma = new PrismaClient();

async function main() {
	try {
		// UPSERT: if already exists then update, otherwise create
		await prisma.category.upsert({
			where: { id: 1 },
			update: {},
			create: {
				name: data1.category,
				blog: {
					create: data1.body,
				},
			},
		});
		await prisma.category.upsert({
			where: { id: 2 },
			update: {},
			create: {
				name: data2.category,
				blog: {
					create: data2.body,
				},
			},
		});
		await prisma.category.upsert({
			where: { id: 3 },
			update: {},
			create: {
				name: data3.category,
				blog: {
					create: data3.body,
				},
			},
		});
		await prisma.category.upsert({
			where: { id: 4 },
			update: {},
			create: {
				name: data4.category,
				blog: {
					create: data4.body,
				},
			},
		});

		await prisma.mypage.createMany({
			data: mypageData,
		});

		console.log("added sample data to the database");
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
