import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { VillaCard } from '@/components/villa-card'
import { VillasFilter } from '@/components/villas-filter'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { Search } from 'lucide-react'

async function getVillas(searchParams: {
  q?: string
  location?: string
  guests?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
  amenities?: string
  sortBy?: string
}) {
  const where: any = {
    isActive: true,
  }

  // Search query - Parse natural language
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase()
    
    // Check for capacity mentions (e.g., "10 orang", "5 guests", "untuk 10 orang")
    const capacityMatch = query.match(/(\d+)\s*(orang|guests|tamu|people)/i)
    if (capacityMatch) {
      where.capacity = { gte: Number(capacityMatch[1]) }
    }
    
    // Check for bedroom mentions (e.g., "3 kamar", "2 bedroom", "untuk 3 kamar")
    const bedroomMatch = query.match(/(\d+)\s*(kamar|bedroom|bed)/i)
    if (bedroomMatch) {
      where.bedrooms = { equals: Number(bedroomMatch[1]) }
    }
    
    // Check for pool mentions
    if (query.includes('pool') || query.includes('kolam') || query.includes('renang')) {
      where.tagline = { contains: 'Pool' }
    }
    
    // If no specific filters found, search in title/description/location
    if (!capacityMatch && !bedroomMatch && !query.includes('pool') && !query.includes('kolam')) {
      where.OR = [
        { title: { contains: searchParams.q } },
        { description: { contains: searchParams.q } },
        { location: { contains: searchParams.q } },
        { tagline: { contains: searchParams.q } },
      ]
    }
  }

  // Location filter - exact match
  if (searchParams.location) {
    where.location = { equals: searchParams.location }
  }

  // Guests filter
  if (searchParams.guests) {
    where.capacity = { gte: Number(searchParams.guests) }
  }

  // Bedrooms filter - exact match for specific value
  if (searchParams.bedrooms) {
    const bedroomsValue = Number(searchParams.bedrooms)
    console.log('Bedrooms filter applied:', bedroomsValue, 'type:', typeof bedroomsValue)
    // Use exact match instead of gte for dropdown filter
    where.bedrooms = { equals: bedroomsValue }
  }

  // Sorting
  let orderBy: any = { featured: 'desc' }
  if (searchParams.sortBy === 'price-asc') {
    orderBy = { basePrice: 'asc' }
  } else if (searchParams.sortBy === 'price-desc') {
    orderBy = { basePrice: 'desc' }
  } else if (searchParams.sortBy === 'rating') {
    orderBy = { rating: 'desc' }
  }

  try {
    const villas = await prisma.villa.findMany({
      where,
      orderBy,
    })
    return villas
  } catch (error) {
    console.error('Error fetching villas:', error)
    return []
  }
}

async function getLocations() {
  try {
    const villas = await prisma.villa.findMany({
      where: { isActive: true },
      select: { location: true },
      distinct: ['location'],
    })
    const locations = [...new Set(villas.map(v => v.location).filter(Boolean))]
    return locations
  } catch (error) {
    console.error('Error fetching locations:', error)
    return []
  }
}

async function getMaxCapacity() {
  try {
    const villa = await prisma.villa.findFirst({
      where: { isActive: true },
      orderBy: { capacity: 'desc' },
    })
    return villa?.capacity || 10
  } catch (error) {
    return 10
  }
}

async function VillasPageContent({
  searchParams,
}: {
  searchParams: {
    q?: string
    location?: string
    guests?: string
    minPrice?: string
    maxPrice?: string
    bedrooms?: string
    amenities?: string
    sortBy?: string
  }
}) {
  const villas = await getVillas(searchParams)
  const locations = await getLocations()
  const maxCapacity = await getMaxCapacity()

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Semua Villa
          </h1>
          <p className="text-muted-foreground">
            {villas.length} villa ditemukan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <VillasFilter locations={locations} />
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            {villas.length === 0 ? (
              <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Tidak ada villa yang ditemukan
                </h3>
                <p className="text-muted-foreground mb-6">
                  Coba ubah filter pencarian Anda untuk menemukan villa yang sesuai.
                </p>
                <div className="rounded-lg bg-emerald-50 p-6 mb-6">
                  <h4 className="font-semibold text-emerald-700 mb-2">
                    Bantu Carikan Villa?
                  </h4>
                  <p className="text-sm text-emerald-600 mb-4">
                    Tim kami akan membantu Anda menemukan villa yang sempurna sesuai kebutuhan.
                  </p>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => window.open('https://wa.me/6281216919381?text=Halo%20Admin,%20saya%20ingin%20bertanya%20tentang%20villa%20di%20VillaBatuMurah.ID', '_blank')}
                  >
                    Chat dengan Admin
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {villas.map((villa) => (
                  <VillaCard key={villa.id} villa={{
                    ...villa,
                    tagline: villa.tagline || undefined,
                    customBadge: villa.customBadge || undefined,
                    discountPercent: villa.discountPercent || undefined
                  }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default async function VillasPage({
  searchParams,
}: {
  searchParams: {
    q?: string
    location?: string
    guests?: string
    minPrice?: string
    maxPrice?: string
    bedrooms?: string
    amenities?: string
    sortBy?: string
  }
}) {
  return <VillasPageContent searchParams={searchParams} />
}