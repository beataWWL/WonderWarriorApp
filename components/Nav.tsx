"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classes } from "@/lib/classes";

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
    </nav>
  );
}
