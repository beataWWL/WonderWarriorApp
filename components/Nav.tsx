"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { classes } from "@/lib/classes";
import { signOut, useSession } from "@/lib/auth-client";

type NavItem = { href: string; label: string };

const items: NavItem[] = [
  { href: "/", label: "Home" },
  ...classes.map((c) => ({
    href: `/classes/${c.slug}`,
    label: `${c.num} · ${shortLabel(c.title)}`,
  })),
];

function shortLabel(title: string): string {
  // Use the first segment before "—" or ":" to keep nav compact
  return title.split(/[—:]/)[0].trim();
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the panel when the route changes (e.g. user tapped a link).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent the page behind the drawer from scrolling while the panel is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 h-[60px] bg-[rgba(0,7,18,0.92)] backdrop-blur border-b border-[rgba(0,212,255,0.15)] px-6 flex items-center gap-0">
        {/* Brand — always visible */}
        <Link
          href="/"
          className="font-display uppercase tracking-[0.12em] text-[0.85rem] text-lightning whitespace-nowrap flex-shrink-0"
          style={{ textShadow: "0 0 18px rgba(0,212,255,0.5)" }}
        >
          ✦ Wonder
        </Link>

        {/* Desktop: scrollable class pills. Hidden below lg. */}
        <div className="hidden lg:flex flex-1 min-w-0 items-center gap-0 ml-6 overflow-x-auto">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "font-label text-[0.85rem] tracking-[0.04em] whitespace-nowrap rounded-full px-3.5 py-1.5 transition-colors",
                  active
                    ? "bg-ember/10 text-ember border border-ember/35"
                    : "text-muted hover:text-ember border border-transparent",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile: spacer pushes the hamburger to the right edge. */}
        <div className="flex-1 lg:hidden" />

        {/* Desktop auth — pinned right with a divider. Hidden on mobile; the
            mobile panel has its own auth block further down. */}
        <div className="hidden lg:block flex-shrink-0 pl-4 ml-2 border-l border-[rgba(0,212,255,0.1)]">
          <AuthStatus variant="inline" />
        </div>

        {/* Mobile hamburger toggle. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="lg:hidden flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-[rgba(0,212,255,0.25)] text-lightning hover:text-ember hover:border-ember/50 transition"
        >
          {open ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer + backdrop. Rendered only when open so desktop pays
          nothing for it. lg:hidden guards against a resize-while-open edge
          case (the panel stays in state but becomes invisible above lg). */}
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="lg:hidden fixed inset-0 top-[60px] z-40 bg-black/60 backdrop-blur-sm cursor-default"
          />
          <div
            id="mobile-nav-panel"
            className="lg:hidden fixed top-[60px] inset-x-0 z-40 bg-[rgba(0,7,18,0.98)] backdrop-blur border-b border-[rgba(0,212,255,0.2)] max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            <div className="px-5 py-4 flex flex-col gap-1.5">
              {items.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "font-label text-[0.95rem] tracking-[0.04em] rounded-xl px-4 py-3 transition-colors",
                      active
                        ? "bg-ember/10 text-ember border border-ember/35"
                        : "text-clarity hover:text-ember border border-transparent hover:border-ember/30",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-[rgba(0,212,255,0.15)] px-5 py-4">
              <AuthStatus
                variant="stacked"
                onAction={() => setOpen(false)}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

type AuthVariant = "inline" | "stacked";

function AuthStatus({
  variant,
  onAction,
}: {
  variant: AuthVariant;
  onAction?: () => void;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const stacked = variant === "stacked";

  if (isPending) {
    return (
      <span className="font-label text-[0.75rem] text-muted uppercase tracking-[0.2em]">
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <div
        className={
          stacked
            ? "flex flex-col gap-3"
            : "flex items-center gap-3 whitespace-nowrap"
        }
      >
        <span
          className={
            stacked
              ? "font-body text-[0.85rem] text-muted"
              : "font-body text-[0.8rem] text-muted hidden sm:inline"
          }
        >
          {session.user.email}
        </span>
        <button
          type="button"
          onClick={async () => {
            onAction?.();
            await signOut();
            router.push("/");
            router.refresh();
          }}
          className={
            stacked
              ? "font-label uppercase tracking-[0.25em] text-[0.8rem] text-muted hover:text-ember px-4 py-3 rounded-xl border border-[rgba(0,212,255,0.25)] hover:border-ember/50 transition text-center"
              : "font-label uppercase tracking-[0.2em] text-[0.72rem] text-muted hover:text-ember px-3 py-1.5 rounded-full border border-[rgba(0,212,255,0.2)] hover:border-ember/50 transition"
          }
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div
      className={
        stacked
          ? "flex flex-col gap-2"
          : "flex items-center gap-2 whitespace-nowrap"
      }
    >
      <Link
        href="/signin"
        onClick={onAction}
        className={
          stacked
            ? "font-label uppercase tracking-[0.25em] text-[0.8rem] text-lightning hover:text-ember px-4 py-3 rounded-xl border border-[rgba(0,212,255,0.25)] hover:border-ember/50 transition text-center"
            : "font-label uppercase tracking-[0.2em] text-[0.72rem] text-lightning hover:text-ember px-3 py-1.5 transition"
        }
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        onClick={onAction}
        className={
          stacked
            ? "font-label font-bold uppercase tracking-[0.25em] text-[0.8rem] text-white px-4 py-3 rounded-xl transition hover:opacity-90 text-center"
            : "font-label font-bold uppercase tracking-[0.2em] text-[0.72rem] text-white px-3 py-1.5 rounded-full transition hover:opacity-90"
        }
        style={{
          background: "linear-gradient(90deg, #ff6b1a, #ff9d57)",
          boxShadow: stacked
            ? "0 6px 18px rgba(255,107,26,0.35)"
            : "0 4px 12px rgba(255,107,26,0.3)",
        }}
      >
        Sign Up
      </Link>
    </div>
  );
}
