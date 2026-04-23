import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Catch-all route: handles every request to /api/auth/* (sign-in, sign-up,
// sign-out, session lookup, etc). BetterAuth owns the routing internally;
// this file just hands the request to it.
export const { POST, GET } = toNextJsHandler(auth);
