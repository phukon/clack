/**
 * Why this monstrosity and not a simple
 * "export const db = new PrismaClient()" ?!!
 * 
 * That's because of NextJS hot reloading. This initializes a new PrismaClient everytime changes are registered.
 * Therefore if we are not in production, we store the db var in a globalThis.prisma.
 * 
 * Now when the hot reload fires, it checks if it ahs Prisma already initialized in globalThis and then use that
 * otherwise a new client is made.
 * 
 * global is not affected in the hot reload.
 */

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV != 'production') globalThis.prisma = db;
