"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-[60px] bg-[rgba(0,7,18,0.92)] backdrop-blur border-b border-[rgba(0,212,255,0.15)] px-6 flex items-center gap-0 overflow-x-auto">
      <Link
        href="/"
        className="font-display uppercase tracking-[0.12em] text-[0.85rem] text-lightning mr-6 whitespace-nowrap"
        style={{ textShadow: "0 0 18px rgba(0,212,255,0.5)" }}
      >
        ✦ Wonder
      </Link>
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
      <div className="ml-auto pl-4">
        <AuthStatus />
      </div>
    </nav>
  );
}

function AuthStatus() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <span className="font-label text-[0.75rem] text-muted uppercase tracking-[0.2em]">
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3 whitespace-nowrap">
        <span className="font-body text-[0.8rem] text-muted hidden sm:inline">
          {session.user.email}
        </span>
        <button
          type="button"
          onClick={async () => {
            await signOut();
            router.push("/");
            router.refresh();
          }}
          className="font-label uppercase tracking-[0.2em] text-[0.72rem] text-muted hover:text-ember px-3 py-1.5 rounded-full border border-[rgba(0,212,255,0.2)] hover:border-ember/50 transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <Link
        href="/signin"
        className="font-label uppercase tracking-[0.2em] text-[0.72rem] text-lightning hover:text-ember px-3 py-1.5 transition"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="font-label font-bold uppercase tracking-[0.2em] text-[0.72rem] text-white px-3 py-1.5 rounded-full transition hover:opacity-90"
        style={{
          background: "linear-gradient(90deg, #ff6b1a, #ff9d57)",
          boxShadow: "0 4px 12px rgba(255,107,26,0.3)",
        }}
      >
        Sign Up
      </Link>
    </div>
  );
}
