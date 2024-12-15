import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { hasUpdateStatusPermissionOrThrow } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatDeleteMessage } from "@/utils/format-for-line";
import { revalidatePath } from "next/cache";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { deleteNews } from "./delete-news";

vi.mock("server-only", () => {
	return {};
});

vi.mock("@/pino", () => ({
	loggerInfo: vi.fn(),
	loggerWarn: vi.fn(),
}));

vi.mock("@/features/auth/utils/get-session", () => ({
	hasUpdateStatusPermissionOrThrow: vi.fn(),
}));

vi.mock("@/prisma", () => ({
	default: { news: { update: vi.fn() } },
}));

vi.mock("@/utils/fetch-message", () => ({
	sendLineNotifyMessage: vi.fn(),
}));

vi.mock("@/utils/format-for-line", () => ({
	formatDeleteMessage: vi.fn(),
}));

vi.mock("@/error-wrapper", () => ({
	wrapServerSideErrorForClient: vi.fn(),
}));

vi.mock("next/cache", () => ({
	revalidatePath: vi.fn(),
}));

describe("deleteNews", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should update the news status to EXPORTED and send notifications", async () => {
		const mockId = 1;
		const mockMessage = "News 1 has been marked as EXPORTED.";

		(hasUpdateStatusPermissionOrThrow as Mock).mockResolvedValue(undefined);
		(prisma.news.update as Mock).mockResolvedValue({ id: mockId });
		(formatDeleteMessage as Mock).mockReturnValue(mockMessage);

		const result = await deleteNews(mockId);

		expect(hasUpdateStatusPermissionOrThrow).toHaveBeenCalledTimes(1);
		expect(prisma.news.update).toHaveBeenCalledWith({
			where: { id: mockId },
			data: { status: "EXPORTED" },
		});
		expect(formatDeleteMessage).toHaveBeenCalledWith(mockId, "NEWS");
		expect(sendLineNotifyMessage).toHaveBeenCalledWith(mockMessage);
		expect(revalidatePath).toHaveBeenCalledWith("/admin");
		expect(revalidatePath).toHaveBeenCalledWith("/");
		expect(result).toEqual({
			success: true,
			message: SUCCESS_MESSAGES.UPDATE,
			data: mockMessage,
		});
	});

	it("should handle errors and wrap them for the client", async () => {
		const mockId = 1;
		const mockError = new Error("Database error");

		(hasUpdateStatusPermissionOrThrow as Mock).mockResolvedValue(undefined);
		(prisma.news.update as Mock).mockRejectedValue(mockError);
		(wrapServerSideErrorForClient as Mock).mockResolvedValue({
			success: false,
			message: "An error occurred",
			data: undefined,
		});

		const result = await deleteNews(mockId);

		expect(hasUpdateStatusPermissionOrThrow).toHaveBeenCalledTimes(1);
		expect(prisma.news.update).toHaveBeenCalledWith({
			where: { id: mockId },
			data: { status: "EXPORTED" },
		});
		expect(wrapServerSideErrorForClient).toHaveBeenCalledWith(mockError);
		expect(result).toEqual({
			success: false,
			message: "An error occurred",
			data: undefined,
		});
	});
});
