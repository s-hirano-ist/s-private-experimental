import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		coverage: { enabled: true },
		include: ["./src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
		exclude: ["./e2e/**/*"],
	},
	resolve: { alias: { "@": "/src" } },
});
