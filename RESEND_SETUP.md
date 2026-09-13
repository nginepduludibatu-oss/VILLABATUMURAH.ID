# Resend Email Setup Guide

Untuk mengaktifkan pengiriman email reset password menggunakan Resend (gratis untuk penggunaan kecil).

## Langkah-langkah Setup Resend:

### 1. Sign Up di Resend
1. Buka https://resend.com/signup
2. Sign up menggunakan email Anda: `regalow400@gmail.com`
3. Verifikasi email Anda (cek inbox untuk verifikasi)

### 2. Dapatkan API Key
1. Setelah login, buka dashboard: https://resend.com/api-keys
2. Klik "Create API Key"
3. Beri nama: "VillaBatuMurah Admin"
4. Copy API key yang muncul (format: `re_xxxxxxxxxxxxx`)

### 3. Tambahkan ke Environment Variables
Tambahkan API key ke file `.env` atau `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**PENTING**: 
- Ganti `re_xxxxxxxxxxxxx` dengan API key yang Anda copy
- Jangan menambahkan spasi atau tanda kutip
- API key ini bersifat sensitif, jangan bagikan ke orang lain

### 4. Restart Development Server
```bash
# Stop server (Ctrl+C)
# Restart server
npm run dev
```

## Testing

1. Buka halaman login: `http://localhost:3000/admin/login`
2. Klik "Lupa password?"
3. Masukkan email: `regalow400@gmail.com`
4. Klik "Kirim Link Reset"
5. Cek email Anda untuk link reset

## Keuntungan Resend:

- **Gratis**: 3,000 email per bulan untuk development/testing
- **Mudah**: Tidak perlu setup SMTP atau App Password
- **Modern**: API yang simple dan reliable
- **Analytics**: Bisa tracking email terkirim atau tidak
- **Domain**: Bisa kirim dari domain custom Anda nanti

## Troubleshooting

### Email tidak terkirim:
- Pastikan API key sudah benar
- Cek dashboard Resend untuk error logs
- Pastikan email sudah terverifikasi di Resend

### Error "Invalid API Key":
- API key mungkin salah atau sudah dihapus
- Generate ulang API key dari dashboard Resend

### Tanpa API Key (Development Mode):
Jika Anda belum setup Resend:
- Link reset akan muncul di console server (terminal)
- Anda bisa copy link dari console dan paste ke browser

## Catatan Keamanan

- API key Resend bersifat sensitif
- Di production, gunakan environment variable production
- Jangan commit RESEND_API_KEY ke git
- Resend mendukung domain verification untuk email yang lebih professional
