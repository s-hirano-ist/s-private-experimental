import { type ToasterToast, useToast } from "@/hooks/use-toast"; // useToast フックの正しいパスを指定してください
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toaster } from "./toaster";

vi.mock("@/hooks/use-toast");

describe("Toaster component", () => {
	it("renders toasts correctly", () => {
		const mockToasts: ToasterToast[] = [
			{ id: "1", title: "Toast 1", description: "Description 1" },
			{ id: "2", title: "Toast 2", description: "Description 2" },
		];

		vi.mocked(useToast).mockReturnValue({
			toasts: mockToasts,
			toast: vi.fn(),
			dismiss: vi.fn(),
		});

		render(<Toaster />);

		for (const { title, description } of mockToasts) {
			if (title) {
				expect(screen.getByText(title)).toBeInTheDocument();
			}
			if (description) {
				expect(screen.getByText(description as string)).toBeInTheDocument();
			}
		}
	});

	it("closes toast when ToastClose is clicked", async () => {
		const mockToasts: ToasterToast[] = [
			{ id: "1", title: "Toast 1", description: "Description 1" },
		];

		vi.mocked(useToast).mockReturnValue({
			toasts: mockToasts,
			toast: vi.fn(),
			dismiss: vi.fn(),
		});

		render(<Toaster />);

		const closeButton = screen.getByRole("button");
		fireEvent.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByText("Toast 1")).not.toBeInTheDocument();
			expect(screen.queryByText("Description 1")).not.toBeInTheDocument();
		});
	});

	it("renders ToastAction if provided", () => {
		const mockAction = <button type="button">Action</button>;
		const mockToasts: ToasterToast[] = [
			{
				id: "1",
				title: "Toast 1",
				description: "Description 1",
				action: mockAction,
			},
		];

		vi.mocked(useToast).mockReturnValue({
			toasts: mockToasts,
			toast: vi.fn(),
			dismiss: vi.fn(),
		});

		render(<Toaster />);

		const actionButton = screen.getByText("Action");
		expect(actionButton).toBeInTheDocument();
	});
});
