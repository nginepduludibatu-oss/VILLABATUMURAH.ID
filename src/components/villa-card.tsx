'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, MapPin, Users, Bed, Bath } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useWishlistStore } from '@/store/wishlist-store'

interface VillaCardProps {
  villa: {
    id: string
    slug: string
    title: string
    tagline?: string
    location: string
    basePrice: number
    discountPercent?: number
    customBadge?: string
    capacity: number
    bedrooms: number
    bathrooms: number
    images: string
    rating: number
    reviewCount: number
  }
}

export function VillaCard({ villa }: VillaCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const isWishlisted = isInWishlist(villa.id)
  
  const images = JSON.parse(villa.images)
  const mainImage = images[0]

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isWishlisted) {
      removeFromWishlist(villa.id)
    } else {
      addToWishlist({
        id: villa.id,
        slug: villa.slug,
        title: villa.title,
        location: villa.location,
        basePrice: villa.basePrice,
        images: villa.images,
        rating: villa.rating,
      })
    }
  }

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
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/villas/${villa.slug}`}>
        <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow bg-white">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={mainImage}
              alt={villa.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Custom Badge */}
            {villa.customBadge && (
              <Badge className="absolute top-3 left-3 bg-emerald-600">
                {villa.customBadge}
              </Badge>
            )}

            {/* Discount Badge */}
            {villa.discountPercent && villa.discountPercent > 0 && (
              <Badge className="absolute top-3 right-12 bg-red-500">
                -{villa.discountPercent}%
              </Badge>
            )}

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 bg-white/90 hover:bg-white ${
                isWishlisted ? 'text-red-500' : 'text-gray-600'
              }`}
              onClick={toggleWishlist}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>

            {/* Rating Badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-slate-900">{villa.rating}</span>
              <span className="text-muted-foreground">({villa.reviewCount})</span>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
                  {villa.title}
                </h3>
                {villa.tagline && (
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {villa.tagline}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{villa.location}</span>
            </div>

            <div className="mb-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{villa.capacity} tamu</span>
              </div>
              <div className="flex items-center">
                <Bed className="mr-1 h-4 w-4" />
                <span>{villa.bedrooms} kamar</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-1 h-4 w-4" />
                <span>{villa.bathrooms} kamar mandi</span>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                {villa.discountPercent && villa.discountPercent > 0 && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(villa.basePrice)}
                  </p>
                )}
                <p className="text-lg font-bold text-traveloka">
                  {formatPrice(discountedPrice)}
                  <span className="text-sm font-normal text-muted-foreground">/malam</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}