import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAuth } from '@/server/auth';
import { ok, fail, readJson, handleError } from '@/server/http';

export async function GET(req: NextRequest) {
	try {
		const auth = requireAuth(req);

		const user = await prisma.user.findUnique({
			where: { id: auth.id },
			select: {
				id: true,
				name: true,
				surname: true,
				email: true,
				role: true,
				lastLogin: true,
				createdAt: true,
			},
		});

		if (!user) {
			return fail(404, 'Utilizador não encontrado');
		}

		return ok(user);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const auth = requireAuth(req);
		const { name, surname, email } = await readJson(req);

		if (!name || !surname || !email) {
			return fail(400, 'Nome, sobrenome e email são obrigatórios');
		}

		if ((email as string) !== auth.email) {
			const exists = await prisma.user.findUnique({ where: { email: email as string } });
			if (exists) {
				return fail(409, 'Email já registado');
			}
		}

		const user = await prisma.user.update({
			where: { id: auth.id },
			data: { name: name as string, surname: surname as string, email: email as string },
			select: { id: true, name: true, surname: true, email: true, role: true },
		});

		return ok(user);
	} catch (error) {
		return handleError(error);
	}
}
