import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface FilterState {
  location: string
  checkIn: Date | null
  checkOut: Date | null
  guests: number
  priceRange: [number, number]
  bedrooms: number
  selectedAmenities: string[]
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'featured'
  
  setLocation: (location: string) => void
  setCheckIn: (date: Date | null) => void
  setCheckOut: (date: Date | null) => void
  setGuests: (guests: number) => void
  setPriceRange: (range: [number, number]) => void
  setBedrooms: (bedrooms: number) => void
  setSelectedAmenities: (amenities: string[]) => void
  toggleAmenity: (amenity: string) => void
  setSortBy: (sortBy: 'price-asc' | 'price-desc' | 'rating' | 'featured') => void
  resetFilters: () => void
}

const initialState = {
  location: '',
  checkIn: null,
  checkOut: null,
  guests: 2,
  priceRange: [0, 5000000],
  bedrooms: 0,
  selectedAmenities: [],
  sortBy: 'featured' as const,
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setLocation: (location) => set({ location }),
      setCheckIn: (checkIn) => set({ checkIn }),
      setCheckOut: (checkOut) => set({ checkOut }),
      setGuests: (guests) => set({ guests }),
      setPriceRange: (priceRange) => set({ priceRange }),
      setBedrooms: (bedrooms) => set({ bedrooms }),
      setSelectedAmenities: (selectedAmenities) => set({ selectedAmenities }),
      toggleAmenity: (amenity) =>
        set((state) => ({
          selectedAmenities: state.selectedAmenities.includes(amenity)
            ? state.selectedAmenities.filter((a) => a !== amenity)
            : [...state.selectedAmenities, amenity],
        })),
      setSortBy: (sortBy) => set({ sortBy }),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'villa-filter-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)