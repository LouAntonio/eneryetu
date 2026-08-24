import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const post = await prisma.post.findUnique({
			where: { id },
			include: {
				author: { select: { id: true, name: true, surname: true } },
				category: true,
			},
		});
		if (!post) {
			return fail(404, 'Post não encontrado');
		}

		return ok(post);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.post.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Post não encontrado');
		}

		const post = await prisma.post.update({ where: { id }, data: body });

		return ok(post);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;

		const existing = await prisma.post.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Post não encontrado');
		}

		await prisma.post.delete({ where: { id } });

		return okMessage('Post eliminado');
	} catch (error) {
		return handleError(error);
	}
}
