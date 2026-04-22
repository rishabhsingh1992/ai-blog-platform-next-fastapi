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
// Sub-components
// ---------------------------------------------------------------------------

function Avatar({ initial }: { initial: string }) {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white">
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      displayName: displayName.trim() || initial.displayName,
      bio: bio.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1 space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="displayName" className="block text-sm font-medium">
          Display name
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="bio" className="block text-sm font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="Tell readers a bit about yourself."
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Save changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
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

  if (!mounted) return null;

  const initial = (user ?? "?")[0].toUpperCase();

  return (
    <div className="space-y-12">
      {/* Profile header */}
      <div>
        <div className="flex items-start gap-5">
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
                <h1 className="text-2xl font-bold tracking-tight">
                  {profile.displayName}
                </h1>
                <p className="mt-0.5 text-sm text-muted">@{user}</p>
                {profile.bio ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="mt-3 text-sm italic text-muted">No bio yet.</p>
                )}
                <button
                  onClick={() => setEditing(true)}
                  className="mt-4 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  Edit profile
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-6 flex gap-6 border-t border-border pt-6">
          <div className="flex items-baseline gap-1.5">
            <dt className="text-sm text-muted">Posts</dt>
            <dd className="text-2xl font-bold">{posts.length}</dd>
          </div>
        </dl>
      </div>

      {/* Posts */}
      <div>
        <h2 className="mb-6 text-lg font-semibold">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-sm text-muted">No posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
