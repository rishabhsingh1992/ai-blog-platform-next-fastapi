"use client";

// ---------------------------------------------------------------------------
// Simple demo authentication using localStorage.
//
// WARNING: This is not real security. Credentials are hardcoded and the
// session lives only in the browser. Use a proper auth library (e.g. Auth.js)
// before deploying to production.
// ---------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Demo credentials
// ---------------------------------------------------------------------------

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "password";
const STORAGE_KEY = "blog_auth_user";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type AuthContextValue = {
  user: string | null; // null = not logged in
  mounted: boolean; // false until localStorage has been read
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider — place this once near the root of the app
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Read the saved session from localStorage after the component mounts.
  // We can't do this on the server, so mounted stays false during SSR.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setUser(saved);
    setMounted(true);
  }, []);

  function login(username: string, password: string): boolean {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setUser(username);
      localStorage.setItem(STORAGE_KEY, username);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, mounted, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook — use this anywhere inside AuthProvider to read auth state
// ---------------------------------------------------------------------------

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ---------------------------------------------------------------------------
// RequireAuth — wraps a page's content and redirects to /login if the user
// is not authenticated. Returns null while the session is being loaded.
// ---------------------------------------------------------------------------

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, mounted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !user) {
      router.replace("/login?from=" + window.location.pathname);
    }
  }, [user, mounted, router]);

  if (!mounted || !user) return null;

  return <>{children}</>;
}
