import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const eventType = await prisma.eventType.findUnique({
			where: { id },
			include: { _count: { select: { events: true } } },
		});
		if (!eventType) {
			return fail(404, 'Tipo de evento não encontrado');
		}

		return ok(eventType);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.eventType.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Tipo de evento não encontrado');
		}

		const eventType = await prisma.eventType.update({ where: { id }, data: body });

		return ok(eventType);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;

		const existing = await prisma.eventType.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Tipo de evento não encontrado');
		}

		await prisma.eventType.delete({ where: { id } });

		return okMessage('Tipo de evento eliminado');
	} catch (error) {
		return handleError(error);
	}
}
