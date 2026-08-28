import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { destroyAsset } from '@/server/cloudinary';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const product = await prisma.product.findUnique({
			where: { id },
		});
		if (!product) {
			return fail(404, 'Produto não encontrado');
		}

		return ok(product);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.product.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Produto não encontrado');
		}

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

		const product = await prisma.product.update({
			where: { id },
			data,
		});

		return ok(product);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireAdmin(req);
		const { id } = await ctx.params;

		const product = await prisma.product.findUnique({ where: { id } });
		if (!product) {
			return fail(404, 'Produto não encontrado');
		}

		if (product.coverImagePubId) {
			await destroyAsset(product.coverImagePubId).catch(() => undefined);
		}

		await prisma.product.delete({ where: { id } });

		return okMessage('Produto eliminado');
	} catch (error) {
		return handleError(error);
	}
}
