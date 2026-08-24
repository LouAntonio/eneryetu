import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { generateAccessToken, verifyRefreshToken } from '@/server/jwt';
import { ok, fail, readJson } from '@/server/http';

export async function POST(req: NextRequest) {
	try {
		const body = await readJson(req);
		const token =
			(body.refreshToken as string | undefined) || req.cookies.get('refreshToken')?.value;

		if (!token) {
			return fail(401, 'Refresh token não fornecido');
		}

		verifyRefreshToken(token);

		const stored = await prisma.refreshToken.findUnique({
			where: { token },
			include: { user: true },
		});

		if (!stored || stored.expiresAt < new Date()) {
			return fail(401, 'Refresh token inválido ou expirado');
		}

		const accessToken = generateAccessToken(stored.user);

		return ok({ accessToken });
	} catch {
		return fail(401, 'Refresh token inválido ou expirado');
	}
}
