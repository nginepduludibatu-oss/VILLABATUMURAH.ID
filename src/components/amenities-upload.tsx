'use client'

import React, { useState, useCallback } from 'react'
import { Plus, X, Upload } from 'lucide-react'

interface AmenitiesUploadProps {
  onAmenitiesChange: (amenities: string[]) => void
  existingAmenities?: string[]
}

export function AmenitiesUpload({
  onAmenitiesChange,
  existingAmenities = []
}: AmenitiesUploadProps) {
  const [amenities, setAmenities] = useState<string[]>(existingAmenities)
  const [newAmenity, setNewAmenity] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      const updated = [...amenities, newAmenity.trim()]
      setAmenities(updated)
      onAmenitiesChange(updated)
      setNewAmenity('')
    }
  }

  const handleRemoveAmenity = (index: number) => {
    const updated = amenities.filter((_, i) => i !== index)
    setAmenities(updated)
    onAmenitiesChange(updated)
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedText = e.dataTransfer.getData('text/plain')
    if (droppedText && droppedText.trim()) {
      const newAmenities = droppedText
        .split(/[\n,;]+/)
        .map(a => a.trim())
        .filter(a => a.length > 0 && !amenities.includes(a))
      
      if (newAmenities.length > 0) {
        const updated = [...amenities, ...newAmenities]
        setAmenities(updated)
        onAmenitiesChange(updated)
      }
    }
  }, [amenities])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddAmenity()
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Fasilitas</label>
      
      {/* Manual Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newAmenity}
          onChange={(e) => setNewAmenity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tambah fasilitas..."
          className="flex-1 rounded-md border border-input px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={handleAddAmenity}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Drag & Drop Zone for Text */}
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 hover:border-slate-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-6 w-6 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">
          Drag & drop text list here (comma/newline separated)
        </p>
      </div>

      {/* Amenities List */}
      {amenities.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            {amenities.length} fasilitas
          </p>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{amenity}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAmenity(index)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Add Suggestions */}
      <div className="mt-4">
        <p className="text-xs text-slate-500 mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-2">
          {['WiFi', 'Kolam Renang', 'Karaoke', 'BBQ', 'Parkir', 'AC', 'TV', 'Dapur'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                if (!amenities.includes(suggestion)) {
                  const updated = [...amenities, suggestion]
                  setAmenities(updated)
                  onAmenitiesChange(updated)
                }
              }}
              className={`text-xs px-2 py-1 rounded-full border ${
                amenities.includes(suggestion)
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
