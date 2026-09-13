# Email Setup Guide - Reset Password

Untuk mengaktifkan fitur pengiriman email reset password, Anda perlu mengkonfigurasi Gmail SMTP dengan App Password.

## Langkah-langkah Setup Gmail App Password:

### 1. Enable 2-Factor Authentication (2FA)
1. Buka https://myaccount.google.com/security
2. Scroll ke "2-Step Verification"
3. Klik "Turn on" jika belum aktif
4. Ikuti instruksi untuk mengaktifkan 2FA

### 2. Create App Password
1. Setelah 2FA aktif, buka https://myaccount.google.com/apppasswords
2. Login lagi jika diminta
3. Di bagian "Select app", pilih "Mail"
4. Di bagian "Select device", pilih "Other (Custom name)"
5. Masukkan nama: "VillaBatuMurah Admin"
6. Klik "Generate"
7. Copy password yang muncul (format 16 karakter, contoh: `abcd efgh ijkl mnop`)

### 3. Konfigurasi Environment Variables
Tambahkan password ke file `.env` atau `.env.local`:

```env
EMAIL_PASSWORD=abcd-efgh-ijkl-mnop
```

**PENTING**: 
- Ganti `abcd-efgh-ijkl-mnop` dengan password yang Anda copy
- Jangan menambahkan spasi atau tanda kutip
- Password ini bersifat sensitif, jangan bagikan ke orang lain

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

## Troubleshooting

### Email tidak terkirim:
- Pastikan App Password sudah benar
- Cek spam folder di email
- Pastikan tidak ada firewall yang memblokir port 587

### Error "Invalid login":
- App Password mungkin salah atau sudah kadaluarsa
- Generate ulang App Password dari Google

### Tanpa Email (Development Mode):
Jika Anda tidak ingin mengkonfigurasi email sekarang, link reset akan tetap muncul di console server (terminal) saat Anda meminta reset password.

## Catatan Keamanan

- App Password hanya untuk aplikasi yang tidak mendukung 2FA
- Jangan gunakan password Gmail biasa untuk EMAIL_PASSWORD
- Di production, gunakan email service yang lebih secure (SendGrid, Resend, dll)
- Simpan EMAIL_PASSWORD di environment variable production, jangan commit ke git
