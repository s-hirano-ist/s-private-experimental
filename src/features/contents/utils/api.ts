import fs from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const imagesDirectory = join(process.cwd(), "public/assets/images");

export function getContentsBySlug(slug: string, path: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(path, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	return matter(fileContents).content;
}

export function getAllSlugs(path: string) {
	const contentsDirectory = join(process.cwd(), "s-contents/_markdown", path);
	return fs
		.readdirSync(contentsDirectory)
		.filter((slug) => slug !== ".DS_Store");
}

export function getAllImages() {
	return fs.readdirSync(imagesDirectory).filter((slug) => slug !== ".DS_Store");
}
