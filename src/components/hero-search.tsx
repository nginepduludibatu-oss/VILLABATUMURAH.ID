'use client'

import React, { useState, useEffect } from 'react'
import { Search, MapPin, Calendar, Users, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'

export function HeroSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [locations, setLocations] = useState<string[]>([])

  // Fetch locations from database
  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data.locations || []))
      .catch(err => console.error('Error fetching locations:', err))
  }, [])

  const handleSearch = () => {
    console.log('Search clicked with values:', { searchQuery, location, guests })
    const params = new URLSearchParams()
    if (searchQuery) params.append('q', searchQuery)
    if (location) params.append('location', location)
    if (guests) params.append('guests', guests.toString())
    
    const url = `/villas?${params.toString()}`
    console.log('Navigating to:', url)
    router.push(url)
  }

  const handleAskAdmin = () => {
    let message = 'Halo Admin, saya ingin bertanya tentang villa di VillaBatuMurah.ID'
    
    if (searchQuery) {
      message += `\n\nPermintaan saya: ${searchQuery}`
    }
    if (location) {
      message += `\nLokasi yang diinginkan: ${location}`
    }
    if (checkIn) {
      message += `\nTanggal Check-in: ${checkIn}`
    }
    if (checkOut) {
      message += `\nTanggal Check-out: ${checkOut}`
    }
    if (guests) {
      message += `\nJumlah Tamu: ${guests} orang`
    }
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/6281216919381?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Temukan Villa Impian di Batu & Malang
        </h1>
        
        {/* Natural Language Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari villa: 'Villa 10 orang ada kolam renang di Batu'"
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>

        {/* Traditional Filters */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <select
              className="w-full rounded-md border border-input bg-white pl-10 pr-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Semua Lokasi</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Check-in Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              placeholder="Check-in"
              className="pl-10"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Check-out Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              placeholder="Check-out"
              className="pl-10"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Guests */}
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <select
              className="w-full rounded-md border border-input bg-white pl-10 pr-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              <option value="1">1 Tamu</option>
              <option value="2">2 Tamu</option>
              <option value="3">3 Tamu</option>
              <option value="4">4 Tamu</option>
              <option value="5">5 Tamu</option>
              <option value="6">6 Tamu</option>
              <option value="7">7 Tamu</option>
              <option value="8">8 Tamu</option>
              <option value="9">9 Tamu</option>
              <option value="10">10 Tamu</option>
              <option value="12">12 Tamu</option>
              <option value="15">15 Tamu</option>
              <option value="20">20+ Tamu</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="button"
          className="mt-6 w-full h-12 text-lg bg-traveloka hover:bg-blue-600 text-white rounded-md font-medium transition-colors"
          onClick={handleSearch}
        >
          <Search className="mr-2 h-5 w-5 inline" />
          Cari Villa
        </button>

        {/* Ask Admin Button */}
        <Button
          variant="outline"
          className="mt-3 w-full h-12 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          onClick={() => window.open('https://wa.me/6281216919381?text=Halo%20Admin,%20saya%20ingin%20bertanya%20tentang%20villa%20di%20VillaBatuMurah.ID', '_blank')}
        >
          <Phone className="mr-2 h-5 w-5" />
          Tanyakan ke Admin
        </Button>
      </div>
    </div>
  )
}