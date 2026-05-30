import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
	path: "../../apps/web/.env",
});

const url = process.env.DATABASE_URL || "";
const isLocalLibsql =
	url.startsWith("http://127.0.0.1") || url.startsWith("http://localhost");

export default defineConfig({
	schema: "./src/schema",
	out: "./src/migrations",
	dialect: "turso",
	dbCredentials: {
		url,
		authToken:
			process.env.DATABASE_AUTH_TOKEN || (isLocalLibsql ? "local" : ""),
	},
});
