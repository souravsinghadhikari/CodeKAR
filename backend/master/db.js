import { PrismaClient } from '@prisma/client'
import 'dotenv/config';

const globalForPrisma = globalThis

let prisma

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient()
}
prisma = globalForPrisma.prisma

export { prisma }
