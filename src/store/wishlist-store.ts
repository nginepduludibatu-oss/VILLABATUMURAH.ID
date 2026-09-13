import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Villa {
  id: string
  slug: string
  title: string
  location: string
  basePrice: number
  images: string
  rating: number
}

interface WishlistStore {
  wishlist: Villa[]
  addToWishlist: (villa: Villa) => void
  removeFromWishlist: (villaId: string) => void
  isInWishlist: (villaId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (villa) => {
        const { wishlist } = get()
        if (!wishlist.some((v) => v.id === villa.id)) {
          set({ wishlist: [...wishlist, villa] })
        }
      },
      removeFromWishlist: (villaId) => {
        set({ wishlist: get().wishlist.filter((v) => v.id !== villaId) })
      },
      isInWishlist: (villaId) => {
        return get().wishlist.some((v) => v.id === villaId)
      },
      clearWishlist: () => {
        set({ wishlist: [] })
      },
    }),
    {
      name: 'villa-wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)