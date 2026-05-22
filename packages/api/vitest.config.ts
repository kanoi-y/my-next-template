import { sharedConfig } from "@my-next-template/config/vitest";
import { mergeConfig } from "vitest/config";

export default mergeConfig(sharedConfig, {
	test: {
		environment: "node",
	},
});
