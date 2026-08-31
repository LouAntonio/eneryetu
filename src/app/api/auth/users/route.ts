import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, handleError } from '@/server/http';

export async function GET(req: NextRequest) {
	try {
		await requireAdmin(req);

		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				surname: true,
				email: true,
				role: true,
				modules: { select: { module: true } },
				lastLogin: true,
				createdAt: true,
			},
			orderBy: { createdAt: 'desc' },
		});

		return ok(users);
	} catch (error) {
		return handleError(error);
	}
}
