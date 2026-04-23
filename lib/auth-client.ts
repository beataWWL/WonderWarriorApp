"use client";

import { createAuthClient } from "better-auth/react";

// Browser-side BetterAuth client. Talks to /api/auth/[...all] on the same
// origin, so no baseURL is needed here. Re-exports common helpers so UI
// code can import them directly from this file.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
