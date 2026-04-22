import type { Metadata } from 'next'
import { RequireAuth } from '@/app/lib/auth'
import SettingsPanel from './settings-panel'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsPage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-2 text-muted">Manage your account and preferences.</p>
        </div>
        <SettingsPanel />
      </div>
    </RequireAuth>
  )
}
