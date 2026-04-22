'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { createPost, type CreatePostState } from '@/app/actions'

const TAGS = ['Tutorial', 'React', 'CSS', 'JavaScript', 'TypeScript', 'Other']

const initialState: CreatePostState = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? 'Publishing…' : 'Publish Post'}
    </button>
  )
}

export default function CreatePostForm() {
  const [state, formAction] = useActionState(createPost, initialState)

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <div
          role="status"
          className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground"
        >
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="My awesome post"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
          aria-describedby={state.errors?.title ? 'title-error' : undefined}
        />
        {state.errors?.title && (
          <p id="title-error" className="text-sm text-red-500">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="tag" className="block text-sm font-medium">
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
        >
          <option value="">— none —</option>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="block text-sm font-medium">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          placeholder="A short summary shown on the listing page…"
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium">
          Content <span className="text-accent">*</span>
        </label>
        <p className="text-xs text-muted">Markdown is supported.</p>
        <textarea
          id="content"
          name="content"
          required
          rows={16}
          placeholder="Write your post here…"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 font-mono text-sm placeholder:text-muted focus:border-accent focus:outline-none"
          aria-describedby={state.errors?.content ? 'content-error' : undefined}
        />
        {state.errors?.content && (
          <p id="content-error" className="text-sm text-red-500">
            {state.errors.content[0]}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <SubmitButton />
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
