"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  );
}

// ---------------------------------------------------------------------------
// AuthNav
// ---------------------------------------------------------------------------

export default function AuthNav({ isMobile }: { isMobile?: boolean }) {
  const { user, mounted, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setIsOpen(false);
    router.push("/");
  }

  if (!mounted) {
    return <div className="h-9 w-24 rounded-full bg-surface animate-pulse" />;
  }

  if (!user) {
    return (
      <div className={`flex items-center gap-3 ${isMobile ? "flex-col w-full" : ""}`}>
        <Link
          href="/login"
          className={`text-sm font-medium text-muted transition-colors hover:text-foreground ${isMobile ? "w-full text-center py-2" : ""}`}
        >
          Sign in
        </Link>
        <Link
          href="/login"
          className={`inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95 ${isMobile ? "w-full" : ""}`}
        >
          Get Started
        </Link>
      </div>
    );
  }

  const initial = user[0].toUpperCase();

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
            {initial}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Account</p>
            <p className="text-xs text-muted truncate max-w-[150px]">{user}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href="/blog/create"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground bg-accent/10 text-accent transition-colors active:bg-accent/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            New Post
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-muted transition-colors active:bg-surface"
          >
            <ProfileIcon />
            Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-muted transition-colors active:bg-surface"
          >
            <SettingsIcon />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-red-500 transition-colors active:bg-red-500/10"
          >
            <LogoutIcon />
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/blog/create"
        className="hidden lg:inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-all hover:border-accent hover:text-accent hover:shadow-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        New Post
      </Link>
      
      <div className="h-6 w-px bg-border/60 hidden lg:block" />

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 ring-offset-2 ring-offset-background ${isOpen ? "ring-2 ring-accent" : ""}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {initial}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-border bg-background p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-[100] backdrop-blur-xl bg-background/95">
            <div className="px-3 py-3 border-b border-border/50 mb-1">
              <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1">Authenticated As</p>
              <p className="text-sm font-bold truncate text-foreground">{user}</p>
            </div>
            
            <div className="space-y-0.5">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-all hover:bg-surface hover:text-foreground group"
              >
                <div className="text-muted transition-colors group-hover:text-accent">
                  <ProfileIcon />
                </div>
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-all hover:bg-surface hover:text-foreground group"
              >
                <div className="text-muted transition-colors group-hover:text-accent">
                  <SettingsIcon />
                </div>
                Settings
              </Link>
            </div>

            <div className="mt-1 border-t border-border/50 pt-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10 active:scale-95 group"
              >
                <div className="text-red-500 transition-transform group-hover:translate-x-0.5">
                  <LogoutIcon />
                </div>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
