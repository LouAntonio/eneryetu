import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';
import { uuidv7 } from 'uuidv7';
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

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;
		const body = await readJson(req);

		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			return fail(404, 'Utilizador não encontrado');
		}

		const data: { role?: Role; name?: string; surname?: string } = {};
		if (body.role === 'SUPERADMIN' || body.role === 'ADMIN') {
			data.role = body.role as Role;
		}
		if (typeof body.name === 'string') data.name = body.name;
		if (typeof body.surname === 'string') data.surname = body.surname;

		const moduleKeys: ModuleKey[] = Array.isArray(body.modules)
			? (body.modules.filter((m) => VALID_MODULES.has(m as ModuleKey)) as ModuleKey[])
			: [];
		const finalRole = data.role ?? user.role;

		const updated = await prisma.$transaction(async (tx) => {
			const result = await tx.user.update({ where: { id }, data });
			if (finalRole === 'ADMIN') {
				await tx.userModule.deleteMany({ where: { userId: id } });
				if (moduleKeys.length > 0) {
					await tx.userModule.createMany({
						data: moduleKeys.map((module) => ({ id: uuidv7(), userId: id, module })),
					});
				}
			} else {
				await tx.userModule.deleteMany({ where: { userId: id } });
			}
			return result;
		});

		return ok(updated);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const auth = await requireAdmin(req);
		const { id } = await ctx.params;

		if (id === auth.id) {
			return fail(400, 'Não pode eliminar a sua própria conta');
		}

		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			return fail(404, 'Utilizador não encontrado');
		}

		await prisma.user.delete({ where: { id } });

		return okMessage('Utilizador eliminado');
	} catch (error) {
		return handleError(error);
	}
}
