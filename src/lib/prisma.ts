import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configure Prisma for serverless environments
const prismaClientOptions = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
}

// For serverless environments, add connection pool timeout
if (process.env.NETLIFY || process.env.VERCEL) {
  (prismaClientOptions as any).datasources = {
    db: {
      url: process.env.DATABASE_URL,
    },
  }
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma