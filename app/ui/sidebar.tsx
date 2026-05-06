"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/lib/auth";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  );
}

function PopularIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/popular", label: "Popular", icon: <PopularIcon /> },
  { href: "/bookmarks", label: "Bookmarks", icon: <BookmarkIcon /> },
  { href: "/about", label: "About", icon: <InfoIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = NAV_ITEMS.filter(item => {
    if (item.href === "/about" && user) return false;
    return true;
  });

  return (
    <aside className="hidden md:block w-60 shrink-0 sticky top-0 h-screen border-r border-border/60 bg-surface/10 backdrop-blur-sm px-4 py-8">
      <div className="mb-8 px-4">
        <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Navigation</p>
      </div>
      <nav>
        <ul className="space-y-1.5">
          {navItems.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-foreground text-background shadow-lg shadow-foreground/10"
                      : "text-muted hover:bg-surface hover:text-foreground active:scale-[0.98]"
                  }`}
                >
                  <span className={`transition-colors ${active ? "text-background" : "text-muted group-hover:text-accent"}`}>
                    {icon}
                  </span>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
