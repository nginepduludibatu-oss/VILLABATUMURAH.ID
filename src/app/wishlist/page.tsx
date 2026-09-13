'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { VillaCard } from '@/components/villa-card'
import { useWishlistStore } from '@/store/wishlist-store'
import { Heart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Wishlist Saya
            </h1>
            <p className="text-slate-600">
              {wishlist.length} villa tersimpan
            </p>
          </div>
          {wishlist.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus Semua
            </Button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <Heart className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Wishlist Kosong
            </h3>
            <p className="text-slate-600 mb-6">
              Mulai simpan villa favorit Anda dengan menekan tombol hati pada kartu villa.
            </p>
            <Link href="/villas">
              <Button className="bg-traveloka hover:bg-blue-600">
                Jelajahi Villa
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((villa) => (
              <div key={villa.id} className="relative">
                <VillaCard villa={villa} />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => removeFromWishlist(villa.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}