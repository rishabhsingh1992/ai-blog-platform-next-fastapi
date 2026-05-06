"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/auth";
import PostCard from "@/app/ui/post-card";
import type { Post } from "@/app/lib/posts";

// ---------------------------------------------------------------------------
// Profile data — persisted to localStorage
// ---------------------------------------------------------------------------

const PROFILE_KEY = "blog_profile";

type ProfileData = {
  displayName: string;
  bio: string;
  twitter?: string;
  github?: string;
  website?: string;
};

function loadProfile(username: string): ProfileData {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw) as ProfileData;
  } catch {
    // ignore malformed data
  }
  return { displayName: username, bio: "" };
}

function saveProfile(data: ProfileData) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Avatar({ initial }: { initial: string }) {
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-accent to-indigo-600 text-3xl font-bold text-white shadow-lg shadow-accent/20 border-4 border-background">
      {initial}
    </div>
  );
}

function EditForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: ProfileData;
  onSave: (data: ProfileData) => void;
  onCancel: () => void;
}) {
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [bio, setBio] = useState(initial.bio);
  const [twitter, setTwitter] = useState(initial.twitter || "");
  const [github, setGithub] = useState(initial.github || "");
  const [website, setWebsite] = useState(initial.website || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      displayName: displayName.trim() || initial.displayName,
      bio: bio.trim(),
      twitter: twitter.trim(),
      github: github.trim(),
      website: website.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-6 bg-surface border border-border rounded-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="displayName" className="block text-sm font-semibold">
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="twitter" className="block text-sm font-semibold">
            Twitter Handle
          </label>
          <input
            id="twitter"
            type="text"
            value={twitter}
            placeholder="@username"
            onChange={(e) => setTwitter(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="github" className="block text-sm font-semibold">
            GitHub Username
          </label>
          <input
            id="github"
            type="text"
            value={github}
            placeholder="username"
            onChange={(e) => setGithub(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="website" className="block text-sm font-semibold">
            Personal Website
          </label>
          <input
            id="website"
            type="url"
            value={website}
            placeholder="https://example.com"
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="bio" className="block text-sm font-semibold">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="Tell readers a bit about yourself."
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-xl bg-foreground px-6 py-2.5 text-sm font-bold text-background transition-transform hover:scale-105 active:scale-95"
        >
          Save Profile
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-border/30 hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// ProfileView
// ---------------------------------------------------------------------------

export default function ProfileView({ posts }: { posts: Post[] }) {
  const { user } = useAuth();

  const [profile, setProfile] = useState<ProfileData>({ displayName: "", bio: "" });
  const [editing, setEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (user) setProfile(loadProfile(user));
    setMounted(true);
  }, [user]);

  function handleSave(data: ProfileData) {
    setProfile(data);
    saveProfile(data);
    setEditing(false);
  }

  if (!mounted) return (
    <div className="space-y-12 animate-pulse">
      <div className="flex items-center gap-6">
        <div className="h-24 w-24 rounded-3xl bg-surface" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-48 bg-surface rounded-lg" />
          <div className="h-4 w-32 bg-surface rounded-lg" />
        </div>
      </div>
      <div className="h-64 bg-surface rounded-3xl" />
    </div>
  );

  const initial = (user ?? "?")[0].toUpperCase();

  return (
    <div className="space-y-12">
      {/* Profile header */}
      <div className="relative">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <Avatar initial={initial} />

          <div className="flex-1 min-w-0">
            {editing ? (
              <EditForm
                initial={profile}
                onSave={handleSave}
                onCancel={() => setEditing(false)}
              />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                      {profile.displayName}
                    </h1>
                    <p className="mt-1 text-base text-muted font-medium">@{user}</p>
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="rounded-full border border-border px-4 py-2 text-xs font-bold transition-all hover:border-accent hover:text-accent hover:shadow-sm active:scale-95"
                  >
                    Edit Profile
                  </button>
                </div>
                
                {profile.bio ? (
                  <p className="mt-4 text-base leading-relaxed text-muted max-w-2xl">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="mt-4 text-sm italic text-muted">No bio yet. Click edit to tell your story.</p>
                )}

                {/* Social Links */}
                <div className="mt-6 flex flex-wrap gap-4">
                  {profile.twitter && (
                    <a href={`https://twitter.com/${profile.twitter.replace('@', '')}`} target="_blank" rel="noopener" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-blue-400 transition-colors">
                      <TwitterIcon />
                      {profile.twitter}
                    </a>
                  )}
                  {profile.github && (
                    <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors">
                      <GithubIcon />
                      {profile.github}
                    </a>
                  )}
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors">
                      <LinkIcon />
                      {new URL(profile.website).hostname}
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 flex gap-8 border-t border-border pt-8">
          <div>
            <p className="text-2xl font-black text-foreground">{posts.length}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted">Articles</p>
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">1.2k</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted">Reads</p>
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">84</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted">Saved</p>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-tight">Post History</h2>
          <span className="text-xs font-bold text-muted bg-surface px-3 py-1 rounded-full border border-border">
            Recent activity
          </span>
        </div>
        
        {posts.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-border rounded-3xl bg-surface/30">
            <p className="text-muted">You haven&apos;t published any posts yet.</p>
          </div>
        ) : (
          <div className="grid gap-12">
            {posts.map((post) => (
              <div key={post.slug} className="group relative">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
