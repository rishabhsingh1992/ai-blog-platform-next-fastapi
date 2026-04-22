import type { Metadata } from 'next'
import Link from 'next/link'
import CreatePostForm from './create-post-form'
import { RequireAuth } from '@/app/lib/auth'

export const metadata: Metadata = {
  title: 'Create Post',
}

export default function CreatePostPage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <span aria-hidden>←</span> Back to posts
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Create Post</h1>
          <p className="mt-2 text-muted">Write and publish a new blog post.</p>
        </div>
        <CreatePostForm />
      </div>
    </RequireAuth>
  )
}
