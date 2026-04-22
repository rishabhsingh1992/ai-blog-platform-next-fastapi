"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth";

// Shown in the header. Renders different UI depending on whether the user
// is logged in. Returns a fixed-size placeholder while localStorage loads
// to avoid a layout shift in the header.

export default function AuthNav() {
  const { user, mounted, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  // Hold the space while we wait for localStorage to be read.
  if (!mounted) {
    return <div className="h-8 w-24" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/blog/create"
        className="inline-flex items-center rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
      >
        + New Post
      </Link>
      <Link
        href="/profile"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        Profile
      </Link>
      <Link
        href="/settings"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        Settings
      </Link>
      <button
        onClick={handleLogout}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        Sign out
      </button>
    </div>
  );
}
