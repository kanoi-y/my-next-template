import { defineConfig } from "vitest/config";

export const sharedConfig = defineConfig({
	test: {
		pool: "forks",
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"**/*.test.{ts,tsx}",
				"**/*.spec.{ts,tsx}",
				"**/node_modules/**",
			],
		},
	},
});
