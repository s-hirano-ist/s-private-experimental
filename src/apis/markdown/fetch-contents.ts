import "server-only";
import fs from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export function getContentsBySlug(slug: string, path: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(path, `${realSlug}.md`);
	try {
		const fileContents = fs.readFileSync(fullPath, "utf8");
		return matter(fileContents).content;
	} catch (error) {
		console.error(`Error reading file ${fullPath}:`, error);
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
		console.error(`Error reading directory ${contentsDirectory}:`, error);
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
		console.error(`Error reading directory ${imagesDirectory}:`, error);
		return [];
	}
}
