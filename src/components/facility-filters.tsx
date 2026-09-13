'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const facilities = [
  { icon: '🏊‍♂️', label: 'Kolam Renang', value: 'Private Pool' },
  { icon: '⛰️', label: 'View Gunung', value: 'Mountain View' },
  { icon: '🎤', label: 'Karaoke', value: 'Karaoke' },
  { icon: '🍖', label: 'BBQ', value: 'BBQ Grill' },
  { icon: '📶', label: 'WiFi', value: 'WiFi' },
  { icon: '🅿️', label: 'Parkir', value: 'Parking Area' },
]

export function FacilityFilters() {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {facilities.map((facility) => {
        const isSelected = selectedFacilities.includes(facility.value)
        return (
          <motion.button
            key={facility.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleFacility(facility.value)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-traveloka text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{facility.icon}</span>
            <span>{facility.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}