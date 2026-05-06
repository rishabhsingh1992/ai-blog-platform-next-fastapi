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
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function NotificationToggle({
  label,
  description,
  active,
  onToggle,
}: {
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 group">
      <div className="max-w-[80%]">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted leading-normal">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent/20 ${
          active ? "bg-accent" : "bg-border"
        }`}
        role="switch"
        aria-checked={active}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            active ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
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
    <div className="inline-flex rounded-xl border border-border bg-surface p-1 gap-1">
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
            value === option.value
              ? "bg-foreground text-background shadow-sm"
              : "text-muted hover:text-foreground hover:bg-border/30"
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
    <div className="bg-surface border border-border rounded-xl p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
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
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    mentions: true,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getStoredTheme());
    const saved = localStorage.getItem("notifications");
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse notifications", e);
      }
    }
    setMounted(true);
  }, []);

  function handleThemeChange(next: ThemePreference) {
    setTheme(next);
    applyTheme(next);
  }

  function toggleNotification(key: keyof typeof notifications) {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);
    localStorage.setItem("notifications", JSON.stringify(next));
  }

  function handleSignOut() {
    logout();
    router.push("/");
  }

  if (!mounted) return (
    <div className="space-y-12 animate-pulse">
      <div className="h-32 bg-surface rounded-2xl" />
      <div className="h-48 bg-surface rounded-2xl" />
    </div>
  );

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Appearance"
        description="Customize your viewing experience with light, dark, or system themes."
      >
        <ThemeSelector value={theme} onChange={handleThemeChange} />
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Choose how you want to be notified about new activity."
      >
        <div className="bg-surface border border-border rounded-2xl px-6 py-2 divide-y divide-border">
          <NotificationToggle
            label="Email Notifications"
            description="Receive weekly digests and important updates via email."
            active={notifications.email}
            onToggle={() => toggleNotification("email")}
          />
          <NotificationToggle
            label="Browser Push"
            description="Get real-time alerts in your browser when someone interacts with your posts."
            active={notifications.browser}
            onToggle={() => toggleNotification("browser")}
          />
          <NotificationToggle
            label="Mentions"
            description="Notify me whenever someone mentions my username in a comment."
            active={notifications.mentions}
            onToggle={() => toggleNotification("mentions")}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Account"
        description="View your account information and manage your session."
      >
        <div className="space-y-4">
          <Field label="Connected Account" value={user ?? "Anonymous User"} />
          <div className="pt-2">
            <button
              onClick={handleSignOut}
              className="w-full sm:w-auto flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-muted transition-all hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-500 active:scale-[0.98]"
            >
              Sign out of account
            </button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
