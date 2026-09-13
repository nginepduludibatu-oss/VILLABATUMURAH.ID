import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface WhatsAppBookingParams {
  villaTitle: string
  location: string
  checkIn: Date
  checkOut: Date
  guests: number
  amenities?: string[]
  totalPrice: number
  discountPercent?: number
  villaUrl: string
  csPhoneNumber?: string
}

export function generateWhatsAppBookingLink(params: WhatsAppBookingParams): string {
  const {
    villaTitle,
    location,
    checkIn,
    checkOut,
    guests,
    amenities = [],
    totalPrice,
    discountPercent = 0,
    villaUrl,
    csPhoneNumber = '6281234567890', // Default CS number
  } = params

  // Calculate nights
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

  // Format dates in Indonesian
  const formattedCheckIn = format(checkIn, 'dd MMMM yyyy', { locale: id })
  const formattedCheckOut = format(checkOut, 'dd MMMM yyyy', { locale: id })

  // Format price
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(totalPrice)

  // Format amenities
  const amenitiesText = amenities.length > 0 
    ? amenities.join(', ') 
    : 'Semua fasilitas'

  // Build message
  const message = `Halo Admin VillaBatuMurah.ID, saya berminat pesan villa melalui website:

🏡 *Villa:* ${villaTitle}
📍 *Lokasi:* ${location}
📅 *Check-in:* ${formattedCheckIn}
📅 *Check-out:* ${formattedCheckOut} (${nights} Malam)
👥 *Tamu:* ${guests} Orang
💡 *Fasilitas Diharapkan:* ${amenitiesText}
💰 *Estimasi Total:* ${formattedPrice} ${discountPercent > 0 ? `(Termasuk Diskon ${discountPercent}%)` : ''}
🔗 *Link Villa:* ${villaUrl}

Apakah tanggal tersebut masih *AVAILABLE*?`

  // Sanitize phone number
  const sanitizedPhone = sanitizePhoneNumber(csPhoneNumber)

  // Encode message
  const encodedMessage = encodeURIComponent(message)

  // Generate WhatsApp link
  return `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`
}

export function sanitizePhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters
  let sanitized = phoneNumber.replace(/\D/g, '')
  
  // Remove leading '0' or '+'
  if (sanitized.startsWith('0')) {
    sanitized = sanitized.substring(1)
  } else if (sanitized.startsWith('62')) {
    sanitized = sanitized.substring(2)
  }
  
  // Add '62' prefix
  return `62${sanitized}`
}

export function generateWhatsAppShareLink(
  villaTitle: string,
  imageUrl: string,
  price: number,
  location: string,
  villaUrl: string
): string {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)

  const message = `🏡 *${villaTitle}*
📍 ${location}
💰 Mulai dari ${formattedPrice}/malam

Cek detail lengkap di: ${villaUrl}

Yuk, liburan ke Batu! 🏔️`

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/?text=${encodedMessage}`
}