import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/* Other rehype packages
 * rehype-slug
 * rehype-autolink-headings
 * remark-link-card
 * rehype-sanitize

* Packages
 * - Remark: modify markdown
 * - Rehype: modify HTML
 *
//  *  Convert
 * - mdast: mutual conversion of Markdown and AST
 * - hast:  mutual conversion of HTML and AST
 *
 * REF: https://qiita.com/sankentou/items/f8eadb5722f3b39bbbf8
 */

export default async function markdownToHtml(markdown: string) {
	const result = await unified()
		.use(remarkParse) // Markdown to mdast
		.use(remarkGfm)
		.use(remarkRehype) // mdast to hast
		.use(rehypeExternalLinks, { target: "_blank", rel: ["nofollow"] })
		.use(rehypeHighlight)
		.use(rehypeStringify) // for use in dangerouslySetInnerHTML
		.process(markdown);

	return result.toString();
}
