import type { Metadata } from 'next'
import { RequireAuth } from '@/app/lib/auth'
import { getAllPosts } from '@/app/lib/posts'
import ProfileView from './profile-view'

export const metadata: Metadata = {
  title: 'Profile',
}

export default function ProfilePage() {
  const posts = getAllPosts()

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <ProfileView posts={posts} />
      </div>
    </RequireAuth>
  )
}
