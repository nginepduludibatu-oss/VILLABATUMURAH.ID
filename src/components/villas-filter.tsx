'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { X } from 'lucide-react'

interface VillasFilterProps {
  locations: string[]
}

export function VillasFilter({ locations }: VillasFilterProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '')

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (location) {
      params.set('location', location)
    } else {
      params.delete('location')
    }
    
    if (bedrooms) {
      params.set('bedrooms', bedrooms)
    } else {
      params.delete('bedrooms')
    }
    
    router.push(`/villas?${params.toString()}`)
  }

  const resetFilters = () => {
    setLocation('')
    setBedrooms('')
    router.push('/villas')
  }

  return (
    <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filter</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <X className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Location */}
      <div className="mb-6">
        <Label className="mb-2 block text-slate-900">Lokasi</Label>
        <select
          className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Semua Lokasi</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div className="mb-6">
        <Label className="mb-2 block text-slate-900">Kamar Tidur</Label>
        <select
          className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        >
          <option value="">Semua</option>
          <option value="2">2 Kamar</option>
          <option value="3">3 Kamar</option>
          <option value="4">4 Kamar</option>
          <option value="5">5 Kamar</option>
          <option value="6">6 Kamar</option>
          <option value="7">7 Kamar</option>
          <option value="8">8 Kamar</option>
          <option value="9">9 Kamar</option>
          <option value="10">10 Kamar</option>
        </select>
      </div>

      <Button className="w-full bg-traveloka hover:bg-blue-600" onClick={applyFilters}>
        Terapkan Filter
      </Button>
    </div>
  )
}
