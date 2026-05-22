import alchemy from "alchemy";
import { Nextjs } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

function requireBinding<T>(value: T | undefined, name: string): T {
	if (value == null) {
		throw new Error(`Missing required binding: ${name}`);
	}
	return value;
}

const app = await alchemy("my-next-template");

export const web = await Nextjs("web", {
	cwd: "../../apps/web",
	bindings: {
		DATABASE_URL: requireBinding(
			alchemy.secret.env.DATABASE_URL,
			"DATABASE_URL"
		),
		CORS_ORIGIN: requireBinding(alchemy.env.CORS_ORIGIN, "CORS_ORIGIN"),
		DATABASE_AUTH_TOKEN: requireBinding(
			alchemy.secret.env.DATABASE_AUTH_TOKEN,
			"DATABASE_AUTH_TOKEN"
		),
	},
	dev: {
		env: {
			PORT: "3001",
		},
	},
});

console.log(`Web    -> ${web.url}`);

await app.finalize();
