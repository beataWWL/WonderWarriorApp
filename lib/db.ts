import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Neon Postgres connection string lives in DATABASE_URL (pulled from
// Vercel into .env.local via `vercel env pull`). The Neon URL already
// contains `?sslmode=require`, so the pg Pool negotiates TLS automatically.
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Run `vercel env pull .env.local` to fetch it.",
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
