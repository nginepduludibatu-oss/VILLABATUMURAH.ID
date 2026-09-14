import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSearch } from '@/components/hero-search'
import { VillaCard } from '@/components/villa-card'
import { FacilityFilters } from '@/components/facility-filters'
import { FlashSale } from '@/components/flash-sale'
import { Testimonials } from '@/components/testimonials'
import { prisma } from '@/lib/prisma'

async function getFeaturedVillas() {
  try {
    const villas = await prisma.villa.findMany({
      where: {
        featured: true,
        isActive: true,
      },
      orderBy: [
        { rating: 'desc' }
      ],
      take: 6,
    })
    return villas
  } catch (error) {
    console.error('Error fetching villas:', error)
    return []
  }
}

export default async function Home() {
  const featuredVillas = await getFeaturedVillas()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <HeroSearch />
        </section>

        {/* Flash Sale */}
        <section className="container mx-auto px-4">
          <FlashSale />
        </section>

        {/* Facility Filters */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Cari Berdasarkan Fasilitas
          </h2>
          <FacilityFilters />
        </section>

        {/* Featured Villas */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Villa Pilihan Terbaik
            </h2>
            <a
              href="/villas"
              className="text-traveloka hover:text-blue-600 font-medium"
            >
              Lihat Semua →
            </a>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVillas.map((villa) => (
              <VillaCard key={villa.id} villa={{
                ...villa,
                tagline: villa.tagline || undefined,
                customBadge: villa.customBadge || undefined,
                discountPercent: villa.discountPercent || undefined
              }} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-12">
          <Testimonials />
        </section>

        {/* Trust Signals */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { icon: '🏆', title: '1000+ Tamu Puas', description: 'Rating rata-rata 4.8/5' },
              { icon: '🔒', title: 'Pembayaran Aman', description: 'Transaksi terpercaya' },
              { icon: '📍', title: 'Lokasi Strategis', description: 'Dekat wisata populer' },
              { icon: '💬', title: 'CS 24/7', description: 'Bantuan kapan saja' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-3 text-4xl">{item.icon}</div>
                <h3 className="mb-2 font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}