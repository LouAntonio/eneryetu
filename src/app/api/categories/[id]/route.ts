import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireModule } from '@/server/auth';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const category = await prisma.category.findUnique({
			where: { id },
			include: { _count: { select: { posts: true } } },
		});
		if (!category) {
			return fail(404, 'Categoria não encontrada');
		}

		return ok(category);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'TAXONOMY');
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.category.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Categoria não encontrada');
		}

		const category = await prisma.category.update({ where: { id }, data: body });

		return ok(category);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'TAXONOMY');
		const { id } = await ctx.params;

		const existing = await prisma.category.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Categoria não encontrada');
		}

		await prisma.category.delete({ where: { id } });

		return okMessage('Categoria eliminada');
	} catch (error) {
		return handleError(error);
	}
}
