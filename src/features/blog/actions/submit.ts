"use server";
import prisma from "@/server/db";
import { blogSchema } from "../schemas/blog-schema";

export type SubmitBlogState = {
	success: boolean | undefined;
	message: string;
};

export async function submitBlog(_: SubmitBlogState, formData: FormData) {
	try {
		console.log("submit form", formData);
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
		await prisma.newsDetail.create({
			data: validatedFields.data,
		});

		console.log("Successfully added:", validatedFields.data);

		return { success: true, message: "正常に登録できました。" };
	} catch (error) {
		console.error("Unexpected error:", error);
		return {
			success: false,
			message: "予期せぬエラーが発生しました。",
		};
	}
}
