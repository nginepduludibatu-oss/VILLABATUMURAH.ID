'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminDashboardProps {
  villas: any[]
  settings: any
}

export function AdminDashboard({ villas, settings }: AdminDashboardProps) {
  const router = useRouter()
  const [isSavingSettings, setIsSavingSettings] = useState(false)
  const [settingsNotification, setSettingsNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  
  // Bulk price edit state
  const [isBulkSaving, setIsBulkSaving] = useState(false)
  const [bulkNotification, setBulkNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [selectedBedroomCategory, setSelectedBedroomCategory] = useState('')
  const [newBasePrice, setNewBasePrice] = useState('')
  const [newWeekendPrice, setNewWeekendPrice] = useState('')
  
  // Settings state
  const [websiteTitle, setWebsiteTitle] = useState(settings?.websiteTitle || 'VillaBatuMurah.ID')
  const [primaryColor, setPrimaryColor] = useState(settings?.primaryColor || '#0194f3')
  const [defaultWA, setDefaultWA] = useState(settings?.defaultWA || '')
  const [globalDiscountNotice, setGlobalDiscountNotice] = useState(settings?.globalDiscountNotice || '')

  const handleEdit = (villaId: string) => {
    router.push(`/admin/edit/${villaId}`)
  }

  const handleDelete = (villaId: string) => {
    console.log('Delete villa:', villaId)
    if (confirm('Apakah Anda yakin ingin menghapus villa ini?')) {
      alert(`Delete villa dengan ID: ${villaId}\nFitur delete akan segera tersedia!`)
    }
  }

  const handleSaveSettings = async () => {
    setIsSavingSettings(true)
    setSettingsNotification(null)

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteTitle,
          primaryColor,
          defaultWA,
          globalDiscountNotice,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSettingsNotification({ type: 'success', message: 'Pengaturan berhasil disimpan!' })
        setTimeout(() => {
          setSettingsNotification(null)
        }, 3000)
      } else {
        setSettingsNotification({ type: 'error', message: result.error || 'Gagal menyimpan pengaturan' })
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setSettingsNotification({ type: 'error', message: 'Terjadi kesalahan saat menyimpan' })
    } finally {
      setIsSavingSettings(false)
    }
  }

  const handleAddVilla = () => {
    console.log('Add new villa')
    alert('Fitur tambah villa akan segera tersedia!')
  }

  const handleLogout = () => {
    document.cookie = 'adminToken=; path=/; max-age=0'
    document.cookie = 'adminUsername=; path=/; max-age=0'
    router.push('/admin/login')
  }

  const handleBulkPriceUpdate = async () => {
    if (!selectedBedroomCategory || !newBasePrice) {
      setBulkNotification({ type: 'error', message: 'Pilih kategori kamar dan harga baru' })
      return
    }

    setIsBulkSaving(true)
    setBulkNotification(null)

    try {
      const response = await fetch('/api/villas/bulk-update-prices', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bedrooms: Number(selectedBedroomCategory),
          basePrice: Number(newBasePrice),
          weekendPrice: newWeekendPrice ? Number(newWeekendPrice) : null,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setBulkNotification({ 
          type: 'success', 
          message: `Berhasil update ${result.count} villa` 
        })
        setSelectedBedroomCategory('')
        setNewBasePrice('')
        setNewWeekendPrice('')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setBulkNotification({ type: 'error', message: result.error || 'Gagal update harga' })
      }
    } catch (error) {
      console.error('Error updating prices:', error)
      setBulkNotification({ type: 'error', message: 'Terjadi kesalahan saat update' })
    } finally {
      setIsBulkSaving(false)
    }
  }

  // Filter villas based on search query
  const filteredVillas = villas.filter(villa => {
    const searchLower = searchQuery.toLowerCase()
    return (
      villa.title.toLowerCase().includes(searchLower) ||
      villa.location.toLowerCase().includes(searchLower) ||
      villa.id.toString().includes(searchLower)
    )
  })

  // Get unique bedroom categories
  const bedroomCategories = Array.from(new Set(villas.map(v => v.bedrooms))).sort((a, b) => a - b)
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">VillaBatuMurah.ID Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Villa</h3>
            <p className="text-3xl font-bold text-slate-900">{villas.length}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Villa Aktif</h3>
            <p className="text-3xl font-bold text-emerald-600">
              {villas.filter(v => v.isActive).length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Villa Featured</h3>
            <p className="text-3xl font-bold text-traveloka">
              {villas.filter(v => v.featured).length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Rata-rata Rating</h3>
            <p className="text-3xl font-bold text-slate-900">
              {villas.length > 0 
                ? (villas.reduce((sum, v) => sum + v.rating, 0) / villas.length).toFixed(1)
                : '0.0'}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Pengaturan Website</h2>
          
          {/* Settings Notification */}
          {settingsNotification && (
            <div className={`mb-4 p-4 rounded-lg ${
              settingsNotification.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {settingsNotification.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Judul Website</label>
              <input
                type="text"
                value={websiteTitle}
                onChange={(e) => setWebsiteTitle(e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Warna Utama</label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-10 rounded-md border border-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp Default</label>
              <input
                type="text"
                value={defaultWA}
                onChange={(e) => setDefaultWA(e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pesan Promo Banner</label>
              <input
                type="text"
                value={globalDiscountNotice}
                onChange={(e) => setGlobalDiscountNotice(e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button 
            className="mt-4 bg-traveloka text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSaveSettings}
            disabled={isSavingSettings}
          >
            {isSavingSettings ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Update Harga Masal</h2>
          
          {/* Bulk Price Notification */}
          {bulkNotification && (
            <div className={`mb-4 p-4 rounded-lg ${
              bulkNotification.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {bulkNotification.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kategori Kamar Tidur</label>
              <select
                value={selectedBedroomCategory}
                onChange={(e) => setSelectedBedroomCategory(e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
              >
                <option value="">Pilih Kategori</option>
                {bedroomCategories.map(bedrooms => (
                  <option key={bedrooms} value={bedrooms}>
                    {bedrooms} Kamar Tidur ({villas.filter(v => v.bedrooms === bedrooms).length} villa)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Harga Weekday Baru</label>
              <input
                type="number"
                value={newBasePrice}
                onChange={(e) => setNewBasePrice(e.target.value)}
                placeholder="Contoh: 500000"
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Harga Weekend Baru (Opsional)</label>
              <input
                type="number"
                value={newWeekendPrice}
                onChange={(e) => setNewWeekendPrice(e.target.value)}
                placeholder="Contoh: 700000"
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-traveloka text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                onClick={handleBulkPriceUpdate}
                disabled={isBulkSaving}
              >
                {isBulkSaving ? 'Menyimpan...' : 'Update Harga Masal'}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Manajemen Villa</h2>
            <button 
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
              onClick={handleAddVilla}
            >
              + Tambah Villa Baru
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari villa berdasarkan nama, lokasi, atau ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md rounded-md border border-input px-4 py-2 text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Menampilkan {filteredVillas.length} dari {villas.length} villa
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Nama Villa</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Lokasi</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Kamar</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Harga</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredVillas.map((villa) => (
                  <tr key={villa.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{villa.title}</div>
                      <div className="text-xs text-muted-foreground">ID: {villa.id}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{villa.location}</td>
                    <td className="py-3 px-4 text-sm">{villa.bedrooms} Kamar</td>
                    <td className="py-3 px-4 text-sm">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(villa.basePrice)}
                    </td>
                    <td className="py-3 px-4 text-sm">{villa.rating}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        villa.isActive 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {villa.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-700 text-sm"
                          onClick={() => handleEdit(villa.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-700 text-sm"
                          onClick={() => handleDelete(villa.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}