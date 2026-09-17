'use client'

import { AdminDashboard } from './admin-dashboard'

interface Villa {
  id: string
  title: string
  slug: string
  location: string
  address: string
  capacity: number
  bedrooms: number
  bathrooms: number
  basePrice: number
  weekendPrice: number | null
  discountPercent: number
  isActive: boolean
  featured: boolean
  rating: number
  reviewCount: number
  tagline: string | null
  customBadge: string | null
  travelokaUrl: string | null
  googleMapsEmbedUrl: string | null
  googleMapsShareUrl: string | null
  customUrl: string | null
  images: string
  amenities: string
  houseRules: string | null
  nearbyAttractions: string | null
  description: string
  totalUnits: number
  checkInTime: string
  checkOutTime: string
  discountThresholdNights: number | null
  createdAt: Date
  updatedAt: Date
}

interface SiteSettings {
  id: string
  websiteTitle: string
  primaryColor: string
  defaultWA: string
  globalDiscountNotice: string | null
  createdAt: Date
  updatedAt: Date
}

interface AdminProtectedProps {
  villas: Villa[]
  settings?: SiteSettings | null
}

export function AdminProtected({ villas, settings }: AdminProtectedProps) {
  // Middleware handles authentication, so we can just render the dashboard
  const defaultSettings: SiteSettings = {
    id: '',
    websiteTitle: 'VillaBatuMurah.ID',
    primaryColor: '#0194f3',
    defaultWA: '',
    globalDiscountNotice: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return <AdminDashboard villas={villas} settings={settings || defaultSettings} />
}
