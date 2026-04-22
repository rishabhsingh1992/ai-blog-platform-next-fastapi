"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Field({
  id,
  label,
  type,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
      />
    </div>
  );
}

function DemoCredentials() {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3 text-sm">
      <p className="font-medium">Demo credentials</p>
      <p className="mt-1 text-muted">
        Username: <code className="font-mono text-foreground">admin</code>
      </p>
      <p className="text-muted">
        Password: <code className="font-mono text-foreground">password</code>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const success = login(username, password);

    if (success) {
      // Redirect to the page the user came from, or the homepage.
      const params = new URLSearchParams(window.location.search);
      router.push(params.get("from") ?? "/");
    } else {
      setError("Incorrect username or password.");
    }
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-2 text-muted">Sign in to manage your blog.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}

        <Field
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
        />
        <Field
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6">
        <DemoCredentials />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-foreground">
          ← Back to blog
        </Link>
      </p>
    </div>
  );
}
