import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { bedrooms, basePrice, weekendPrice } = body

    if (!bedrooms || !basePrice) {
      return NextResponse.json(
        { error: 'Bedrooms and basePrice are required' },
        { status: 400 }
      )
    }

    // Build update data
    const updateData: any = {
      basePrice: Number(basePrice),
    }

    if (weekendPrice !== null && weekendPrice !== undefined && weekendPrice !== '') {
      updateData.weekendPrice = Number(weekendPrice)
    }

    // Update all villas with the specified bedroom count
    const result = await prisma.villa.updateMany({
      where: {
        bedrooms: Number(bedrooms),
      },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      count: result.count,
      message: `Updated ${result.count} villas`,
    })
  } catch (error) {
    console.error('Error bulk updating prices:', error)
    return NextResponse.json(
      { error: 'Failed to update prices' },
      { status: 500 }
    )
  }
}
