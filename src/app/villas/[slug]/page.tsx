import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BookingSidebar } from '@/components/booking-sidebar'
import { ImageGallery } from '@/components/image-gallery'
import { prisma } from '@/lib/prisma'
import { 
  MapPin, Users, Bed, Bath, Clock, Star, Heart, Share2, 
  Navigation, Check, X 
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getVilla(slug: string) {
  try {
    const villa = await prisma.villa.findUnique({
      where: { slug },
    })
    return villa
  } catch (error) {
    console.error('Error fetching villa:', error)
    return null
  }
}

export const dynamic = 'force-dynamic'

export default async function VillaDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const villa = await getVilla(params.slug)

  if (!villa) {
    notFound()
  }

  const images = JSON.parse(villa.images)
  const amenities = JSON.parse(villa.amenities)
  const houseRules = villa.houseRules ? JSON.parse(villa.houseRules) : []
  const nearbyAttractions = villa.nearbyAttractions ? JSON.parse(villa.nearbyAttractions) : []

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discountedPrice = villa.discountPercent 
    ? villa.basePrice * (1 - villa.discountPercent / 100)
    : villa.basePrice

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-slate-600">
          <Link href="/" className="hover:text-emerald-600">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/villas" className="hover:text-emerald-600">Villa</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{villa.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Photo Gallery */}
            <div className="mb-8">
              <ImageGallery 
                images={images}
                title={villa.title}
                customBadge={villa.customBadge || undefined}
                discountPercent={villa.discountPercent || undefined}
              />
            </div>

            {/* Title & Basic Info */}
            <div className="mb-8">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {villa.title}
                  </h1>
                  {villa.tagline && (
                    <p className="text-lg text-slate-600 mb-3">
                      {villa.tagline}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{villa.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-slate-900">{villa.rating}</span>
                      <span className="ml-1">({villa.reviewCount} ulasan)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Quick Info Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
                  <Users className="h-5 w-5 text-traveloka" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{villa.capacity}</p>
                    <p className="text-xs text-slate-600">Tamu</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
                  <Bed className="h-5 w-5 text-traveloka" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{villa.bedrooms}</p>
                    <p className="text-xs text-slate-600">Kamar Tidur</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
                  <Bath className="h-5 w-5 text-traveloka" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{villa.bathrooms}</p>
                    <p className="text-xs text-slate-600">Kamar Mandi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
                  <Clock className="h-5 w-5 text-traveloka" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{villa.checkInTime}</p>
                    <p className="text-xs text-slate-600">Check-in</p>
                  </div>
                </div>
              </div>

              {/* Traveloka Booking Button */}
              {villa.travelokaUrl && (
                <a
                  href={villa.travelokaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors mb-6"
                >
                  <span className="font-semibold">Pesan via Traveloka</span>
                  <span className="text-xs opacity-80">Platform Terpercaya</span>
                </a>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Tentang Villa</h2>
              <p className="text-slate-600 leading-relaxed">
                {villa.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Fasilitas</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            {houseRules.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Aturan Rumah</h2>
                <Accordion type="single" collapsible>
                  <AccordionItem value="rules">
                    <AccordionTrigger className="text-slate-900">Lihat Aturan</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {houseRules.map((rule: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                            <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* Google Maps */}
            {villa.googleMapsEmbedUrl && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Lokasi</h2>
                <div className="relative h-80 overflow-hidden rounded-lg mb-4">
                  <iframe
                    src={villa.googleMapsEmbedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {villa.googleMapsShareUrl && (
                  <a
                    href={villa.googleMapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-traveloka hover:text-blue-600 font-medium"
                  >
                    <Navigation className="h-4 w-4" />
                    Buka Rute di Google Maps
                  </a>
                )}
              </div>
            )}

            {/* Nearby Attractions */}
            {nearbyAttractions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Tempat Wisata Terdekat</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearbyAttractions.map((attraction: any, index: number) => (
                    <Card key={index} className="bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">{attraction.name}</p>
                            <p className="text-sm text-slate-600">{attraction.distance}</p>
                          </div>
                          <MapPin className="h-5 w-5 text-slate-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar
              villaTitle={villa.title}
              location={villa.location}
              basePrice={villa.basePrice}
              discountedPrice={discountedPrice}
              discountPercent={villa.discountPercent || 0}
              capacity={villa.capacity}
              slug={villa.slug}
              mainImage={images[0]}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}