import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper function to get all image paths for a folder
function getAllImagePaths(folderName: string): string[] {
  // For production/Netlify, use placeholder images
  if (process.env.NODE_ENV === 'production') {
    return [
      'https://images.unsplash.com/photo-1566073771259-6a8506099955?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a95f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672269266-af9ac4f4bb00?w=800&h=600&fit=crop',
    ]
  }
  
  // Local development: try to read from file system
  try {
    const fs = require('fs')
    const path = require('path')
    const folderPath = path.join(process.cwd(), 'public', 'images', 'villas', folderName)
    
    if (!fs.existsSync(folderPath)) {
      console.warn(`Folder not found: ${folderName}`)
      return []
    }
    
    const files = fs.readdirSync(folderPath)
      .filter((file: string) => file.endsWith('.jpg'))
      .sort((a: string, b: string) => {
        const matchA = a.match(/ResizedImage_(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})_(\d+)\.jpg/)
        const matchB = b.match(/ResizedImage_(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})_(\d+)\.jpg/)
        
        if (matchA && matchB) {
          const timeA = matchA[1]
          const timeB = matchB[1]
          const numA = parseInt(matchA[2])
          const numB = parseInt(matchB[2])
          
          if (timeA !== timeB) return timeA.localeCompare(timeB)
          return numA - numB
        }
        return a.localeCompare(b)
      })
      .map((file: string) => `/images/villas/${folderName}/${file}`)
    
    return files
  } catch (error) {
    console.error('Error reading image files:', error)
    return [
      'https://images.unsplash.com/photo-1566073771259-6a8506099955?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a95f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672269266-af9ac4f4bb00?w=800&h=600&fit=crop',
    ]
  }
}

// Folder to slug mapping
const folderToSlugMap: Record<string, string> = {
  'Bromo a4 pool': 'villa-bromo-a4-by-n2k',
  'bromo 26 pool': 'villa-bromo-26-by-n2k',
  'bromo 3': 'villa-bromo-3-by-n2k',
  'Emerald f1': 'villa-emerald-f1-by-n2k',
  'Emerald F3': 'villa-emerald-f3-by-n2k',
  'estate 21 pool': 'villa-kusuma-estate-21-by-n2k',
  'Harmony pool': 'villa-harmony-by-n2k',
  'Kayana C3': 'villa-kayana-c3-by-n2k',
  'kusuma i16 pool': 'villa-kusuma-i16-by-n2k',
  'metro 5c': 'villa-metro-5c-by-n2k',
  'metro 9c': 'villa-metro-9c-by-n2k',
  'metro 7c': 'villa-metro-07c-by-n2k',
  'N2K one pool': 'villa-wasu-one-by-n2k',
  'pinus m3': 'villa-kusuma-pinus-m3-by-n2k',
  'puri bidadari 7': 'puri-bidadari-7-by-n2k',
  'Rois A5 Pool': 'villa-arois-a5-by-n2k',
  'Tio 2 Pool': 'villa-tio-2-by-n2k',
  'Valley a1': 'villa-valley-a1-by-n2k',
  'wasu one pool': 'villa-wasu-one-by-n2k',
  'wasu two pool': 'villa-wasu-two-by-n2k',
  'wukir 7': 'villa-wukir-7-by-n2k',
  'wukir 15': 'villa-wukir-15-by-n2k',
  // Additional folders
  'batu citra c8 pool': 'villa-batu-citra-c8-by-n2k',
  'bromo 30': 'villa-bromo-30-by-n2k',
  'Drift A8 pool': 'villa-drift-a8-by-n2k',
  'Emerald B11': 'villa-emerald-b11-by-n2k',
  'Emerald E5': 'villa-emerald-e5-by-n2k',
  'Emerald F7 Salma Pool': 'villa-emerald-f7-salma-by-n2k',
  'Emerald G7': 'villa-emerald-g7-by-n2k',
  'Emerald H1': 'villa-emerald-h1-by-n2k',
  'Emerald K8': 'villa-emerald-k8-by-n2k',
  'Emerald L5': 'villa-emerald-l5-by-n2k',
  'Kayana G6': 'villa-kayana-g6-by-n2k',
  'kayana g8': 'villa-kayana-g8-by-n2k',
  'lolita B15': 'villa-lolita-b15-by-n2k',
  'metro 3c': 'villa-metro-3c-by-n2k',
  'moeci one pool': 'villa-moeci-one-by-n2k',
  'moeci two pool': 'villa-moeci-two-by-n2k',
  'panderman 26': 'villa-panderman-26-by-n2k',
  'panderman 32': 'villa-panderman-32-by-n2k',
  'panderman 58': 'villa-panderman-58-by-n2k',
  'panderman 62': 'villa-panderman-62-by-n2k',
  'panorama d34': 'villa-panorama-d34-by-n2k',
  'Permata C10': 'villa-permata-c10-by-n2k',
  'Permata C12': 'villa-permata-c12-by-n2k',
  'Permata C14': 'villa-permata-c14-by-n2k',
  'Permata C15': 'villa-permata-c15-by-n2k',
  'Permata D12': 'villa-permata-d12-by-n2k',
  'Permata d2': 'villa-permata-d2-by-n2k',
  'Permata E1': 'villa-permata-e1-by-n2k',
  'Permata f11': 'villa-permata-f11-by-n2k',
  'Permata F6': 'villa-permata-f6-by-n2k',
  'Permata G11': 'villa-permata-g11-by-n2k',
  'Permata G6': 'villa-permata-g6-by-n2k',
  'Puri bidadari 4': 'puri-bidadari-4-by-n2k',
  'Puri Bidadari 6 pool': 'puri-bidadari-6-by-n2k',
  'Rois A6': 'villa-rois-a6-by-n2k',
  'Rois C3 Pool': 'villa-rois-c3-by-n2k',
  'Rois D13 Pool': 'villa-rois-d13-by-n2k',
  'Rois D14 Pool': 'villa-rois-d14-by-n2k',
  'Rois D5 Pool': 'villa-rois-d5-by-n2k',
  'Terrace 19 pool': 'villa-terrace-19-by-n2k',
  'Tio 1 Pool': 'villa-tio-1-by-n2k',
  'Tio 3 Pool': 'villa-tio-3-by-n2k',
  'valley B7': 'villa-valley-b7-by-n2k',
  'villatel a8 pool': 'villa-villatel-a8-by-n2k',
  'Welirang 7': 'villa-welirang-7-by-n2k',
  'wukir 12': 'villa-wukir-12-by-n2k',
  'wukir 8': 'villa-wukir-8-by-n2k',
  'wukir 9': 'villa-wukir-9-by-n2k',
}

