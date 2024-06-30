import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest-setup.ts"],
		coverage: { enabled: true, reportsDirectory: "./.vitest-coverage" },
		include: ["./src/**/*.test.?(c|m)[jt]s?(x)"],
		exclude: ["./e2e/**/*"],
	},
	resolve: { alias: { "@": "/src" } },
});
