"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/auth";

export default function HomeCTA() {
  const { user, mounted } = useAuth();

  // Loading state placeholder
  if (!mounted) {
    return (
      <div className="mt-8 h-12 w-48 rounded-full bg-surface animate-pulse" />
    );
  }

  if (user) {
    return (
      <Link
        href="/blog/create"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        Write a Post
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-3.5 text-sm font-bold text-foreground transition-all hover:border-foreground hover:bg-background hover:scale-105 active:scale-95"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
      Sign in to write
    </Link>
  );
}
