import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		max: 5,
	});
	return new PrismaClient({ adapter: new PrismaPg(pool) });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}
