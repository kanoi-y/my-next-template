import { sharedConfig } from "@my-next-template/config/vitest";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { mergeConfig } from "vitest/config";

export default mergeConfig(sharedConfig, {
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: "jsdom",
		setupFiles: ["@my-next-template/config/vitest/setup"],
		css: false,
	},
});
