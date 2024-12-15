import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError } from "@/error-classes";
import { hasAdminPermissionOrThrow } from "@/features/auth/utils/get-session";
import { loggerInfo } from "@/pino";
import prisma from "@/prisma";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatUpdateRoleMessage } from "@/utils/format-for-line";
import type { Role } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { changeRole } from "./change-role";

vi.mock("server-only", () => {
	return {};
});

vi.mock("@/prisma", () => ({ default: { users: { update: vi.fn() } } }));

vi.mock("@/features/auth/utils/get-session", () => ({
	hasAdminPermissionOrThrow: vi.fn(),
}));

vi.mock("@/pino", () => ({
	loggerInfo: vi.fn(),
	loggerWarn: vi.fn(),
}));

vi.mock("@/utils/fetch-message", () => ({
	sendLineNotifyMessage: vi.fn(),
}));

vi.mock("@/utils/format-for-line", () => ({
	formatUpdateRoleMessage: vi.fn(),
}));

describe("changeRole", () => {
	const mockUserId = "user123";
	const mockRole: Role = "ADMIN";
	const mockMessage = "Role updated to ADMIN";

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(formatUpdateRoleMessage).mockReturnValue(mockMessage);
	});

	it("should change the user role and return success", async () => {
		vi.mocked(hasAdminPermissionOrThrow).mockResolvedValueOnce(undefined);
		vi.mocked(prisma.users.update).mockResolvedValueOnce({
			id: "user123",
			username: "username123",
			role: "ADMIN",
			scope: "PRIVATE",
			failedLoginAttempts: 0,
			isLocked: false,
			updatedAt: new Date(),
			createdAt: new Date(),
		});
		vi.mocked(sendLineNotifyMessage).mockResolvedValueOnce(undefined);

		// Call the function
		const result = await changeRole(mockUserId, mockRole);

		// Assertions
		expect(hasAdminPermissionOrThrow).toHaveBeenCalledTimes(1);
		expect(prisma.users.update).toHaveBeenCalledWith({
			where: { id: mockUserId },
			data: { role: mockRole },
		});
		expect(formatUpdateRoleMessage).toHaveBeenCalledWith(mockRole);
		expect(loggerInfo).toHaveBeenCalledWith(mockMessage, {
			caller: "changeRole",
			status: 200,
		});
		expect(sendLineNotifyMessage).toHaveBeenCalledWith(mockMessage);
		expect(result).toEqual({
			success: true,
			message: SUCCESS_MESSAGES.ROLE_UPDATED,
			data: undefined,
		});
	});

	it("should handle errors and return wrapped error", async () => {
		const mockError = new NotAllowedError();
		vi.mocked(hasAdminPermissionOrThrow).mockRejectedValueOnce(mockError);

		const result = await changeRole(mockUserId, mockRole);

		expect(hasAdminPermissionOrThrow).toHaveBeenCalledTimes(1);
		expect(prisma.users.update).not.toHaveBeenCalled();
		expect(result).toMatchObject({
			success: false,
		});
	});
});
