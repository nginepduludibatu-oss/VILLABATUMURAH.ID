# Panduan Deployment ke Vercel

Panduan lengkap untuk deploy website VillaBatuMurah.ID ke Vercel (gratis).

## Langkah 1: Persiapan GitHub

### 1.1. Install Git (jika belum ada)
```bash
# Cek apakah git sudah terinstall
git --version

# Jika belum, install:
# Ubuntu/Debian: sudo apt install git
# Windows: Download dari https://git-scm.com/download/win
```

### 1.2. Inisialisasi Git Repository
```bash
cd "/home/rega/Desktop/Devin Project Website/villa-batu-murah"
git init
```

### 1.3. Buat .gitignore
```bash
# File .gitignore sudah ada, pastikan isinya:
node_modules/
.next/
.env
.env.local
*.db
```

### 1.4. Commit Code
```bash
git add .
git commit -m "Initial commit - VillaBatuMurah.ID website"
```

### 1.5. Push ke GitHub
1. Buka https://github.com/new
2. Repository name: `villa-batu-murah`
3. Set menjadi Public atau Private (bebas)
4. Klik "Create repository"
5. Copy commands yang muncul dan jalankan di terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/villa-batu-murah.git
git branch -M main
git push -u origin main
```

Ganti `YOUR_USERNAME` dengan username GitHub Anda.

## Langkah 2: Setup Database untuk Production

### Opsi A: Tetap Pakai SQLite (Untuk Traffic Kecil)
Vercel tidak mendukung SQLite secara native, tapi bisa menggunakan Vercel Blob Storage atau tetap upload database file.

**Rekomendasi**: Gunakan Vercel Postgres (gratis 512MB) untuk production.

### Opsi B: Gunakan Vercel Postgres (Rekomendasi)

1. Buka https://vercel.com/dashboard
2. Klik "Storage" → "Create Database"
3. Pilih "Postgres"
4. Plan: Free (Hobby)
5. Create

Setelah database dibuat:
1. Copy `.env` connection string
2. Format: `postgresql://user:password@host/database`

## Langkah 3: Deploy ke Vercel

### 3.1. Import ke Vercel
1. Buka https://vercel.com/new
2. Klik "Import" dari GitHub
3. Pilih repository `villa-batu-murah`
4. Klik "Import"

### 3.2. Konfigurasi Project

**Framework Preset**: Next.js (terdeteksi otomatis)

**Root Directory**: `./` (default)

**Environment Variables**:

Tambahkan environment variables berikut:

1. `DATABASE_URL`
   - Jika pakai Vercel Postgres: Paste connection string dari dashboard
   - Jika tetap SQLite: Kosongkan (akan di-setup manual)

2. `RESEND_API_KEY`
   - Value: `re_YkMCbm6F_9wKySgSHHwFn8x615AeZQ8WM`

3. `NEXT_PUBLIC_APP_URL`
   - Value: `https://villabatumurah.vercel.app` (nanti ganti dengan domain custom)

### 3.3. Deploy
1. Klik "Deploy"
2. Tunggu beberapa menit
3. Website akan live di: `https://villa-batu-murah-xxx.vercel.app`

## Langkah 4: Setup Database & Seed

### Jika Pakai Vercel Postgres:

### 4.1. Update Prisma Schema
```bash
# Edit prisma/schema.prisma
# Ganti DATABASE_URL dari file:./dev.db ke connection string Postgres
```

### 4.2. Run Migrations
Di Vercel tidak bisa run migration manual, perlu setup:

1. Buat file `prisma/migrate.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Push schema ke database
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Villa (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      -- tambahkan field lainnya
    )
  `)
}

main()
```

2. Atau gunakan Prisma Migrate API dari Vercel

### 4.3. Seed Data
Buat endpoint `/api/seed` untuk seed data di production:
```typescript
// src/app/api/seed/route.ts
import { prisma } from '@/lib/prisma'
import { villas } from '@/lib/seed-data'

export async function GET() {
  await prisma.villa.createMany({ data: villas })
  return Response.json({ success: true })
}
```

Jalankan sekali: `https://your-domain.vercel.app/api/seed`

## Langkah 5: Custom Domain (Opsional)

### 5.1. Beli Domain
Di Vercel atau registrar lain (Namecheap, GoDaddy, dll)

### 5.2. Add Domain di Vercel
1. Dashboard → Project → Settings → Domains
2. Klik "Add Domain"
3. Masukkan domain: `villabatumurah.id`
4. Ikuti instruksi DNS

### 5.3. Update Environment Variable
Ubah `NEXT_PUBLIC_APP_URL` ke domain custom:
```
NEXT_PUBLIC_APP_URL=https://villabatumurah.id
```

## Langkah 6: Testing Production

### 6.1. Test Admin Login
1. Buka `https://your-domain.vercel.app/admin/login`
2. Login dengan: `Regalow400` / `Regalow090100`

### 6.2. Test Email Reset
1. Logout dari admin
2. Klik "Lupa password?"
3. Masukkan email: `regalow400@gmail.com`
4. Cek email Gmail Anda

### 6.3. Test Public Website
1. Buka homepage
2. Test search villa
3. Test WhatsApp booking

## Troubleshooting

### Error: DATABASE_URL not set
- Pastikan environment variable sudah di-setup di Vercel
- Re-deploy project

### Error: Prisma Client failed to initialize
- Pastikan schema sudah di-sync dengan database
- Run prisma generate

### Email tidak terkirim
- Pastikan RESEND_API_KEY sudah benar
- Cek dashboard Resend untuk logs

### 404 pada admin routes
- Pastikan middleware sudah terdeploy
- Re-deploy project

## Maintenance

### Update Code
```bash
git add .
git commit -m "Update feature"
git push
# Vercel akan auto-deploy
```

### Backup Database
- Vercel Postgres auto-backup
- Export data定期 dari dashboard

### Monitoring
- Vercel Analytics untuk traffic
- Resend dashboard untuk email logs

## Biaya

- **Vercel**: Gratis (Hobby plan)
  - 100GB bandwidth/month
  - Unlimited deployments
  - SSL gratis
  - CDN global

- **Vercel Postgres**: Gratis (Hobby plan)
  - 512MB storage
  - 60 hours compute/month

- **Resend**: Gratis
  - 3,000 email/month
  - Cukup untuk website kecil

- **Domain**: ~$10-15/year (opsional)
  - Bisa beli di Vercel atau registrar lain

**Total Biaya**: $0-15/year tergantung apakah Anda beli domain custom.
