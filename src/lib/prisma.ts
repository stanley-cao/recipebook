// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Allow global `var` in TypeScript
  // so Prisma doesn’t reinstantiate during hot reload in dev
  // (avoids "already have a PrismaClient" error)
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // optional: logs queries to console
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma