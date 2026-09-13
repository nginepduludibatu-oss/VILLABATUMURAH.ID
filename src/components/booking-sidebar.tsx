'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Phone, Share2 } from 'lucide-react'
import { generateWhatsAppBookingLink, generateWhatsAppShareLink } from '@/utils/whatsapp'

interface BookingSidebarProps {
  villaTitle: string
  location: string
  basePrice: number
  discountedPrice: number
  discountPercent: number
  capacity: number
  slug: string
  mainImage: string
}

export function BookingSidebar({
  villaTitle,
  location,
  basePrice,
  discountedPrice,
  discountPercent,
  capacity,
  slug,
  mainImage,
}: BookingSidebarProps) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleWhatsAppBooking = () => {
    const checkInDate = checkIn ? new Date(checkIn) : new Date()
    const checkOutDate = checkOut ? new Date(checkOut) : new Date(Date.now() + 86400000)
    
    const link = generateWhatsAppBookingLink({
      villaTitle,
      location,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice: discountedPrice,
      discountPercent,
      villaUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/villas/${slug}`,
    })
    window.open(link, '_blank')
  }

  const handleWhatsAppShare = () => {
    const link = generateWhatsAppShareLink(
      villaTitle,
      mainImage,
      discountedPrice,
      location,
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/villas/${slug}`
    )
    window.open(link, '_blank')
  }

  return (
    <div className="sticky top-24 rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6">
        {discountPercent > 0 && (
          <p className="text-sm text-muted-foreground line-through mb-1">
            {formatPrice(basePrice)}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-traveloka">
            {formatPrice(discountedPrice)}
          </p>
          <span className="text-muted-foreground">/malam</span>
        </div>
        {discountPercent > 0 && (
          <Badge className="mt-2 bg-red-500">
            Hemat {discountPercent}%
          </Badge>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900">Tanggal Check-in</label>
          <input
            type="date"
            className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900">Tanggal Check-out</label>
          <input
            type="date"
            className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900">Jumlah Tamu</label>
          <select 
            className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {[...Array(capacity)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Tamu
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button 
        className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 mb-3"
        onClick={handleWhatsAppBooking}
      >
        <Phone className="mr-2 h-5 w-5" />
        Pesan via WhatsApp
      </Button>

      <Button 
        variant="outline"
        className="w-full mb-3"
        onClick={handleWhatsAppShare}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share ke Grup WA
      </Button>

      <Button 
        variant="outline"
        className="w-full bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
        onClick={() => {
          let message = `Halo Admin, saya ingin bertanya tentang villa: ${villaTitle}`
          
          if (checkIn) {
            message += `\n\nTanggal Check-in: ${checkIn}`
          }
          if (checkOut) {
            message += `\nTanggal Check-out: ${checkOut}`
          }
          if (guests) {
            message += `\nJumlah Tamu: ${guests} orang`
          }
          
          const encodedMessage = encodeURIComponent(message)
          window.open(`https://wa.me/6281216919381?text=${encodedMessage}`, '_blank')
        }}
      >
        <Phone className="mr-2 h-4 w-4" />
        Tanyakan ke Admin
      </Button>

      <div className="mt-6 pt-6 border-t">
        <p className="text-sm text-muted-foreground text-center">
          Respon cepat • Admin ramah • Pembayaran aman
        </p>
      </div>
    </div>
  )
}