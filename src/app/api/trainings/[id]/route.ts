import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const training = await prisma.training.findUnique({
			where: { id },
		});
		if (!training) {
			return fail(404, 'Formação não encontrada');
		}

		return ok(training);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.training.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Formação não encontrada');
		}

		const { destroyAsset } = await import('@/server/cloudinary');
		if (
			typeof body.coverImage === 'string' &&
			body.coverImage !== existing.coverImage &&
			existing.coverImagePubId
		) {
			await destroyAsset(existing.coverImagePubId).catch(() => undefined);
		}

		const data = { ...body };
		if (typeof data.coverImage === 'string') {
			data.coverImagePubId =
				data.coverImage && data.coverImage !== existing.coverImage ? null : undefined;
		}

		const training = await prisma.training.update({
			where: { id },
			data,
		});

		return ok(training);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;

		const training = await prisma.training.findUnique({ where: { id } });
		if (!training) {
			return fail(404, 'Formação não encontrada');
		}

		await prisma.training.delete({ where: { id } });

		return okMessage('Formação eliminada');
	} catch (error) {
		return handleError(error);
	}
}
