import { describe, expect, it } from "vitest";

import { appRouter } from "./index";

describe("appRouter", () => {
	it("healthCheck returns OK", async () => {
		const caller = appRouter.createCaller({ auth: null, session: null });
		await expect(caller.healthCheck()).resolves.toBe("OK");
	});
});
