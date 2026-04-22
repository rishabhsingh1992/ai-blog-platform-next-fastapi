import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import AuthNav from "./auth-nav";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight hover:text-accent transition-colors"
        >
          My Blog
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Posts
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <ThemeToggle />
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}
