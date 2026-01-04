import { PrismaClient } from "../lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  accelerateUrl: process.env.PRISMA_ACCELERATE_URL || "",
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export function decimalToNumber(decimal: any): number {
    return decimal ? Number(decimal.toString()) : 0;
}