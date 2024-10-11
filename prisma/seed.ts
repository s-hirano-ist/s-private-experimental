import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const email = process.env.SEED_EMAIL;
	const username = process.env.SEED_USERNAME;
	const password = process.env.SEED_PASSWORD;

	if (!email || !username || !password)
		throw new Error("EMAIL, USERNAME or PASSWORD undefined.");

	try {
		const hashedPassword = await bcrypt.hash(password, 8);

		// UPSERT: if already exists then update, otherwise create
		await prisma.users.upsert({
			where: { email },
			update: {},
			create: {
				email,
				username,
				password: hashedPassword,
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
