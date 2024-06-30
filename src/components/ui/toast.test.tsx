import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Toast,
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "./toast";

describe("Toast components", () => {
	it("renders Toast correctly", () => {
		render(
			<ToastProvider>
				<ToastViewport />
				<Toast>
					<ToastTitle>Toast Title</ToastTitle>
					<ToastDescription>Toast Description</ToastDescription>
					<ToastClose />
				</Toast>
			</ToastProvider>,
		);

		const title = screen.getByText("Toast Title");
		const description = screen.getByText("Toast Description");
		const closeButton = screen.getByRole("button");

		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(closeButton).toBeInTheDocument();
	});

	it("renders ToastAction correctly", () => {
		render(
			<ToastProvider>
				<ToastViewport />
				<Toast>
					<ToastTitle>Toast Title</ToastTitle>
					<ToastDescription>Toast Description</ToastDescription>
					<ToastAction altText="Action">Action</ToastAction>
					<ToastClose />
				</Toast>
			</ToastProvider>,
		);

		const actionButton = screen.getByText("Action");
		expect(actionButton).toBeInTheDocument();
	});

	it("closes the Toast when ToastClose is clicked", async () => {
		render(
			<ToastProvider>
				<ToastViewport />
				<Toast>
					<ToastTitle>Toast Title</ToastTitle>
					<ToastDescription>Toast Description</ToastDescription>
					<ToastClose />
				</Toast>
			</ToastProvider>,
		);

		const closeButton = screen.getByRole("button");
		fireEvent.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByText("Toast Title")).not.toBeInTheDocument();
			expect(screen.queryByText("Toast Description")).not.toBeInTheDocument();
		});
	});

	it("applies variant classes correctly", () => {
		render(
			<ToastProvider>
				<ToastViewport />
				<Toast variant="destructive">
					<ToastTitle>Destructive Toast</ToastTitle>
					<ToastDescription>Destructive Description</ToastDescription>
					<ToastClose />
				</Toast>
			</ToastProvider>,
		);

		const toast = screen.getByText("Destructive Toast").closest(".destructive");
		expect(toast).toHaveClass("destructive");
	});
});
