import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const USER_EMAIL = process.env.USER_EMAIL;
	// TODO: hashed password
	const USER_PASSWORD = process.env.USER_PASSWORD;

	if (!USER_EMAIL || !USER_PASSWORD)
		throw new Error("USER EMAIL or PASSWORD undefined.");

	try {
		// UPSERT: if already exists then update, otherwise create
		await prisma.users.upsert({
			where: { email: USER_EMAIL },
			update: {},
			create: {
				email: USER_EMAIL,
				password: USER_PASSWORD,
			},
		});
		console.log("Added user to the database");
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();
