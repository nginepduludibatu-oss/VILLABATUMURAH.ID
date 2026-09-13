import { prisma } from '@/lib/prisma'
import { AdminProtected } from './admin-protected'

async function getVillas() {
  try {
    const villas = await prisma.villa.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return villas
  } catch (error) {
    console.error('Error fetching villas:', error)
    return []
  }
}

async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export default async function AdminPage() {
  const villas = await getVillas()
  const settings = await getSiteSettings()

  return <AdminProtected villas={villas} settings={settings} />
}