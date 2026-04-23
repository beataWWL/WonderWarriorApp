import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reflection } from "@/lib/schema";

// GET /api/reflections?classSlug=xxx
// Returns all reflections for the signed-in user for that class.
// Response: { reflections: { promptIndex: number; content: string }[] }
export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const classSlug = url.searchParams.get("classSlug");
  if (!classSlug) {
    return Response.json(
      { error: "classSlug query parameter is required" },
      { status: 400 },
    );
  }

  const rows = await db
    .select({
      promptIndex: reflection.promptIndex,
      content: reflection.content,
    })
    .from(reflection)
    .where(
      and(
        eq(reflection.userId, session.user.id),
        eq(reflection.classSlug, classSlug),
      ),
    );

  return Response.json({ reflections: rows });
}

// POST /api/reflections
// Body: { classSlug: string; promptIndex: number; content: string }
// Upserts a single reflection answer for the signed-in user.
export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return Response.json(
      {
        error:
          "body must be { classSlug: string, promptIndex: number, content: string }",
      },
      { status: 400 },
    );
  }

  await db
    .insert(reflection)
    .values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      classSlug: body.classSlug,
      promptIndex: body.promptIndex,
      content: body.content,
    })
    .onConflictDoUpdate({
      target: [reflection.userId, reflection.classSlug, reflection.promptIndex],
      set: { content: body.content, updatedAt: new Date() },
    });

  return Response.json({ ok: true });
}

function isValidBody(
  body: unknown,
): body is { classSlug: string; promptIndex: number; content: string } {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.classSlug === "string" &&
    typeof b.promptIndex === "number" &&
    Number.isInteger(b.promptIndex) &&
    b.promptIndex >= 0 &&
    typeof b.content === "string"
  );
}
