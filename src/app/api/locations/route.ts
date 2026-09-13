import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const villas = await prisma.villa.findMany({
      where: { isActive: true },
      select: { location: true },
      distinct: ['location'],
    })
    const locations = [...new Set(villas.map(v => v.location).filter(Boolean))]
    return NextResponse.json({ locations })
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json({ locations: [] }, { status: 500 })
  }
}
