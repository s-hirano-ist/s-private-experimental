"use server";
import prisma from "@/server/db";
import { blogSchema } from "../schemas/blog-schema";
import type { QueuedContent } from "../stores/queued-contents-context";

export type SubmitBlogState = {
	success: boolean | undefined;
	message: string;
	data?: QueuedContent;
};

export async function submitBlog(formData: FormData): Promise<SubmitBlogState> {
	try {
		const validatedFields = blogSchema.safeParse({
			categoryId: Number(formData.get("category")),
			title: formData.get("title"),
			quote: formData.get("quote"),
			url: formData.get("url"),
		});

		if (!validatedFields.success) {
			return {
				success: false,
				message: "無効なフォーマットで入力されています。",
			};
		}
		const createNewsDetail = await prisma.newsDetail.create({
			data: validatedFields.data,
			include: {
				category: true,
			},
		});
		const category = createNewsDetail.category?.category;
		if (!category) throw new Error("Category undefined error.");

		const data = {
			id: createNewsDetail.id,
			title: validatedFields.data.title,
			quote: validatedFields.data.quote,
			url: validatedFields.data.url,
			category,
		};

		console.log("Successfully added:", validatedFields.data);

		return {
			success: true,
			message: "正常に登録できました。",
			data,
		};
	} catch (error) {
		console.error("Unexpected error:", error);
		return {
			success: false,
			message: "予期せぬエラーが発生しました。",
		};
	}
}
