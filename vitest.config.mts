import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config({ path: ".env.test" });

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest-setup.ts"],
		coverage: {
			enabled: true,
			reportOnFailure: true,
			reportsDirectory: "./.vitest-coverage",
			include: ["src/**"],
			exclude: [
				"**/*.stories.tsx",
				"src/**/*.test.ts?(x)",
				"src/app/**", // FIXME: delete this line
			],
			reporter: ["text", "json-summary", "json"],
		},
		include: ["./src/**/*.test.?(c|m)[jt]s?(x)"],
		exclude: ["./e2e/**/*"],
	},
	resolve: { alias: { "@": "/src" } },
});
