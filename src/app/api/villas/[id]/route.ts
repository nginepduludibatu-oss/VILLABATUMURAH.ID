import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const villa = await prisma.villa.findUnique({
      where: { id: params.id },
    })
    
    if (!villa) {
      return NextResponse.json({ error: 'Villa not found' }, { status: 404 })
    }
    
    return NextResponse.json(villa)
  } catch (error) {
    console.error('Error fetching villa:', error)
    return NextResponse.json({ error: 'Failed to fetch villa' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.slug || !body.location || !body.capacity || !body.bedrooms || !body.bathrooms) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Update villa
    const updatedVilla = await prisma.villa.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        tagline: body.tagline || null,
        description: body.description,
        location: body.location,
        address: body.address,
        capacity: Number(body.capacity),
        bedrooms: Number(body.bedrooms),
        bathrooms: Number(body.bathrooms),
        basePrice: Number(body.basePrice),
        weekendPrice: body.weekendPrice ? Number(body.weekendPrice) : null,
        discountPercent: Number(body.discountPercent) || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
        featured: body.featured !== undefined ? body.featured : false,
        travelokaUrl: body.travelokaUrl || null,
        customUrl: body.customUrl || null,
        rating: Number(body.rating) || 4.9,
        reviewCount: Number(body.reviewCount) || 0,
        images: typeof body.images === 'string' ? body.images : JSON.stringify(body.images),
        amenities: typeof body.amenities === 'string' ? body.amenities : JSON.stringify(body.amenities),
        houseRules: body.houseRules ? (typeof body.houseRules === 'string' ? body.houseRules : JSON.stringify(body.houseRules)) : null,
        nearbyAttractions: body.nearbyAttractions ? (typeof body.nearbyAttractions === 'string' ? body.nearbyAttractions : JSON.stringify(body.nearbyAttractions)) : null,
      },
    })
    
    return NextResponse.json({ 
      success: true, 
      villa: updatedVilla,
      message: 'Villa berhasil diperbarui' 
    })
  } catch (error) {
    console.error('Error updating villa:', error)
    return NextResponse.json({ error: 'Failed to update villa' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.villa.delete({
      where: { id: params.id },
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Villa berhasil dihapus' 
    })
  } catch (error) {
    console.error('Error deleting villa:', error)
    return NextResponse.json({ error: 'Failed to delete villa' }, { status: 500 })
  }
}
