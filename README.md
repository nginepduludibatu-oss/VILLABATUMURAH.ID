HEAD
# VILLABATUMURAH.ID

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
=======
# VillaBatuMurah.ID
80230aa (Update README and .env for Vercel deployment)

Website villa rental catalog untuk villa di Batu/Malang.

## Fitur

- Public website dengan search dan filter villa
- Admin panel dengan authentication
- CRUD management untuk villa
- WhatsApp booking integration
- Wishlist dengan LocalStorage
- Email reset password dengan Resend
- Bulk price update untuk kategori kamar

## Tech Stack

- Next.js 14
- TypeScript
- Prisma (SQLite/PostgreSQL)
- Tailwind CSS
- Shadcn UI
- Resend (Email)

## Setup Development

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
<<<<<<< HEAD
# or
yarn dev
# or
pnpm dev
# or
bun dev
=======
```

## Environment Variables

### Local Development (.env.local)
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RESEND_API_KEY="re_YkMCbm6F_9wKySgSHHwFn8x615AeZQ8WM"
```

### Production (Vercel)
```env
DATABASE_URL="postgresql://user:password@host/database" # from Vercel Postgres
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
RESEND_API_KEY="re_YkMCbm6F_9wKySgSHHwFn8x615AeZQ8WM"
```

## Admin Credentials

- Username: Regalow400
- Password: Regalow090100

## Deployment to Vercel

### 1. Import Repository
1. Buka https://vercel.com/new
2. Import repository `Website_Villa` dari GitHub
3. Click "Import"

### 2. Setup Environment Variables
Import environment variables dari file `.env`:
- `DATABASE_URL` (kosongkan dulu, akan diisi setelah setup Postgres)
- `NEXT_PUBLIC_APP_URL` (akan di-update ke domain Vercel)
- `RESEND_API_KEY=re_YkMCbm6F_9wKySgSHHwFn8x615AeZQ8WM`

### 3. Deploy
Click "Deploy" dan tunggu deployment selesai

### 4. Setup Vercel Postgres
1. Buka dashboard project Vercel
2. Click tab "Storage"
3. Click "Create Database"
4. Pilih "Postgres" → Plan: Free
5. Click "Create"
6. Copy connection string
7. Update `DATABASE_URL` di environment variables
8. Re-deploy

### 5. Update Prisma Schema untuk Production
Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 6. Run Migrations & Seed di Production
Buka endpoint berikut di browser:
- `/api/migrate` - untuk run migrations
- `/api/seed` - untuk seed data villa

## Database Seeding

Seed data akan menambahkan 69+ villa dari database BY N2K dengan:
- Real photographs
- Facilities
- Pricing
- Location details

## Documentation

- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Panduan deployment lengkap
- [RESEND_SETUP.md](./RESEND_SETUP.md) - Setup email service
>>>>>>> 80230aa (Update README and .env for Vercel deployment)
