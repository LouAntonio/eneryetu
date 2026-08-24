import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { okMessage, fail, handleError } from '@/server/http';

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
