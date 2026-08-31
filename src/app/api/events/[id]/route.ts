import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireModule } from '@/server/auth';
import { destroyEventAssets } from '@/server/cloudinary';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';

const eventInclude = { eventType: true };

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const event = await prisma.event.findUnique({
			where: { id },
			include: eventInclude,
		});
		if (!event) {
			return fail(404, 'Evento não encontrado');
		}

		return ok(event);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'EVENTS');
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.event.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Evento não encontrado');
		}

		const { destroyAsset } = await import('@/server/cloudinary');
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
		if (data.startDate) data.startDate = new Date(data.startDate as string);
		if (data.endDate) data.endDate = new Date(data.endDate as string);

		const event = await prisma.event.update({
			where: { id },
			data,
			include: eventInclude,
		});

		return ok(event);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'EVENTS');
		const { id } = await ctx.params;

		const event = await prisma.event.findUnique({ where: { id } });
		if (!event) {
			return fail(404, 'Evento não encontrado');
		}

		try {
			await destroyEventAssets(id);
		} catch {
			/* assets podem já não existir na Cloudinary */
		}

		await prisma.event.delete({ where: { id } });

		return okMessage('Evento eliminado');
	} catch (error) {
		return handleError(error);
	}
}
