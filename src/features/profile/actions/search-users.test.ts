import { checkSelfAuthOrThrow } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { searchUsers } from "./search-users";

vi.mock("server-only", () => {
	return {};
});

vi.mock("@/features/auth/utils/get-session", () => ({
	checkSelfAuthOrThrow: vi.fn(),
}));

vi.mock("@/prisma", () => ({
	default: { users: { update: vi.fn(), findMany: vi.fn() } },
}));

describe("searchUsers", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return a list of users matching the search string", async () => {
		const mockUsers = [
			{ username: "john_doe", role: "admin" },
			{ username: "jane_doe", role: "user" },
		];
		(checkSelfAuthOrThrow as Mock).mockResolvedValue(undefined);
		(prisma.users.findMany as Mock).mockResolvedValue(mockUsers);

		const result = await searchUsers("doe");

		expect(checkSelfAuthOrThrow).toHaveBeenCalledTimes(1);
		expect(prisma.users.findMany).toHaveBeenCalledWith({
			select: { username: true, role: true },
			where: { username: { contains: "doe" } },
			take: 10,
		});
		expect(result).toEqual(mockUsers);
	});

	it("should return an empty array if no users match the search string", async () => {
		(checkSelfAuthOrThrow as Mock).mockResolvedValue(undefined);
		(prisma.users.findMany as Mock).mockResolvedValue([]);

		const result = await searchUsers("nonexistent");

		expect(checkSelfAuthOrThrow).toHaveBeenCalledTimes(1);
		expect(prisma.users.findMany).toHaveBeenCalledWith({
			select: { username: true, role: true },
			where: { username: { contains: "nonexistent" } },
			take: 10,
		});
		expect(result).toEqual([]);
	});

	it("should throw an error if the user is not authenticated", async () => {
		(checkSelfAuthOrThrow as Mock).mockImplementation(() => {
			throw new Error("Not authenticated");
		});

		await expect(searchUsers("doe")).rejects.toThrow("Not authenticated");

		expect(checkSelfAuthOrThrow).toHaveBeenCalledTimes(1);
		expect(prisma.users.findMany).not.toHaveBeenCalled();
	});

	it("should handle errors from the database gracefully", async () => {
		(checkSelfAuthOrThrow as Mock).mockResolvedValue(undefined);
		(prisma.users.findMany as Mock).mockRejectedValue(
			new Error("Database error"),
		);

		await expect(searchUsers("doe")).rejects.toThrow("Database error");

		expect(checkSelfAuthOrThrow).toHaveBeenCalledTimes(1);
		expect(prisma.users.findMany).toHaveBeenCalledWith({
			select: { username: true, role: true },
			where: { username: { contains: "doe" } },
			take: 10,
		});
	});
});
