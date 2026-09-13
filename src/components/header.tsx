'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, Menu, X, Phone } from 'lucide-react'
import { Logo } from './logo'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useWishlistStore } from '@/store/wishlist-store'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { wishlist } = useWishlistStore()

  const [whatsappNumber, setWhatsAppNumber] = useState('6281216919381')

  useEffect(() => {
    // Fetch WhatsApp number from settings
    fetch('/api/whatsapp')
      .then(res => res.json())
      .then(data => setWhatsAppNumber(data.whatsappNumber))
      .catch(err => console.error('Error fetching WhatsApp number:', err))
  }, [])

  const handleWhatsAppHelp = () => {
    const message = encodeURIComponent(
      'Halo Admin, saya butuh bantuan untuk memilih villa di Batu/Malang. Bisa rekomendasikan villa yang sesuai dengan kebutuhan saya?'
    )
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Announcement Banner */}
      <div className="bg-emerald-500 px-4 py-2 text-center text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="flex-1 text-center">
            🎉 Promo Liburan Villa Batu Murah! Diskon hingga 20% untuk pemesanan minimal 2 malam
          </span>
          <button className="ml-4 text-white/80 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/villas" className="text-sm font-medium text-slate-700 transition-colors hover:text-primary">
              Semua Villa
            </Link>
            <Link href="/wishlist" className="text-sm font-medium text-slate-700 transition-colors hover:text-primary">
              Wishlist
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-700 transition-colors hover:text-primary">
              Tentang Kami
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Wishlist Badge */}
            <Link href="/wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* WhatsApp CTA - More Visible */}
            <Button 
              className="hidden sm:flex bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all"
              onClick={handleWhatsAppHelp}
            >
              <Phone className="mr-2 h-4 w-4" />
              Bantu Pilihkan Villa
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/villas" className="text-sm font-medium transition-colors hover:text-primary">
              Semua Villa
            </Link>
            <Link href="/wishlist" className="text-sm font-medium transition-colors hover:text-primary">
              Wishlist
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              Tentang Kami
            </Link>
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={handleWhatsAppHelp}
            >
              <Phone className="mr-2 h-4 w-4" />
              Bantu Pilihkan Villa
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}