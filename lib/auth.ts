import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { account, session, user, verification } from "./schema";

// BetterAuth server configuration.
//
// - Uses Drizzle as the storage adapter, talking to Neon Postgres via `db`.
// - Email + password sign-in is enabled. Email verification is off for now;
//   turn it on later by passing `requireEmailVerification: true` and
//   wiring up a `sendVerificationEmail` callback.
// - BETTER_AUTH_SECRET (required) and BETTER_AUTH_URL (optional, defaults to
//   the request origin) come from .env.local.
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
