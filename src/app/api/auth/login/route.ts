import type { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { uuidv7 } from 'uuidv7';
import { prisma } from '@/server/prisma';
import { generateAccessToken, generateRefreshToken } from '@/server/jwt';
import { ok, fail, readJson, handleError } from '@/server/http';

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await readJson(req);

		if (!email || !password) {
			return fail(400, 'Email e palavra-passe são obrigatórios');
		}

		const user = await prisma.user.findUnique({ where: { email: email as string } });
		if (!user) {
			return fail(401, 'Credenciais inválidas');
		}

		const valid = await bcrypt.compare(password as string, user.password);
		if (!valid) {
			return fail(401, 'Credenciais inválidas');
		}

		await prisma.user.update({
			where: { id: user.id },
			data: { lastLogin: new Date() },
		});

		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		const modules = await prisma.userModule.findMany({
			where: { userId: user.id },
			select: { module: true },
		});

		const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		await prisma.refreshToken.create({
			data: {
				id: uuidv7(),
				token: refreshToken,
				userId: user.id,
				expiresAt: refreshExpires,
			},
		});

		const response = ok({
			user: {
				id: user.id,
				name: user.name,
				surname: user.surname,
				email: user.email,
				role: user.role,
				modules,
			},
			accessToken,
			refreshToken,
		});

		response.cookies.set('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60,
			path: '/api/auth',
		});

		return response;
	} catch (error) {
		return handleError(error);
	}
}
