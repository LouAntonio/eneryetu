import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireModule } from '@/server/auth';
import { destroyAsset } from '@/server/cloudinary';
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
		await requireModule(req, 'POSTS');
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.post.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Post não encontrado');
		}

		if (
			typeof body.coverImage === 'string' &&
			body.coverImage !== existing.coverImage &&
			existing.coverImagePublicId
		) {
			await destroyAsset(existing.coverImagePublicId).catch(() => undefined);
		}

		const data = { ...body };
		if (typeof data.coverImage === 'string') {
			data.coverImagePublicId =
				data.coverImage && data.coverImage !== existing.coverImage ? null : undefined;
		}

		const post = await prisma.post.update({ where: { id }, data });

		return ok(post);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'POSTS');
		const { id } = await ctx.params;

		const existing = await prisma.post.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Post não encontrado');
		}

		if (existing.coverImagePublicId) {
			await destroyAsset(existing.coverImagePublicId).catch(() => undefined);
		}

		await prisma.post.delete({ where: { id } });

		return okMessage('Post eliminado');
	} catch (error) {
		return handleError(error);
	}
}
