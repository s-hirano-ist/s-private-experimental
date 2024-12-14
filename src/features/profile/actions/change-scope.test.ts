import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { getUserId } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatUpdateScopeMessage } from "@/utils/format-for-line";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { changeScope } from "./change-scope";

vi.mock("server-only", () => {
	return {};
});

vi.mock("@/features/auth/utils/get-session", () => ({
	getUserId: vi.fn(),
}));

vi.mock("@/prisma", () => ({ default: { users: { update: vi.fn() } } }));

vi.mock("@/utils/fetch-message", () => ({
	sendLineNotifyMessage: vi.fn(),
}));

vi.mock("@/utils/format-for-line", () => ({
	formatUpdateScopeMessage: vi.fn(),
}));

vi.mock("@/error-wrapper", () => ({
	wrapServerSideErrorForClient: vi.fn(),
}));

describe("changeScope", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should update scope to PUBLIC and send a notification", async () => {
		const mockUserId = "12345";
		const mockMessage = "Scope updated to PUBLIC";
		(getUserId as Mock).mockResolvedValue(mockUserId);
		(formatUpdateScopeMessage as Mock).mockReturnValue(mockMessage);

		const result = await changeScope(true);

		expect(getUserId).toHaveBeenCalledTimes(1);
		expect(prisma.users.update).toHaveBeenCalledWith({
			where: { id: mockUserId },
			data: { scope: "PUBLIC" },
		});
		expect(formatUpdateScopeMessage).toHaveBeenCalledWith("PUBLIC");
		expect(sendLineNotifyMessage).toHaveBeenCalledWith(mockMessage);
		expect(result).toEqual({
			success: true,
			message: SUCCESS_MESSAGES.SCOPE_UPDATED,
			data: undefined,
		});
	});

	it("should update scope to PRIVATE and send a notification", async () => {
		const mockUserId = "12345";
		const mockMessage = "Scope updated to PRIVATE";
		(getUserId as Mock).mockResolvedValue(mockUserId);
		(formatUpdateScopeMessage as Mock).mockReturnValue(mockMessage);

		const result = await changeScope(false);

		expect(getUserId).toHaveBeenCalledTimes(1);
		expect(prisma.users.update).toHaveBeenCalledWith({
			where: { id: mockUserId },
			data: { scope: "PRIVATE" },
		});
		expect(formatUpdateScopeMessage).toHaveBeenCalledWith("PRIVATE");
		expect(sendLineNotifyMessage).toHaveBeenCalledWith(mockMessage);
		expect(result).toEqual({
			success: true,
			message: SUCCESS_MESSAGES.SCOPE_UPDATED,
			data: undefined,
		});
	});

	it("should handle errors and wrap them for the client", async () => {
		const mockError = new Error("Database error");
		(getUserId as Mock).mockResolvedValue("12345");
		(prisma.users.update as Mock).mockRejectedValue(mockError);
		(wrapServerSideErrorForClient as Mock).mockResolvedValue({
			success: false,
			message: "An error occurred",
			data: undefined,
		});

		const result = await changeScope(true);

		expect(getUserId).toHaveBeenCalledTimes(1);
		expect(prisma.users.update).toHaveBeenCalled();
		expect(wrapServerSideErrorForClient).toHaveBeenCalledWith(mockError);
		expect(result).toEqual({
			success: false,
			message: "An error occurred",
			data: undefined,
		});
	});
});
