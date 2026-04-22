"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth";

// ---------------------------------------------------------------------------
// Theme helpers
// ---------------------------------------------------------------------------

type ThemePreference = "light" | "dark" | "system";

function getStoredTheme(): ThemePreference {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return "system";
}

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  if (preference === "dark") {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else if (preference === "light") {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    localStorage.removeItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-8 last:border-0 last:pb-0">
      <div className="mb-5">
        <h2 className="text-base font-semibold">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function ThemeSelector({
  value,
  onChange,
}: {
  value: ThemePreference;
  onChange: (next: ThemePreference) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-border p-1 gap-1">
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            value === option.value
              ? "bg-accent text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SettingsPanel
// ---------------------------------------------------------------------------

export default function SettingsPanel() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [theme, setTheme] = useState<ThemePreference>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getStoredTheme());
    setMounted(true);
  }, []);

  function handleThemeChange(next: ThemePreference) {
    setTheme(next);
    applyTheme(next);
  }

  function handleSignOut() {
    logout();
    router.push("/");
  }

  if (!mounted) return null;

  return (
    <div>
      <SettingsSection
        title="Appearance"
        description="Choose how the interface looks to you."
      >
        <ThemeSelector value={theme} onChange={handleThemeChange} />
      </SettingsSection>

      <SettingsSection
        title="Account"
        description="Your account details."
      >
        <div className="space-y-6">
          <Field label="Username" value={user ?? ""} />
          <div>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-red-500 hover:text-red-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
