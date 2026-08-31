import type { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { uuidv7 } from 'uuidv7';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, fail, readJson, handleError } from '@/server/http';
import type { ModuleKey, Role } from '@prisma/client';

const VALID_MODULES = new Set<ModuleKey>([
	'POSTS',
	'EVENTS',
	'TRAININGS',
	'PRODUCTS',
	'JOBS',
	'GALLERY',
	'TAXONOMY',
]);

export async function POST(req: NextRequest) {
	try {
		await requireAdmin(req);

		const { name, surname, email, password, role, modules } = await readJson(req);

		if (!name || !surname || !email || !password) {
			return fail(400, 'Todos os campos são obrigatórios');
		}

		const roleValue: Role = role === 'ADMIN' ? 'ADMIN' : 'SUPERADMIN';

		const exists = await prisma.user.findUnique({ where: { email: email as string } });
		if (exists) {
			return fail(409, 'Email já registado');
		}

		const hashedPassword = await bcrypt.hash(password as string, 10);

		const moduleKeys: ModuleKey[] = Array.isArray(modules)
			? (modules.filter((m) => VALID_MODULES.has(m as ModuleKey)) as ModuleKey[])
			: [];

		const user = await prisma.user.create({
			data: {
				id: uuidv7(),
				name: name as string,
				surname: surname as string,
				email: email as string,
				password: hashedPassword,
				role: roleValue,
				modules:
					roleValue === 'ADMIN' && moduleKeys.length > 0
						? {
								create: moduleKeys.map((module) => ({ id: uuidv7(), module })),
							}
						: undefined,
			},
			select: {
				id: true,
				name: true,
				surname: true,
				email: true,
				role: true,
				modules: { select: { module: true } },
			},
		});

		return ok(user, 201);
	} catch (error) {
		return handleError(error);
	}
}
