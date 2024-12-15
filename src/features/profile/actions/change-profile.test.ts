import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { getUserId } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatUpsertProfileMessage } from "@/utils/format-for-line";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { changeProfile } from "./change-profile";

vi.mock("server-only", () => {
	return {};
});

vi.mock("@/features/auth/utils/get-session", () => ({
	getUserId: vi.fn(),
}));

vi.mock("@/prisma", () => ({
	default: { profiles: { upsert: vi.fn() } },
}));

vi.mock("@/utils/format-for-line", () => ({
	formatUpsertProfileMessage: vi.fn(),
}));

vi.mock("@/utils/fetch-message", () => ({
	sendLineNotifyMessage: vi.fn(),
}));

vi.mock("@/error-wrapper", () => ({
	wrapServerSideErrorForClient: vi.fn(),
}));

describe("changeProfile", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should upsert the profile and send a notification", async () => {
		const mockUserId = "12345";
		const mockProfileData = {
			name: "John Doe",
			bio: "A software developer.",
			avatarUrl: "https://example.com/avatar.png",
		};
		const mockMessage = "Profile updated successfully.";

		(getUserId as Mock).mockResolvedValue(mockUserId);
		(prisma.profiles.upsert as Mock).mockResolvedValue(undefined);
		(formatUpsertProfileMessage as Mock).mockReturnValue(mockMessage);

		const result = await changeProfile(mockProfileData);

		expect(getUserId).toHaveBeenCalledTimes(1);
		expect(prisma.profiles.upsert).toHaveBeenCalledWith({
			where: { userId: mockUserId },
			update: mockProfileData,
			create: { userId: mockUserId, ...mockProfileData },
		});
		expect(formatUpsertProfileMessage).toHaveBeenCalledWith(mockProfileData);
		expect(sendLineNotifyMessage).toHaveBeenCalledWith(mockMessage);
		expect(result).toEqual({
			success: true,
			message: SUCCESS_MESSAGES.PROFILE_UPSERTED,
			data: undefined,
		});
	});

	it("should handle errors and wrap them for the client", async () => {
		const mockError = new Error("Database error");
		const mockProfileData = {
			name: "John Doe",
			bio: "A software developer.",
			avatarUrl: "https://example.com/avatar.png",
		};

		(getUserId as Mock).mockResolvedValue("12345");
		(prisma.profiles.upsert as Mock).mockRejectedValue(mockError);
		(wrapServerSideErrorForClient as Mock).mockResolvedValue({
			success: false,
			message: "An error occurred",
			data: undefined,
		});

		const result = await changeProfile(mockProfileData);

		expect(getUserId).toHaveBeenCalledTimes(1);
		expect(prisma.profiles.upsert).toHaveBeenCalledWith({
			where: { userId: "12345" },
			update: mockProfileData,
			create: { userId: "12345", ...mockProfileData },
		});
		expect(wrapServerSideErrorForClient).toHaveBeenCalledWith(mockError);
		expect(result).toEqual({
			success: false,
			message: "An error occurred",
			data: undefined,
		});
	});
});
