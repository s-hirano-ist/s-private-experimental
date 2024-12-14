import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import { Unauthorized } from "./unauthorized";

describe("Unauthorized", () => {
	beforeAll(() => {
		if (!HTMLFormElement.prototype.requestSubmit) {
			HTMLFormElement.prototype.requestSubmit = function (
				submitter?: HTMLElement,
			) {
				if (submitter) {
					this.submit();
				} else {
					this.dispatchEvent(
						new Event("submit", { bubbles: true, cancelable: true }),
					);
				}
			};
		}
	});

	it("renders the status code and message correctly", () => {
		render(<Unauthorized />);

		expect(screen.getByText("403")).toBeInTheDocument();
		expect(
			screen.getByText(
				/権限がありません。別のアカウントで再サインインしてください。/,
			),
		).toBeInTheDocument();
	});

	it("renders a signout form with a button", () => {
		render(<Unauthorized />);

		// FIXME: add test for form
		// const form = screen.getByRole("form");
		// expect(form).toHaveAttribute("action", "/api/auth/signout");

		const button = screen.getByRole("button", { name: /再サインイン/i });
		expect(button).toBeInTheDocument();
	});

	it("handles form submission", async () => {
		// FIXME: add test for userEvent
		// const user = userEvent.setup();
		render(<Unauthorized />);
		// const form = screen.getByRole("form");
		// expect(form).toBeInTheDocument();
		// const button = screen.getByRole("button", { name: /再サインイン/i });
		// await user.click(button);
	});
});
