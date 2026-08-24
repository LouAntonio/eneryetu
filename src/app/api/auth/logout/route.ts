import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAuth } from '@/server/auth';
import { readJson, handleError } from '@/server/http';

export async function POST(req: NextRequest) {
	try {
		await requireAuth(req);
		const body = await readJson(req);
		const token =
			(body.refreshToken as string | undefined) || req.cookies.get('refreshToken')?.value;

		if (token) {
			await prisma.refreshToken.deleteMany({ where: { token } });
		}

		const response = new Response(
			JSON.stringify({ success: true, message: 'Sessão terminada' }),
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);
		const nextResponse = new (await import('next/server')).NextResponse(response.body, {
			status: 200,
			headers: response.headers,
		});
		nextResponse.cookies.set('refreshToken', '', { path: '/api/auth', maxAge: 0 });

		return nextResponse;
	} catch (error) {
		return handleError(error);
	}
}
