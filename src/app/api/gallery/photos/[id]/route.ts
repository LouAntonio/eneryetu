import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { destroyAsset } from '@/server/cloudinary';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';

const photoInclude = { category: true };

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const photo = await prisma.galleryPhoto.findUnique({
			where: { id },
			include: photoInclude,
		});
		if (!photo) {
			return fail(404, 'Foto não encontrada');
		}

		return ok(photo);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.galleryPhoto.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Foto não encontrada');
		}

		const photo = await prisma.galleryPhoto.update({
			where: { id },
			data: body,
			include: photoInclude,
		});

		return ok(photo);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;

		const existing = await prisma.galleryPhoto.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Foto não encontrada');
		}

		if (existing.publicId) {
			await destroyAsset(existing.publicId).catch(() => undefined);
		}

		await prisma.galleryPhoto.delete({ where: { id } });

		return okMessage('Foto eliminada');
	} catch (error) {
		return handleError(error);
	}
}
