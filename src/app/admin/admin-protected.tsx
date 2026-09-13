'use client'

import { AdminDashboard } from './admin-dashboard'

interface AdminProtectedProps {
  villas: any[]
  settings: any
}

export function AdminProtected({ villas, settings }: AdminProtectedProps) {
  // Middleware handles authentication, so we can just render the dashboard
  return <AdminDashboard villas={villas} settings={settings} />
}
