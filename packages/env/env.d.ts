import type { web as server } from "@my-next-template/infra/alchemy.run";

// This file infers types for the cloudflare:workers environment from your Alchemy Worker.
// @see https://alchemy.run/concepts/bindings/#type-safe-bindings

export type CloudflareEnv = typeof server.Env;

declare global {
	type Env = CloudflareEnv;
}

declare module "cloudflare:workers" {
	// biome-ignore lint/style/noNamespace: Alchemy/Cloudflare Workers の module augmentation 仕様
	namespace Cloudflare {
		export interface Env extends CloudflareEnv {}
	}
}
