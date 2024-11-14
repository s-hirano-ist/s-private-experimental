import "server-only";
import fs from "node:fs";
import { join } from "node:path";
import { loggerError } from "@/pino";
import matter from "gray-matter";

export function getContentsBySlug(slug: string, path: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(path, `${realSlug}.md`);
	try {
		const fileContents = fs.readFileSync(fullPath, "utf8");
		return matter(fileContents).content;
	} catch (error) {
		loggerError(
			`Error reading file ${fullPath}:`,
			{
				caller: "getContentsBySlug",
				status: 500,
			},
			error,
		);
		return "";
	}
}

export function getAllSlugs(path: string) {
	const contentsDirectory = join(process.cwd(), "s-contents/markdown", path);
	try {
		return fs
			.readdirSync(contentsDirectory)
			.filter((slug) => slug !== ".DS_Store");
	} catch (error) {
		loggerError(
			`Error reading directory ${contentsDirectory}:`,
			{
				caller: "getAllSlugs",
				status: 500,
			},
			error,
		);
		return [];
	}
}

export function getAllImages(path: string) {
	const imagesDirectory = join(process.cwd(), "s-contents/image", path);
	try {
		return fs
			.readdirSync(imagesDirectory)
			.filter((slug) => slug !== ".DS_Store");
	} catch (error) {
		loggerError(
			`Error reading directory ${imagesDirectory}:`,
			{
				caller: "getAllImages",
				status: 500,
			},
			error,
		);
		return [];
	}
}
