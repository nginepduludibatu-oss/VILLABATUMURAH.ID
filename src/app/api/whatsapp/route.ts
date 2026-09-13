import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    const whatsappNumber = settings?.defaultWA || '6281234567890'
    
    return NextResponse.json({ whatsappNumber })
  } catch (error) {
    console.error('Error fetching WhatsApp number:', error)
    return NextResponse.json({ whatsappNumber: '6281234567890' })
  }
}
