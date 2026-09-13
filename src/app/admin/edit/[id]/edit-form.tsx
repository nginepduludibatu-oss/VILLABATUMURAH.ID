'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'
import { AmenitiesUpload } from '@/components/amenities-upload'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface EditFormProps {
  villa: any
}

export function EditForm({ villa }: EditFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(JSON.parse(villa.images))
  const [amenities, setAmenities] = useState<string[]>(JSON.parse(villa.amenities))
  const [isSaving, setIsSaving] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages)
  }

  const handleAmenitiesChange = (newAmenities: string[]) => {
    setAmenities(newAmenities)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setNotification(null)

    try {
      const formData = new FormData(e.currentTarget)
      
      const villaData = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        tagline: formData.get('tagline') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        address: formData.get('address') as string,
        capacity: formData.get('capacity') as string,
        bedrooms: formData.get('bedrooms') as string,
        bathrooms: formData.get('bathrooms') as string,
        basePrice: formData.get('basePrice') as string,
        weekendPrice: formData.get('weekendPrice') as string,
        discountPercent: formData.get('discountPercent') as string,
        isActive: (e.currentTarget.querySelector('input[name="isActive"]') as HTMLInputElement)?.checked,
        featured: (e.currentTarget.querySelector('input[name="featured"]') as HTMLInputElement)?.checked,
        travelokaUrl: formData.get('travelokaUrl') as string,
        customUrl: formData.get('customUrl') as string,
        rating: formData.get('rating') as string,
        reviewCount: formData.get('reviewCount') as string,
        images: images,
        amenities: amenities,
      }

      const response = await fetch(`/api/villas/${villa.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(villaData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setNotification({ type: 'success', message: 'Villa berhasil diperbarui!' })
        setTimeout(() => {
          router.push('/admin')
        }, 2000)
      } else {
        setNotification({ type: 'error', message: result.error || 'Gagal menyimpan villa' })
      }
    } catch (error) {
      console.error('Error saving villa:', error)
      setNotification({ type: 'error', message: 'Terjadi kesalahan saat menyimpan' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Notification */}
      {notification && (
        <div className={`mb-4 p-4 rounded-lg ${
          notification.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nama Villa</label>
            <input
              name="title"
              type="text"
              defaultValue={villa.title}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              name="slug"
              type="text"
              defaultValue={villa.slug}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tagline</label>
            <input
              name="tagline"
              type="text"
              defaultValue={villa.tagline || ''}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Lokasi</label>
            <input
              name="location"
              type="text"
              defaultValue={villa.location}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alamat</label>
            <input
              name="address"
              type="text"
              defaultValue={villa.address}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Kapasitas (Tamu)</label>
            <input
              name="capacity"
              type="number"
              defaultValue={villa.capacity}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Kamar Tidur</label>
            <input
              name="bedrooms"
              type="number"
              defaultValue={villa.bedrooms}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Kamar Mandi</label>
            <input
              name="bathrooms"
              type="number"
              defaultValue={villa.bathrooms}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Harga Dasar</label>
            <input
              name="basePrice"
              type="number"
              defaultValue={villa.basePrice}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Harga Weekend</label>
            <input
              name="weekendPrice"
              type="number"
              defaultValue={villa.weekendPrice || ''}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Diskon (%)</label>
            <input
              name="discountPercent"
              type="number"
              defaultValue={villa.discountPercent}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi</label>
          <textarea
            name="description"
            defaultValue={villa.description}
            rows={4}
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
          />
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              name="isActive"
              type="checkbox"
              defaultChecked={villa.isActive}
              className="mr-2"
            />
            <label className="text-sm font-medium">Villa Aktif</label>
          </div>
          <div className="flex items-center">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={villa.featured}
              className="mr-2"
            />
            <label className="text-sm font-medium">Featured</label>
          </div>
        </div>

        {/* External Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Traveloka URL</label>
            <input
              name="travelokaUrl"
              type="text"
              defaultValue={villa.travelokaUrl || ''}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Custom URL</label>
            <input
              name="customUrl"
              type="text"
              defaultValue={villa.customUrl || ''}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              defaultValue={villa.rating}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Jumlah Review</label>
            <input
              name="reviewCount"
              type="number"
              defaultValue={villa.reviewCount}
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Images with Drag & Drop */}
        <FileUpload
          label="Upload Gambar Villa (Drag & Drop)"
          existingFiles={images}
          accept="image/*"
          multiple={true}
          maxSize={5}
          onFilesChange={handleImagesChange}
        />

        {/* Amenities with Drag & Drop */}
        <AmenitiesUpload
          existingAmenities={amenities}
          onAmenitiesChange={handleAmenitiesChange}
        />

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="bg-traveloka hover:bg-blue-600"
            disabled={isSaving}
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
          <Link href="/admin">
            <Button type="button" variant="outline">
              Batal
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
