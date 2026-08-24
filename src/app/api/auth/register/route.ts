import type { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { uuidv7 } from 'uuidv7';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, fail, readJson, handleError } from '@/server/http';

export async function POST(req: NextRequest) {
	try {
		const admin = requireAdmin(req);
		if (admin.role !== 'ADMIN') return fail(403, 'Acesso restrito a administradores');

		const { name, surname, email, password } = await readJson(req);

		if (!name || !surname || !email || !password) {
			return fail(400, 'Todos os campos são obrigatórios');
		}

		const exists = await prisma.user.findUnique({ where: { email: email as string } });
		if (exists) {
			return fail(409, 'Email já registado');
		}

		const hashedPassword = await bcrypt.hash(password as string, 10);

		const user = await prisma.user.create({
			data: {
				id: uuidv7(),
				name: name as string,
				surname: surname as string,
				email: email as string,
				password: hashedPassword,
				role: 'ADMIN',
			},
			select: { id: true, name: true, surname: true, email: true, role: true },
		});

		return ok(user, 201);
	} catch (error) {
		return handleError(error);
	}
}
