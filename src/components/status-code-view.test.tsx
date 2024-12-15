import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusCodeView } from "./status-code-view";

describe("StatusCodeView", () => {
	it("displays the correct status code and message for 204", () => {
		render(<StatusCodeView statusCode="204" />);

		// ステータスコードの表示確認
		expect(screen.getByText("204")).toBeInTheDocument();

		// ステータスメッセージの確認
		expect(screen.getByText(/no content/i)).toBeInTheDocument();
	});

	it("displays the correct status code and message for 403", () => {
		render(<StatusCodeView statusCode="403" />);

		expect(screen.getByText("403")).toBeInTheDocument();
		expect(screen.getByText(/forbidden/i)).toBeInTheDocument();
	});

	it("displays the correct status code and message for 404", () => {
		render(<StatusCodeView statusCode="404" />);

		expect(screen.getByText("404")).toBeInTheDocument();
		expect(screen.getByText(/not found/i)).toBeInTheDocument();
	});

	it("displays the correct status code and message for 500", () => {
		render(<StatusCodeView statusCode="500" />);

		expect(screen.getByText("500")).toBeInTheDocument();
		expect(screen.getByText(/internal server error/i)).toBeInTheDocument();
	});

	it("displays Unknown Status for an unsupported status code", () => {
		// @ts-expect-error: テスト目的で型外の値を渡す
		render(<StatusCodeView statusCode="999" />);

		expect(screen.getByText("999")).toBeInTheDocument();
		expect(screen.getByText(/unknown status/i)).toBeInTheDocument();
	});
});
