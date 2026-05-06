'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { createPost, type CreatePostState } from '@/app/actions'
import { useToast } from '@/app/lib/toast'

const TAGS = ['Tutorial', 'React', 'CSS', 'JavaScript', 'TypeScript', 'Other']

const initialState: CreatePostState = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-xl bg-foreground px-8 py-3 text-sm font-bold text-background transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          Publishing...
        </span>
      ) : 'Publish Post'}
    </button>
  )
}

export default function CreatePostForm() {
  const [state, formAction] = useActionState(createPost, initialState)
  const { showToast } = useToast()

  useEffect(() => {
    if (state.message) {
      const isError = state.errors && Object.keys(state.errors).length > 0;
      showToast(state.message, isError ? "error" : "success");
    }
  }, [state.message, state.errors, showToast]);

  return (
    <form action={formAction} className="space-y-8">


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