async function main() {
  // Delete all existing villas
  await prisma.villa.deleteMany({})
  console.log('Deleted all existing villas')

  // Create default CS WhatsApp
  const existingCS = await prisma.cSWhatsApp.findFirst()
  let csWhatsApp
  if (!existingCS) {
    csWhatsApp = await prisma.cSWhatsApp.create({
      data: {
        name: 'Admin VillaBatuMurah',
        phoneNumber: '6281234567890',
        isActive: true,
        isPrimary: true,
      },
    })
  } else {
    csWhatsApp = existingCS
  }

  // Create site settings
  const existingSettings = await prisma.siteSettings.findFirst()
  let siteSettings
  if (!existingSettings) {
    siteSettings = await prisma.siteSettings.create({
      data: {
        websiteTitle: 'VillaBatuMurah.ID - Villa BY N2K',
        primaryColor: '#0194f3',
        defaultWA: '6281234567890',
        globalDiscountNotice: 'Promo Villa BY N2K! Diskon hingga 30% untuk pemesanan minimal 2 malam.',
      },
    })
  } else {
    siteSettings = existingSettings
  }

  // Create BY N2K villas with simplified data for production
  const villas = [
    {
      slug: 'villa-bromo-a4-by-n2k',
      title: 'VILLA BROMO A4 WITH PRIVATE POOL BY N2K',
      tagline: 'Private Pool di Kusuma Pesanggrahan',
      description: 'Villa dengan kolam renang pribadi di cluster Bromo, Kusuma Pesanggrahan. Cocok untuk keluarga dan rombongan.',
      location: 'Batu',
      address: 'JL.SUROPATI, PERUM KUSUMA PESANGGRAHAN BLOK BROMO NO A4, KOTA BATU, JAWA TIMUR',
      travelokaUrl: 'https://www.traveloka.com/en-my/hotel/indonesia/villa-bromo-a4-with-private-pool-by-n2k-9000000967022',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Kusuma+Pesanggrahan+Bromo+A4',
      basePrice: 750000,
      weekendPrice: 1450000,
      discountPercent: 15,
      discountThresholdNights: 2,
      customBadge: 'Private Pool',
      capacity: 9,
      bedrooms: 3,
      bathrooms: 3,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('Bromo a4 pool')),
      amenities: JSON.stringify([
        'Private Pool',
        '3 Kamar Tidur',
        'AC',
        'Twin Bed',
        'Kamar Mandi Luar',
        '2 Water Heater',
        'Kitchen Set',
        'Kulkas',
        'Air Galon',
        'Magicom',
        'Free WiFi',
        'Alat Bantu/Alat Kebersihan',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park 2', distance: '15 Menit' },
        { name: 'Museum Angkut', distance: '10 Menit' },
        { name: 'BNS', distance: '12 Menit' },
      ]),
      featured: true,
      rating: 4.8,
      reviewCount: 45,
      isActive: true,
    },
    {
      slug: 'villa-bromo-3-by-n2k',
      title: 'Villa Bromo 3 by N2K',
      tagline: 'Pet-Friendly di Cluster Bromo',
      description: 'Villa ramah hewan peliharaan di cluster Bromo. Cocok untuk membawa anjing/kucing kesayangan.',
      location: 'Batu',
      address: 'JLN.SUROPATI PERUM KUSUMA PESANGGRAHAN BLOK BROMO NO 3, KEL.PESANGGRAHAN, KEC.BATU',
      travelokaUrl: 'https://www.traveloka.com/id-id/hotel/indonesia/villa-bromo-3-pet-freindly-by-n2k-9000001824099',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Kusuma+Pesanggrahan+Bromo+3',
      basePrice: 1500000,
      weekendPrice: 1800000,
      discountPercent: 10,
      discountThresholdNights: 2,
      customBadge: 'Pet Friendly',
      capacity: 6,
      bedrooms: 2,
      bathrooms: 2,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('bromo 3')),
      amenities: JSON.stringify([
        'Pet Friendly',
        'WiFi',
        'Parking',
        'Kitchen',
        'Living Room',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Boleh membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park 2', distance: '15 Menit' },
        { name: 'Museum Angkut', distance: '10 Menit' },
      ]),
      featured: false,
      rating: 4.5,
      reviewCount: 23,
      isActive: true,
    },
    {
      slug: 'villa-bromo-26-by-n2k',
      title: 'Villa Bromo 26 with Private Pool by N2K',
      tagline: 'Rating 8.0 di Cluster Bromo',
      description: 'Villa dengan kolam renang pribadi dan rating tinggi 8.0/10. Fasilitas lengkap dan bersih.',
      location: 'Batu',
      address: 'Kusuma Pesanggrahan Blok Bromo 26, Batu',
      travelokaUrl: 'https://www.traveloka.com/en-my/user/review/consumption/HOTEL/GENERAL/9000000925377',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Kusuma+Pesanggrahan+Bromo+26',
      basePrice: 1150000,
      weekendPrice: 1650000,
      discountPercent: 20,
      discountThresholdNights: 2,
      customBadge: 'Rating 8.0',
      capacity: 9,
      bedrooms: 3,
      bathrooms: 3,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('bromo 26 pool')),
      amenities: JSON.stringify([
        'Private Pool 6m x 2.5m',
        'Kedalaman 1.2m',
        '2 Lantai',
        '3 Kamar Tidur',
        '2 AC',
        'Kamar Mandi Dalam & Luar',
        '3 Water Heater',
        'TV',
        'Kitchen Set',
        'Kulkas',
        'Air Galon',
        'Magicom',
        'Free WiFi',
        'Karaoke',
        'Gula/Teh/Kopi',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park 2', distance: '15 Menit' },
        { name: 'Museum Angkut', distance: '10 Menit' },
      ]),
      featured: true,
      rating: 8.0,
      reviewCount: 48,
      isActive: true,
    },
    {
      slug: 'villa-kusuma-i16-by-n2k',
      title: 'VILLA KUSUMA I16 WITH PRIVATE POOL BY N2K',
      tagline: '4 Kamar dengan Private Pool',
      description: 'Villa 4 kamar dengan kolam renang pribadi. Kitchen lengkap dan WiFi.',
      location: 'Batu',
      address: 'KUSUMA PESANGGRAHAN BLOK I16, BATU, JAWA TIMUR',
      travelokaUrl: 'https://www.traveloka.com/en-en/hotel/indonesia/villa-kusuma-i16-with-private-pool-by-n2k-9000001153022',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Kusuma+Pesanggrahan+I16',
      basePrice: 1250000,
      weekendPrice: 2000000,
      discountPercent: 20,
      discountThresholdNights: 2,
      customBadge: '4 Bedrooms',
      capacity: 12,
      bedrooms: 4,
      bathrooms: 4,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('kusuma i16 pool')),
      amenities: JSON.stringify([
        'Private Pool',
        'Bed 120x200 Susun',
        'Bed 160x200',
        'Water Heater',
        'Ruang Tamu Set',
        'TV',
        'Kamar Mandi Dalam + Water Heater',
        'Kitchen',
        'Ruang TV',
        'Karaoke',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park 2', distance: '10 Menit' },
        { name: 'Museum Angkut', distance: '8 Menit' },
      ]),
      featured: true,
      rating: 4.9,
      reviewCount: 67,
      isActive: true,
    },
    {
      slug: 'villa-kusuma-estate-21-by-n2k',
      title: 'Villa Kusuma Estate 21 With Private Pool by N2K',
      tagline: 'Kusuma Estate dengan Private Pool',
      description: 'Villa di Kusuma Estate dengan kolam renang pribadi. Lokasi strategis di Ngaglik.',
      location: 'Batu',
      address: 'Jl. Abdul Gani komplek kusuma estate kav 21, Ngaglik, Kec. Batu',
      travelokaUrl: 'https://www.traveloka.com/en-en/hotel/indonesia/villa-kusuma-estate-21-with-private-pool-by-n2k-9000003281617',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Kusuma+Estate+21',
      basePrice: 2200000,
      weekendPrice: 2700000,
      discountPercent: 15,
      discountThresholdNights: 2,
      customBadge: 'Estate',
      capacity: 9,
      bedrooms: 3,
      bathrooms: 3,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('estate 21 pool')),
      amenities: JSON.stringify([
        'Private Pool',
        'WiFi',
        '24-Hour Front Desk',
        'Parking',
        'Kitchen',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park 2', distance: '12 Menit' },
        { name: 'Museum Angkut', distance: '15 Menit' },
      ]),
      featured: false,
      rating: 4.6,
      reviewCount: 34,
      isActive: true,
    },
    {
      slug: 'villa-kusuma-pinus-m3-by-n2k',
      title: '3 Bedroom at Villa Kusuma Pinus M3 by N2K',
      tagline: '3 Kamar di Kusuma Pinus',
      description: 'Villa 3 kamar di Kusuma Pinus dengan karaoke dan WiFi. Lokasi dekat city center.',
      location: 'Batu',
      address: 'Kusuma Pinus, Jl. Abdul Gani Atas No.5 Blok F, Ngaglik, Kec. Batu',
      travelokaUrl: 'https://www.skyscanner.gg/hotels/indonesia/batu-hotels/3-bedroom-at-villa-kusuma-pinus-m3-by-n2k/ht-205424421',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Kusuma+Pinus+M3',
      basePrice: 850000,
      weekendPrice: 950000,
      discountPercent: 10,
      discountThresholdNights: 2,
      customBadge: '3 Bedrooms',
      capacity: 9,
      bedrooms: 3,
      bathrooms: 2,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('pinus m3')),
      amenities: JSON.stringify([
        '2 Lantai',
        'Kamar Mandi Dalam & Luar',
        'Water Heater',
        'Ruang Tamu Set',
        'Kitchen Set',
        'Kulkas',
        'Air Galon',
        'Magicom',
        'Free WiFi',
        'Karaoke',
        'Rooftop View Bagus',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Batu City Center', distance: '2 km' },
        { name: 'Jatim Park 2', distance: '15 Menit' },
      ]),
      featured: false,
      rating: 4.4,
      reviewCount: 18,
      isActive: true,
    },
    {
      slug: 'villa-wukir-7-by-n2k',
      title: 'Villa Wukir 7 by N2K',
      tagline: 'Wukir Cottage 7 - Kusuma Pesanggrahan',
      description: 'Villa di cluster Wukir dengan pemandangan memukau. Resepsionis 24 jam.',
      location: 'Batu',
      address: 'Jalan Suropati Komplek Kusuma Pesanggrahan Residence, Cluster Wukir',
      travelokaUrl: 'https://www.traveloka.com/id-id/hotel/indonesia/villa-wukir-7-by-n2k-3000020000079',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Wukir+7',
      basePrice: 250000,
      weekendPrice: 400000,
      discountPercent: 12,
      discountThresholdNights: 2,
      customBadge: 'Wukir',
      capacity: 6,
      bedrooms: 2,
      bathrooms: 2,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('wukir 7')),
      amenities: JSON.stringify([
        '2 Lantai',
        '2 Kamar Tidur',
        'Kamar Mandi Dalam',
        'Water Heater',
        'TV',
        'Sofa Bed',
        'Kitchen Set',
        'Kulkas',
        'Air Galon',
        'Magicom',
        'Free WiFi',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park', distance: '10 Menit' },
        { name: 'Museum Angkut', distance: '12 Menit' },
        { name: 'Selecta', distance: '15 Menit' },
      ]),
      featured: false,
      rating: 4.5,
      reviewCount: 28,
      isActive: true,
    },
    {
      slug: 'villa-wukir-15-by-n2k',
      title: 'Villa Wukir 15 by N2K',
      tagline: '2 Kamar di Cluster Wukir',
      description: 'Villa 2 kamar di cluster Wukir. Cocok untuk keluarga kecil.',
      location: 'Batu',
      address: 'Villa Kusuma Pesanggrahan blok Wukir 15, Batu',
      travelokaUrl: 'https://www.agoda.com/full-house-at-villa-wukir-15-by-n2k-h30829833/hotel/malang-id.html',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Wukir+15',
      basePrice: 250000,
      weekendPrice: 400000,
      discountPercent: 10,
      discountThresholdNights: 2,
      customBadge: '2 Bedrooms',
      capacity: 6,
      bedrooms: 2,
      bathrooms: 2,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('wukir 15')),
      amenities: JSON.stringify([
        '2 Lantai',
        '2 Kamar Tidur',
        'Kamar Mandi Luar',
        'Water Heater',
        'TV',
        'Sofa Bed',
        'Kitchen Set',
        'Kulkas',
        'Air Galon',
        'Magicom',
        'Free WiFi',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park 2', distance: '15 Menit' },
        { name: 'Museum Angkut', distance: '12 Menit' },
      ]),
      featured: false,
      rating: 4.3,
      reviewCount: 15,
      isActive: true,
    },
    {
      slug: 'villa-emerald-f1-by-n2k',
      title: 'Villa Emerald F1 by N2K',
      tagline: 'Emerald F1 - Mojorejo',
      description: 'Villa di cluster Emerald F1, Mojorejo. Pemandangan alam yang memukau.',
      location: 'Batu',
      address: 'Kajang, Mojorejo, Villa Emerald F1',
      travelokaUrl: 'https://www.traveloka.com/id-id/hotel/indonesia/villa-emerald-f1-by-n2k-9000000667922',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Emerald+F1',
      basePrice: 400000,
      weekendPrice: 550000,
      discountPercent: 10,
      discountThresholdNights: 2,
      customBadge: 'Emerald',
      capacity: 6,
      bedrooms: 2,
      bathrooms: 1,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('Emerald f1')),
      amenities: JSON.stringify([
        '1 Lantai',
        '2 Kamar Tidur',
        'Kamar Mandi Luar',
        'Water Heater',
        'Kulkas',
        'Dispenser',
        'Magicom',
        'Meja Mini Bar',
        'Kitchen Set',
        'Free WiFi',
        'Balkon View Bagus',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park 2', distance: '20 Menit' },
        { name: 'Selecta', distance: '15 Menit' },
      ]),
      featured: false,
      rating: 4.3,
      reviewCount: 17,
      isActive: true,
    },
    {
      slug: 'villa-emerald-f3-by-n2k',
      title: 'Villa Emerald F3 by N2K',
      tagline: 'Emerald F3 - Mojorejo',
      description: 'Villa di cluster Emerald F3, Mojorejo. Lokasi strategis.',
      location: 'Batu',
      address: 'Kajang, Mojorejo, Villa Emerald F3',
      travelokaUrl: 'https://www.traveloka.com/id-id/hotel/indonesia/villa-emerald-f3-by-n2k-9000000667923',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d112.123456789!3d-7.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMycnMjQuNCJTIDExMsKwMDcnMjcuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
      googleMapsShareUrl: 'https://maps.google.com/?q=Emerald+F3',
      basePrice: 450000,
      weekendPrice: 600000,
      discountPercent: 15,
      discountThresholdNights: 2,
      customBadge: 'Emerald',
      capacity: 6,
      bedrooms: 2,
      bathrooms: 2,
      totalUnits: 1,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      images: JSON.stringify(getAllImagePaths('Emerald F3')),
      amenities: JSON.stringify([
        '2 Lantai',
        '2 Kamar Tidur',
        'Kamar Mandi Dalam',
        'Water Heater',
        'Kitchen Set',
        'Kulkas',
        'Air Galon',
        'Magicom',
        'Free WiFi',
      ]),
      houseRules: JSON.stringify([
        'Check-in: 14:00, Check-out: 12:00',
        'Dilarang membawa hewan peliharaan',
        'Tidak boleh merokok di dalam kamar',
      ]),
      nearbyAttractions: JSON.stringify([
        { name: 'Jatim Park 2', distance: '20 Menit' },
        { name: 'Selecta', distance: '15 Menit' },
      ]),
      featured: false,
      rating: 4.4,
      reviewCount: 20,
      isActive: true,
    },
  ]

  await prisma.villa.createMany({
    data: villas,
  })

  console.log(`Database seeded successfully with ${villas.length} BY N2K villas!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
