import path from "node:path";
import { fileURLToPath } from "node:url";
import { sharedConfig } from "@my-next-template/config/vitest";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { mergeConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(sharedConfig, {
	plugins: [tsconfigPaths(), react()],
	resolve: {
		alias: {
			"@": path.resolve(dirname, "./src"),
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: ["@my-next-template/config/vitest/setup"],
		css: false,
	},
});
