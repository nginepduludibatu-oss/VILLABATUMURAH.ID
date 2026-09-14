import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // Check if settings exist
    const existingSettings = await prisma.siteSettings.findFirst()
    
    let settings
    if (existingSettings) {
      // Update existing settings
      settings = await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: {
          websiteTitle: body.websiteTitle,
          primaryColor: body.primaryColor,
          defaultWA: body.defaultWA,
          globalDiscountNotice: body.globalDiscountNotice || null,
        },
      })
    } else {
      // Create new settings
      settings = await prisma.siteSettings.create({
        data: {
          websiteTitle: body.websiteTitle,
          primaryColor: body.primaryColor,
          defaultWA: body.defaultWA,
          globalDiscountNotice: body.globalDiscountNotice || null,
        },
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      settings,
      message: 'Pengaturan berhasil disimpan' 
    })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ error: 'Failed to save settings', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
