import { config } from "dotenv";
import type { Config } from "drizzle-kit";

// Load DATABASE_URL from .env.local (drizzle-kit reads .env by default,
// but Next.js / Vercel use .env.local — so we load it explicitly here).
config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Run `vercel env pull .env.local` to fetch it.",
  );
}

export default {
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
