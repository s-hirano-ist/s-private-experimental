import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const email = process.env.USER_EMAIL;
	const password = process.env.USER_PASSWORD;

	if (!email || !password) throw new Error("USER EMAIL or PASSWORD undefined.");

	try {
		const hashedPassword = await bcrypt.hash(password, 8);

		// UPSERT: if already exists then update, otherwise create
		await prisma.users.upsert({
			where: { email: email },
			update: {},
			create: {
				email: email,
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
